import Web3 from "web3";
import BhavishPool from "@Contracts/BhavishPool.json";
import BhavishReinvest from "@Contracts/BhavishReinvest.json";
import BhavishLossyPool from "@Contracts/BhavishLossyPool.json";
import BhavishRewardToken from "@Contracts/BhavishRewardToken.json";
import {
    BHAVISH_REWARD_TOKEN,
    PREDICT_TOKENS,
    QUEST_POOL,
    BHAVISH_TOKENS,
    BHAVISH_REINVEST,
} from "@Constants";
import { ethers } from "ethers";

const NETWORK_URL = process.env.NEXT_PUBLIC_NETWORK_URL;

export const deposit = async (
    library: any,
    amount: number,
    account: string,
    confirmHandler: () => void,
    callback: () => void,
    errorHandler: () => void,
    gasPrice: any,
    gameToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();

    const bhavishPool =
        gameToken === PREDICT_TOKENS.BGN
            ? new web3.eth.Contract(
                  BhavishPool as any,
                  QUEST_POOL[gameToken][chainId]
              )
            : new web3.eth.Contract(
                  BhavishLossyPool as any,
                  QUEST_POOL[gameToken][chainId]
              );

    try {
        const depositAmount = ethers.utils.parseUnits(amount.toString(), 18);
        const gasLimit = await bhavishPool.methods
            .deposit(account)
            .estimateGas({ from: account, value: depositAmount });

        const depositAsset = await bhavishPool.methods
            .deposit(account)
            .send({
                from: account,
                value: depositAmount,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .on("confirmation", confirmHandler)
            .then(callback);

        return depositAsset;
    } catch (error) {
        return error;
    }
};

export const withdraw = async (
    library: any,
    account: string,
    confirmHandler: () => void,
    callback: () => void,
    errorHandler,
    gasPrice,
    gameToken: string,
    amount
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();

    try {
        const bhavishPool =
            gameToken === PREDICT_TOKENS.BGN
                ? new web3.eth.Contract(
                      BhavishPool as any,
                      QUEST_POOL[gameToken][chainId]
                  )
                : new web3.eth.Contract(
                      BhavishLossyPool as any,
                      QUEST_POOL[gameToken][chainId]
                  );

        const withdrawAmount = web3.utils.toWei(String(amount), "ether");
        const gasLimit = await bhavishPool.methods
            .withdraw(account, withdrawAmount)
            .estimateGas({ from: account });

        const withdrawTokens = await bhavishPool.methods
            .withdraw(account, withdrawAmount)
            .send({
                from: account,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .on("confirmation", confirmHandler)
            .then(callback);

        return withdrawTokens;
    } catch (error) {
        throw error;
    }
};

export const withdrawBNB = async (
    library: any,
    account: string,
    confirmHandler: () => void,
    callback: () => void,
    errorHandler,
    gasPrice,
    gameToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();

    try {
        const bhavishPool =
            gameToken === PREDICT_TOKENS.BGN
                ? new web3.eth.Contract(
                      BhavishPool as any,
                      QUEST_POOL[gameToken][chainId]
                  )
                : new web3.eth.Contract(
                      BhavishLossyPool as any,
                      QUEST_POOL[gameToken][chainId]
                  );
        const provider = await bhavishPool.methods.providers(account).call();

        const withdrawAmount = provider?.amount;
        const gasLimit = await bhavishPool.methods
            .withdraw(account, withdrawAmount)
            .estimateGas({ from: account });

        const withdrawTokens = await bhavishPool.methods
            .withdraw(account, withdrawAmount)
            .send({
                from: account,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .on("confirmation", confirmHandler)
            .then(callback);

        return withdrawTokens;
    } catch (error) {
        throw error;
    }
};

export const getBGNBalance = async (library: any, account: string) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();

    const bhavishNoLossPool = new web3.eth.Contract(
        BhavishPool as any,
        QUEST_POOL[PREDICT_TOKENS.BGN][chainId]
    );

    try {
        const bgnBalance = await bhavishNoLossPool.methods
            .balanceOf(account)
            .call();
        const decimals = await bhavishNoLossPool.methods.decimals().call();
        return bgnBalance / 10 ** decimals;
    } catch (error) {
        throw error;
    }
};

export const getBGLBalance = async (library: any, account: string) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();

    const bhavishLossyPool = new web3.eth.Contract(
        BhavishLossyPool as any,
        QUEST_POOL[PREDICT_TOKENS.BGL][chainId]
    );

    try {
        const bglBalance = await bhavishLossyPool.methods
            .balanceOf(account)
            .call();
        const decimals = await bhavishLossyPool.methods.decimals().call();
        return bglBalance / 10 ** decimals;
    } catch (error) {
        return error;
    }
};

export const getBRBalance = async (library: any, account: string) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();

    try {
        const rewardTokenContract = new web3.eth.Contract(
            BhavishRewardToken as any,
            BHAVISH_REWARD_TOKEN[chainId]
        );

        const rewardtokenBalance = await rewardTokenContract.methods
            .balanceOf(account)
            .call();

        const decimals = await rewardTokenContract.methods.decimals().call();
        const decimalValue = 10 ** decimals;

        return Math.floor((rewardtokenBalance / decimalValue) * 1e8) / 1e8;
    } catch (error) {
        return error;
    }
};

export const getMaticValue = async (library: any, account: string) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const bhavishPool = new web3.eth.Contract(
            BhavishPool as any,
            QUEST_POOL[BHAVISH_TOKENS.BGN][chainId]
        );

        // const rewardTokenContract = new web3.eth.Contract(
        //     BhavishRewardToken as any,
        //     BHAVISH_REWARD_TOKEN[chainId]
        // );

        // const rewardtokenBalance = await rewardTokenContract.methods
        //     .balanceOf(account)
        //     .call();

        // const totalBRNBalance = await rewardTokenContract.methods
        //     .totalSupply()
        //     .call();

        // const withdrawAmount = web3.utils.toWei(String(amount), "ether");

        const atokenBalance = await bhavishPool.methods
            .getWinningRewards(account)
            .call();

        const ethVaule: string = ethers.utils.formatEther(atokenBalance);

        return ethVaule;
    } catch (error) {
        throw error;
    }
};

export const reInvest = async (
    library: any,
    account: string,
    callback: () => void,
    errorHandler,
    gasPrice
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();

    try {
        const bhavishreinvest = new web3.eth.Contract(
            BhavishReinvest as any,
            BHAVISH_REINVEST[chainId]
        );
        // const withdrawAmount = web3.utils.toWei(String(amount), "ether");
        const gasLimit = await bhavishreinvest.methods
            .reinvest()
            .estimateGas({ from: account });

        const claimRewards = await bhavishreinvest.methods
            .reinvest()
            .send({
                from: account,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .then(callback);

        return claimRewards;
    } catch (error) {
        throw error;
    }
};

export const reset = async (
    library: any,
    account: string,
    confirmHandler: () => void,
    callback: () => void,
    errorHandler,
    gasPrice,
    gameToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();

    try {
        const bhavishPool =
            gameToken === PREDICT_TOKENS.BGN
                ? new web3.eth.Contract(
                      BhavishPool as any,
                      QUEST_POOL[gameToken][chainId]
                  )
                : new web3.eth.Contract(
                      BhavishLossyPool as any,
                      QUEST_POOL[gameToken][chainId]
                  );

        const gasLimit = await bhavishPool.methods
            .reset()
            .estimateGas({ from: account });

        const resetAmt = await bhavishPool.methods
            .reset()
            .send({
                from: account,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .on("confirmation", confirmHandler)
            .then(callback);

        return resetAmt;
    } catch (error) {
        throw error;
    }
};

export const claimWinningRewards = async (
    library: any,
    account: string,
    callback: () => void,
    errorHandler,
    gasPrice
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();

    try {
        const bhavishPool = new web3.eth.Contract(
            BhavishPool as any,
            QUEST_POOL[PREDICT_TOKENS.BGN][chainId]
        );
        // const withdrawAmount = web3.utils.toWei(String(amount), "ether");
        const gasLimit = await bhavishPool.methods
            .claimWinningRewards(account)
            .estimateGas({ from: account });

        const claimRewards = await bhavishPool.methods
            .claimWinningRewards(account)
            .send({
                from: account,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .then(callback);

        return claimRewards;
    } catch (error) {
        throw error;
    }
};

export const convertToAssets = async (
    library: any,
    gameToken: string,
    amount: number
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const bhavishPool = new web3.eth.Contract(
            BhavishPool as any,
            QUEST_POOL[gameToken][chainId]
        );
        const val = await bhavishPool.methods.convertToAssets(amount).call();
        const ethVaule: string = ethers.utils.formatEther(val);

        return ethVaule;
    } catch (error) {
        throw error;
    }
};

export const userShares = async (
    library: any,
    gameToken: string,
    useraddress: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const bhavishPool = new web3.eth.Contract(
            BhavishPool as any,
            QUEST_POOL[gameToken][chainId]
        );

        const provider = await bhavishPool.methods
            .providers(useraddress)
            .call();

        return provider?.shares;
    } catch (error) {
        throw error;
    }
};

export const userAllWithdrawableBalance: any = async (
    library: any,
    gameToken: string,
    useraddress: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const bhavishPool = new web3.eth.Contract(
            BhavishPool as any,
            QUEST_POOL[gameToken][chainId]
        );
        const poolVal = await bhavishPool.methods.poolData().call();

        const { multiplier } = poolVal;
        const provider = await bhavishPool.methods
            .providers(useraddress)
            .call();

        const { amount } = provider;
        const totalAmount = multiplier * amount;
        const ethVaule = Number(
            ethers.utils.formatEther(
                String(
                    totalAmount.toLocaleString("fullwide", {
                        useGrouping: false,
                    })
                )
            )
        );

        return ethVaule;
    } catch (error) {
        throw error;
    }
};

export const userRewards: any = async (
    library: any,
    gameToken: string,
    useraddress: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const bhavishPool = new web3.eth.Contract(
            BhavishPool as any,
            QUEST_POOL[gameToken][chainId]
        );

        const rewards = await bhavishPool.methods
            .getAPYRewards(useraddress)
            .call();

        const reward = Number(ethers.utils.formatEther(rewards));

        return reward;
    } catch (error) {
        throw error;
    }
};

export const userWithdrawableBalanceSplit = async (
    library: any,
    gameToken: string,
    useraddress: string,
    amount: number
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const bhavishPool = new web3.eth.Contract(
            BhavishPool as any,
            QUEST_POOL[gameToken][chainId]
        );
        const poolVal = await bhavishPool.methods.poolData().call();

        const { multiplier } = poolVal;
        const userBalance =
            Number(ethers.utils.parseEther(String(amount))) / multiplier;

        const rewards = await bhavishPool.methods
            .getAPYRewards(useraddress)
            .call();

        return {
            balances: Number(ethers.utils.formatEther(String(userBalance))),
            rewards: Number(ethers.utils.formatEther(rewards)),
        };
    } catch (error) {
        throw error;
    }
};

export const userWithdrawableBalance = async (
    library: any,
    gameToken: string,
    useraddress: string,
    amount: number
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const bhavishPool = new web3.eth.Contract(
            BhavishPool as any,
            QUEST_POOL[gameToken][chainId]
        );
        const poolVal = await bhavishPool.methods.poolData().call();

        const { multiplier } = poolVal;
        const userBalance =
            Number(ethers.utils.parseEther(String(amount))) / multiplier;

        const rewards = await bhavishPool.methods
            .getAPYRewards(useraddress)
            .call();

        const amountUserGets =
            Number(ethers.utils.formatEther(String(userBalance))) +
            Number(ethers.utils.formatEther(rewards));

        return amountUserGets;
    } catch (error) {
        throw error;
    }
};

export const getPoolData = async (library: any, gameToken: string) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();

    try {
        const bhavishPool = new web3.eth.Contract(
            BhavishPool as any,
            QUEST_POOL[gameToken][chainId]
        );
        const poolVal = await bhavishPool.methods.poolData().call();

        return poolVal;
    } catch (error) {
        throw error;
    }
};

