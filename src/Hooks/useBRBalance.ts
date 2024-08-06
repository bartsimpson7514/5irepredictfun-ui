import { getBRBalance } from "@Utils/bhavishPool";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, toDecimals } from "@Utils";
import { useDispatch } from "react-redux";
import { updateBgrBalance } from "@Reducers/trade";

export default function useBrBalance() {
    const { account, library } = useWeb3React();
    const [BRNBalance, setBRNBalance] = useState(0);
    const { mutate } = useSWR(["getBalance", account, "latest"], {
        fetcher: fetcher(library),
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (library) {
            library.on("block", async () => {
                // update balance
                mutate(undefined, true);
                const balance = await getBRBalance(library, account);

                setBRNBalance(balance);
                dispatch(updateBgrBalance(balance));
            });
        }
        // remove listener when the component is unmounted
        return () => {
            if (library) library.removeAllListeners("block");
        };
    }, [library, mutate, account]);
    return toDecimals(BRNBalance);
}
