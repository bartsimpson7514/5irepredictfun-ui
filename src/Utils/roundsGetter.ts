/* eslint-disable no-await-in-loop */
import Web3 from "web3";
import PredicitionGetter from "@Contracts/OddzPredicitionGetter.json";
import { RPC_URLS } from "@Connectors";

const NETWORK_URL = process.env.NEXT_PUBLIC_NETWORK_URL;

export const getUserInfo = async (
    user: any,
    chainId: number,
    library: any,
    address
) => {
    if (!NETWORK_URL || !address) return {};
    try {
        const web3 = new Web3(
            library?.provider ||
                Web3.givenProvider ||
                new Web3.providers.HttpProvider(NETWORK_URL)
        );
        web3.setProvider(RPC_URLS[chainId]);

        const predictionCont = new web3.eth.Contract(
            PredicitionGetter as any,
            address
        );

        const userInfo = await predictionCont.methods
            .getUserInfo(user, 0, 10000)
            .call({ from: user });

        return userInfo;
    } catch (err) {
        throw err;
    }
};

export const getUserHistory = async (
    user: any,
    chainId: number,
    library: any,
    address
) => {
    if (!NETWORK_URL || !address) return {};
    try {
        const web3 = new Web3(
            library?.provider ||
                Web3.givenProvider ||
                new Web3.providers.HttpProvider(NETWORK_URL)
        );
        web3.setProvider(RPC_URLS[chainId]);

        const predictionCont = new web3.eth.Contract(
            PredicitionGetter as any,
            address
        );

        const result = { 0: [] };
        const limit = 2;
        let start = 0;
        let end = limit;

        while (true) {
            const userInfo = await predictionCont.methods
                .getUserHistory(user, start, limit)
                .call({ from: user });

            result[0].push(...userInfo[0]);
            if (Number(userInfo[1]) < Number(end)) {
                break;
            }
            start = end;
            end += limit;
        }

        return result;
    } catch (err) {
        throw err;
    }
};
