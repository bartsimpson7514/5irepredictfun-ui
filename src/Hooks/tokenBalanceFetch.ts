/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from "react";
import useSWR from "swr";
import { fetcher, toDecimals, validNetwork } from "@Utils";
import { Contract } from "ethers";
import ERC20ABI from "@Contracts/erc-20.json";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";

export default function tokenBalanceFetch(address, precision = 4) {
    const { account, library, chainId } = useWeb3React();
    const { data: balance, mutate } = useSWR([address, "balanceOf", account], {
        fetcher: fetcher(library, ERC20ABI),
    });

    useEffect(() => {
        if (library && validNetwork(chainId) && address) {
            const contract = new Contract(
                address,
                ERC20ABI,
                library.getSigner()
            );
            const fromMe = contract.filters.Transfer(account, null);
            library.on(fromMe, () => {
                mutate(undefined, true);
            });
            const toMe = contract.filters.Transfer(null, account);
            library.on(toMe, () => {
                mutate(undefined, true);
            });
            // remove listener when the component is unmounted
            return () => {
                library.removeAllListeners(toMe);
                library.removeAllListeners(fromMe);
            };
            // trigger the effect only on component mount
        }
    }, [library, mutate, account]);

    return balance
        ? toDecimals(parseFloat(formatEther(balance)), precision)
        : 0;
}
