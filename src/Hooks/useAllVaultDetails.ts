import {
    VAULTLASTDATA,
    VAULTSTARTTIMESTAMP,
} from "@Components/Prediction/Vault/queries";
import { BHAVISH_VAULT } from "@Constants";
import { AppState } from "@Redux";
import { getVaultDeposit, getVaultPreviewWithdraw } from "@Utils/vaults";
import { useWeb3React } from "@web3-react/core";
import { useManualQuery } from "graphql-hooks";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function useAllVaultDetails() {
    const { library, chainId } = useWeb3React();

    const { selectedChainId, predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [getVaultLastData] = useManualQuery(VAULTLASTDATA);
    const [getVaultStartTimestamp] = useManualQuery(VAULTSTARTTIMESTAMP);

    const getVaultData = async () => {
        try {
            setLoading(true);

            const obj = BHAVISH_VAULT[predictableToken][selectedChainId].map(
                async vault => {
                    // const assetType = await getVaultName(
                    //     library,
                    //     vault.contractAddress,
                    //     selectedChainId
                    // );
                    // console.log(assetType);

                    const details: any = await getVaultDeposit(
                        library,
                        vault.contractAddress,
                        selectedChainId
                    );

                    const vaultAddress = vault.contractAddress;

                    const vaultLast = await getVaultLastData({
                        variables: {
                            vaultAddress,
                        },
                    });

                    const vaultStartTimestampData = await getVaultStartTimestamp(
                        {
                            variables: {
                                vaultAddress,
                            },
                        }
                    );

                    const timestamp = vaultStartTimestampData.data;

                    const lastData = vaultLast.data;

                    const shares = await getVaultPreviewWithdraw(
                        library,
                        Number(1),
                        vault.contractAddress,
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

                    return {
                        ...vault,
                        // assetType,
                        currencySupported: [predictableToken],
                        currentDeposit: details?.totalDeposit,
                        maxCapacity: details?.maxCapacity,
                        startTimestamp: timestamp?.userHistories[0]?.timestamp,
                        apy,
                    };
                }
            );

            const dataObj = await Promise.all(obj.map(p => p.catch(e => e)));

            const successPromisesResponse = dataObj.filter(
                result => !(result instanceof Error)
            );
            if (successPromisesResponse) setData(successPromisesResponse);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    useMemo(() => {
        getVaultData();
    }, [predictableToken, chainId, selectedChainId]);

    return { data, loading };
}
