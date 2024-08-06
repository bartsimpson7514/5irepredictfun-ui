/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from "react";
import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";
import { Web3Provider } from "@ethersproject/providers";
import { fetcher, toDecimals } from "@Utils";

export default function useBalance(precision = 4) {
    const { account, library } = useWeb3React<Web3Provider>();
    const { data: balance, mutate } = useSWR(
        ["getBalance", account, "latest"],
        {
            fetcher: fetcher(library),
        }
    );

    useEffect(() => {
        // listen for changes on an Ethereum address
        if (library) {
            library.on("block", () => {
                // update balance
                mutate(undefined, true);
            });
        }
        // remove listener when the component is unmounted
        return () => {
            if (library) library.removeAllListeners("block");
        };
        // trigger the effect only on component mount
    }, [library, mutate, account]);

    return balance
        ? toDecimals(parseFloat(formatEther(balance)), precision)
        : 0;
}
