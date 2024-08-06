import { getBGLBalance } from "@Utils/bhavishPool";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, toDecimals } from "@Utils";
import { useDispatch } from "react-redux";
import { updateBglBalance } from "@Reducers/trade";

export default function useBGLBalance() {
    const { account, library } = useWeb3React();
    const [BGLBalance, setBGLBalance] = useState(0);
    const [shouldGetUpdatedBalance, getUpdateBalance] = useState({});
    const [loading, setLoading] = useState(false);
    const { mutate } = useSWR(["getBalance", account, "latest"], {
        fetcher: fetcher(library),
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (library) {
            setLoading(true);
            library.on("block", async () => {
                // update balance
                mutate(undefined, true);
                const balance = await getBGLBalance(library, account);
                setBGLBalance(balance);
                setLoading(false);
                dispatch(updateBglBalance(balance));
            });
        }
        // remove listener when the component is unmounted
        return () => {
            if (library) library.removeAllListeners("block");
        };
    }, [library, mutate, shouldGetUpdatedBalance]);
    const bglBalance = BGLBalance ? toDecimals(BGLBalance) : 0;

    return { bglBalance, getUpdateBalance, loading };
}
