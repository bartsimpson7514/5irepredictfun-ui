import { AppState } from "@Redux";
import { toDecimals } from "@Utils";
import { getVaultPreviewWithdraw, getVaultUserShares } from "@Utils/vaults";
import { useWeb3React } from "@web3-react/core";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function useVaultMaxWithdraw(loader, contractAddress, fetch) {
    const { library, account } = useWeb3React();
    const [maxAmount, setMaxAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const { selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );

    const getData = async () => {
        try {
            setLoading(true);

            const shares = await getVaultUserShares(
                library,
                account,
                contractAddress
            );

            const amount = await getVaultPreviewWithdraw(
                library,
                Number(shares),
                contractAddress,
                selectedChainId
            );
            setMaxAmount(toDecimals(amount, 10));
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    useMemo(() => {
        getData();
    }, [account, loader, contractAddress, fetch]);

    return { maxAmount, loading };
}
