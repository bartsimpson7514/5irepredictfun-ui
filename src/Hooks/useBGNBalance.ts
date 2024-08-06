import { getBGNBalance } from "@Utils/bhavishPool";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, toDecimals } from "@Utils";

export default function useBGNBalance() {
    const { account, library } = useWeb3React();
    const [bgBalance, setBgBalance] = useState<number | {}>(0);
    const [shouldGetUpdatedBalance, getUpdateBalance] = useState({});
    const [loading, setLoading] = useState(false);
    const { mutate } = useSWR(["getBalance", account, "latest"], {
        fetcher: fetcher(library),
    });

    useEffect(() => {
        if (library && account) {
            setLoading(true);
            library.on("block", async () => {
                try {
                    // update balance
                    mutate(undefined, true);
                    const balance = await getBGNBalance(library, account);
                    setBgBalance(balance);
                    setLoading(false);
                } catch (err) {
                    setBgBalance(0);
                    setLoading(false);
                }
            });
        }
        // remove listener when the component is unmounted
        return () => {
            if (library) library.removeAllListeners("block");
        };
    }, [library, mutate, shouldGetUpdatedBalance, account]);

    const bgnbalance = bgBalance ? toDecimals(bgBalance) : 0;

    return { bgnbalance, getUpdateBalance, loading };
}
