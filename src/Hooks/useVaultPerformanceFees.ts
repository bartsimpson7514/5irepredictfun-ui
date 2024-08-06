import { getVaultWithdrawFees } from "@Utils/vaults";
import { useWeb3React } from "@web3-react/core";
import { useMemo, useState } from "react";

export default function useVaultPerformanceFees(contractAddress) {
    const { library, account } = useWeb3React();
    const [performaceFee, setPerformaceFee] = useState(0);
    const [withdrawFee, setWithdrawFee] = useState(0);

    const [loading, setLoading] = useState(false);

    const getData = async () => {
        try {
            setLoading(true);

            const fees = await getVaultWithdrawFees(library, contractAddress);
            setPerformaceFee(fees.performanceFeeRatio);
            setWithdrawFee(fees.withdrawFeeRatio);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    useMemo(() => {
        getData();
    }, [account]);

    return { performaceFee, withdrawFee, loading };
}
