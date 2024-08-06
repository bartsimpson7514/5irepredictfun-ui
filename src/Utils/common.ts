import Web3 from "web3";
import { ethers } from "ethers";
import {
    ODDZ_TOKEN,
    USDC_DECIMAL,
    USDC_TOKEN,
    USDT_TOKEN,
    DAI_TOKEN,
    PREDICT_TOKENS,
} from "../Constants/index";
import ERC20ABI from "../Contracts/erc-20.json";

const NETWORK_URL = process.env.NEXT_PUBLIC_NETWORK_URL;

export function getAssets(assets, predictableToken, chainId) {
    const retPoolObject: any = {};
    assets[chainId].forEach(asst => {
        if (predictableToken !== PREDICT_TOKENS.BGN) {
            if (asst.isActive) {
                retPoolObject[asst.symbol] = [asst.symbol, asst.name];
            }
        } else if (asst.isActiveLossless) {
            retPoolObject[asst.symbol] = [asst.symbol, asst.name];
        }
    });

    return retPoolObject;
}

export const getBalance = async (account: any, library: any) => {
    if (!NETWORK_URL) return;
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const balanceRes = await web3.eth.getBalance(account);
    return web3.utils.fromWei(balanceRes);
};

export const returnTokenAddress = (token: string, chainId: number) => {
    switch (token) {
        case "USDC":
            return USDC_TOKEN[chainId].toLowerCase();
        case "DAI":
            return DAI_TOKEN[chainId].toLowerCase();
        case "USDT":
            return USDT_TOKEN[chainId].toLowerCase();
        default:
            return ODDZ_TOKEN[chainId].toLowerCase();
    }
};

export const rewardsText = token => {
    switch (token) {
        case PREDICT_TOKENS.BGN:
            return PREDICT_TOKENS.BRN;
        case PREDICT_TOKENS.MATIC:
            return PREDICT_TOKENS.MATIC;
        case PREDICT_TOKENS.BNB:
            return PREDICT_TOKENS.BNB;
        case PREDICT_TOKENS.ETH:
            return PREDICT_TOKENS.ETH;
        default:
            return PREDICT_TOKENS.MATIC;
    }
};

export const getERC20TokenBalance = async (
    token: any,
    user: string,
    library: any
) => {
    if (!NETWORK_URL) return 0;
    const web3 = new Web3(
        library?.provider ||
            Web3.givenProvider ||
            new Web3.providers.HttpProvider(NETWORK_URL)
    );

    const chainId = await web3.eth.getChainId();
    const tokenContract = new web3.eth.Contract(
        ERC20ABI as any,
        returnTokenAddress(token, chainId)
    );

    const tokenBalance = await tokenContract.methods.balanceOf(user).call();
    const decimals = await tokenContract.methods.decimals().call();
    const decimalValue = 10 ** decimals;

    return Math.floor((tokenBalance / decimalValue) * 1e8) / 1e8;
};

export const getBalanceByToken = (user, token, library) => {
    if (token === PREDICT_TOKENS.MATIC) {
        return getBalance(user, library);
    }
    return getERC20TokenBalance(token, user, library);
};

export const getOddzBalance = async (user: string, library: any) => {
    if (!NETWORK_URL) return 0;
    const web3 = new Web3(
        library?.provider ||
            Web3.givenProvider ||
            new Web3.providers.HttpProvider(NETWORK_URL)
    );

    const chainId = await web3.eth.getChainId();
    const tokenContract = new web3.eth.Contract(
        ERC20ABI as any,
        ODDZ_TOKEN[chainId].toLowerCase()
    );

    const tokenBalance = await tokenContract.methods.balanceOf(user).call();

    return Math.floor((tokenBalance / USDC_DECIMAL) * 1e8) / 1e8;
};

export const getNetworkFee = async (
    user: string,
    receiver: string,
    value: number,
    chainId: number,
    library: any
) => {
    if (!NETWORK_URL) return 0;
    const web3 = new Web3(
        library?.provider ||
            Web3.givenProvider ||
            new Web3.providers.HttpProvider(NETWORK_URL)
    );

    const gasPrice: any = await web3.eth.getGasPrice(); // estimate the gas price
    const tokenContract = new web3.eth.Contract(
        ERC20ABI as any,
        ODDZ_TOKEN[chainId]
    );

    const gasLimit = await tokenContract.methods
        .transfer(
            receiver,
            web3.utils.toBN(value).mul(web3.utils.toBN(USDC_DECIMAL))
        )
        .estimateGas({ from: user });

    const transactionFee = gasPrice * gasLimit; // calculate the transaction fee
    return transactionFee / 1e9;
};

export const transferFunds = async (
    library: any,
    sender: any,
    receiver: string,
    value: any,
    chainId: number,
    selectedCoin: string
) => {
    if (!NETWORK_URL) return;
    const web3 = new Web3(
        library.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );

    let result: any;
    if (
        selectedCoin !== PREDICT_TOKENS.MATIC &&
        selectedCoin !== PREDICT_TOKENS.BNB
    ) {
        const tokenContract = new web3.eth.Contract(
            ERC20ABI as any,
            returnTokenAddress(selectedCoin, chainId)
        );

        const decimals = await tokenContract.methods.decimals().call();
        const calcedAmount = ethers.utils.parseUnits(
            value.toString(),
            decimals
        );

        result = await tokenContract.methods
            .transfer(receiver, calcedAmount)
            .send({ from: sender });
    } else {
        result = await web3.eth.sendTransaction({
            to: receiver,
            from: sender,
            value: web3.utils.toBN(web3.utils.toWei(String(value), "ether")),
        });
    }

    return result;
};

export const getGasPrice = async (library: any) => {
    if (!NETWORK_URL) return;
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const gasPriceRes = await web3.eth.getGasPrice();
    return gasPriceRes;
};

export const upperCase = (word: string) => {
    return word.toUpperCase();
};

export const getChainId = async () => {
    if (!NETWORK_URL) return;
    const web3 = new Web3(Web3.givenProvider || new Web3(Web3.givenProvider));
    const chainId = await web3.eth.getChainId();
    return chainId;
};
