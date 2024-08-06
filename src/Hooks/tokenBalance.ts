/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@Utils";
import { Contract } from "ethers";
import ERC20ABI from "@Contracts/erc-20.json";
import { returnTokenAddress } from "@Utils/common";

export default function tokenBalance(
    predictableToken,
    selectedChain,
    library,
    account
) {
    const address = returnTokenAddress(predictableToken, selectedChain);
    const { data: balance, mutate } = useSWR([address, "balanceOf", account], {
        fetcher: fetcher(library, ERC20ABI),
    });

    useEffect(() => {
        if (library && address) {
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
    }, [library, mutate, address]);

    return balance;
}
