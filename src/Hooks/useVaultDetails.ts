import {
    vaultLastData,
    vaultStartTimestamp,
} from "@Components/Prediction/Vault/queries";
import { BHAVISH_VAULT, NETWORK_ASSET } from "@Constants";
import { AppState } from "@Redux";
import { getVaultDeposit, getVaultPreviewWithdraw } from "@Utils/vaults";
import { useWeb3React } from "@web3-react/core";
import { useQuery } from "graphql-hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useVaultDetails(value) {
    const { library, chainId, account } = useWeb3React();
    const { selectedChainId, predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const { data: timestamp } = useQuery(
        vaultStartTimestamp(address?.toLowerCase())
    );
    const { data: lastData } = useQuery(vaultLastData(address?.toLowerCase()));

    const getVaultData = async () => {
        try {
            setLoading(true);
            const obj = BHAVISH_VAULT[predictableToken][selectedChainId].filter(
                vault => Number(vault.id) === Number(value)
            );

            setAddress(obj[0]?.contractAddress);

            const details: any = await getVaultDeposit(
                library,
                obj[0].contractAddress,
                selectedChainId
            );

            const shares = await getVaultPreviewWithdraw(
                library,
                Number(1),
                obj[0].contractAddress,
                selectedChainId
            );

            const yearTimestamp = 31536000;

            const diffrenceTimestamp =
                (lastData?.userHistories[0]
                    ? lastData?.userHistories[0].timestamp
                    : 0) -
                (timestamp?.userHistories[0]
                    ? timestamp?.userHistories[0]?.timestamp
                    : 0);

            const p = shares - 1;
            const n = yearTimestamp / diffrenceTimestamp;
            const apy = p * n;

            const dataObj = {
                ...obj[0],
                // assetType,
                currencySupported: [NETWORK_ASSET[selectedChainId]],
                currentDeposit: details?.totalDeposit,
                maxCapacity: details?.maxCapacity,
                startTimestamp: timestamp?.userHistories[0]?.timestamp,
                apy,
            };
            setData(dataObj);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (timestamp && lastData) getVaultData();
    }, [predictableToken, timestamp, lastData, account, chainId]);

    return { data, loading };
}

// const name = await getVaultName(library);
// console.log("Name", name);
// const name1 = await getVaultAllUsers(library);
// console.log("Allusers", name1);
// const name2 = await getVaultUserCount(library);
// console.log("UserCount", name2);
// const name3 = await getVaultUserDeposits(
//     library,
//     "0x7EE593fF863ef70FDE9B0B41351dFbDEbfB9Ee4d"
// );
// console.log("UserDepositAmount", name3);
// const name4 = await getVaultDeposit(library);
// console.log("TotalDepositAmount", name4);
// const name5 = await getVaultTotalSupply(library);
// console.log("TotalSupply", name5);
// const name9 = await getVaultUserShares(
//     library,
//     "0x7EE593fF863ef70FDE9B0B41351dFbDEbfB9Ee4d"
// );
// console.log("Usershares", name9);
// const name6 = await getVaultPreviewWithdraw(library, Number(name9));
// console.log("Preview shares to amount", name6);
// const name7 = await getVaultPreviewDeposit(library, Number(name6));
// console.log("preview amount to shares", name7);
// const name8 = await getVaultWithdrawFees(library);
// console.log("fees", name8);
// setVaultData(name);
