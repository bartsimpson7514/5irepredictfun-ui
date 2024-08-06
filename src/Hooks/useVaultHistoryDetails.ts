import { BHAVISH_VAULT } from "@Constants";
import { AppState } from "@Redux";
import { getDateFromUnixTimestamp } from "@Utils/time";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useSelector } from "react-redux";

export default function useVaultHistoryDetails(userHistories) {
    const { chainId } = useWeb3React();
    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );

    const header = [
        "Sl no",
        "Vault Name",
        "Type",
        `${predictableToken} Amount`,
        "Date",
        // "BG Earnings",
    ];

    const data = userHistories?.map((item, index) => {
        const VAULT_ADDRESS = BHAVISH_VAULT[predictableToken][
            chainId || 137
        ]?.filter(
            vault =>
                vault.contractAddress.toLowerCase() ===
                item.vaultAddress.toLowerCase()
        );
        return {
            slno: index + 1,
            vaultName: `${VAULT_ADDRESS[0].vaultName} ${VAULT_ADDRESS[0].assetName}`,
            type: item.txnType,
            BGAmount: ethers.utils.formatEther(item.assetAmount),
            date: getDateFromUnixTimestamp(item.timestamp),
            // bgEarnings: -5.2,
        };
    });

    return { header, data };
}