export const userAPY = async (
    library: any,
    gameToken: string,
    useraddress: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const bhavishPool = new web3.eth.Contract(
            BhavishPool as any,
            QUEST_POOL[gameToken][chainId]
        );

        const val = await bhavishPool.methods.getAPYRewards(useraddress).call();
        const ethVaule: string = ethers.utils.formatEther(val);

        return ethVaule;
    } catch (error) {
        throw error;
    }
};

export const getlockInPeriod = async (library: any, gameToken: string) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();

    try {
        const bhavishPool = new web3.eth.Contract(
            BhavishPool as any,
            QUEST_POOL[gameToken][chainId]
        );

        const poolVal = await bhavishPool.methods.poolData().call();

        return Number(poolVal?.liquidityLockupDuration);
    } catch (error) {
        throw error;
    }
};

export const lockInPeriod = async (
    library: any,
    gameToken: string,
    useraddress: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();

    try {
        const bhavishPool = new web3.eth.Contract(
            BhavishPool as any,
            QUEST_POOL[gameToken][chainId]
        );

        const provider = await bhavishPool.methods
            .providers(useraddress)
            .call();
        const poolVal = await bhavishPool.methods.poolData().call();

        const depositedTime = provider?.date;

        return Number(depositedTime) + Number(poolVal?.liquidityLockupDuration);
    } catch (error) {
        throw error;
    }
};

export const lockInPeriodReward = async (
    library: any,
    gameToken: string,
    useraddress: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();

    try {
        const bhavishPool = new web3.eth.Contract(
            BhavishPool as any,
            QUEST_POOL[gameToken][chainId]
        );

        const provider = await bhavishPool.methods
            .providers(useraddress)
            .call();
        const poolVal = await bhavishPool.methods.poolData().call();

        const depositedTime = provider?.date;
        return Number(depositedTime) + Number(poolVal?.rewardLockupDuration);
    } catch (error) {
        throw error;
    }
};
