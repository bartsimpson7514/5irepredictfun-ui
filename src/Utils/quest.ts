import Web3 from "web3";
import Quest from "@Contracts/Quest-NoLossy.json";
import NativeQuest from "@Contracts/NativeQuest.json";
import LossyWrapper from "@Contracts/LossyWrapper.json";
import QuestStory from "@Contracts/QuestStory.json";
import NoLossRT from "@Contracts/NoLossRT.json";
import {
    MARKETS,
    NATIVELOSSYWRAPPER,
    QUESTAGGREGATOR,
    QUESTS,
    QUEST_POOL,
} from "@Constants";
import ERC20ABI from "@Contracts/erc-20.json";
import { MarketQuestion } from "@Components/Quests/constants";
import { ethers } from "ethers";

const NETWORK_URL = process.env.NEXT_PUBLIC_NETWORK_URL;

export const createMarket = async (
    account: string,
    library: any,
    question: MarketQuestion,
    startTimeStamp: number,
    endTimeStamp: number,
    singleAnswer: boolean,
    arbitrator: boolean,
    success: () => void,
    errorHandler: () => void,
    gasPrice: any,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const questContract = new web3.eth.Contract(
            Quest as any,
            QUESTS[predictableToken][chainId]
        );
        const gasLimit = await questContract.methods
            .createMarket(
                question,
                startTimeStamp,
                endTimeStamp,
                singleAnswer,
                arbitrator
            )
            .estimateGas({ from: account });

        const createdMarket = await questContract.methods
            .createMarket(
                question,
                startTimeStamp,
                endTimeStamp,
                singleAnswer,
                arbitrator
            )
            .send({
                from: account,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .then(success);
        return createdMarket;
    } catch (error) {
        throw error;
    }
};

export const createQuest = async (
    account: string,
    library: any,
    question,
    predictionStartAt: number,
    startTimeStamp: number,
    endTimeStamp: number,
    category,
    title,
    description,
    imageURL,
    mode,
    arbitrator: boolean,
    success: () => void,
    errorHandler: () => void,
    gasPrice: any,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const questContract = new web3.eth.Contract(
            QuestStory as any,
            mode
                ? QUESTAGGREGATOR[predictableToken][chainId]
                : QUESTS[predictableToken][chainId]
        );

        const gasLimit = await questContract.methods
            .createQuest(
                question,
                predictionStartAt,
                startTimeStamp,
                endTimeStamp,
                title,
                category,
                description,
                imageURL,
                arbitrator
            )
            .estimateGas({ from: account });

        const createdMarket = await questContract.methods
            .createQuest(
                question,
                predictionStartAt,
                startTimeStamp,
                endTimeStamp,
                title,
                category,
                description,
                imageURL,
                arbitrator
            )
            .send({
                from: account,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .then(success);
        return createdMarket;
    } catch (error) {
        throw error;
    }
};

export const createNativeQuest = async (
    account: string,
    library: any,
    question,
    predictionStartAt: number,
    startTimeStamp: number,
    endTimeStamp: number,
    category,
    title,
    description,
    imageURL,
    arbitrator: boolean,
    success: () => void,
    errorHandler: () => void,
    gasPrice: any,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const nativeQuestContract = new web3.eth.Contract(
            NativeQuest as any,
            QUESTS[predictableToken][chainId]
        );

        const gasLimit = await nativeQuestContract.methods
            .createQuest(
                question,
                predictionStartAt,
                startTimeStamp,
                endTimeStamp,
                title,
                category,
                description,
                imageURL,
                arbitrator
            )
            .estimateGas({ from: account });

        const createdMarket = await nativeQuestContract.methods
            .createQuest(
                question,
                predictionStartAt,
                startTimeStamp,
                endTimeStamp,
                title,
                category,
                description,
                imageURL,
                arbitrator
            )
            .send({
                from: account,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .then(success);
        return createdMarket;
    } catch (error) {
        throw error;
    }
};

export const getAllMarkets = async (library: any, predictableToken: string) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const questContract = new web3.eth.Contract(
            Quest as any,
            QUESTS[predictableToken][chainId]
        );
        const allMarkets = await questContract.methods.getAllMarkets().call();

        return allMarkets;
    } catch (error) {
        throw error;
    }
};

export const getOutComeValue = async (
    library: any,
    marketid: number,
    outComeId: number,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const questContract = new web3.eth.Contract(
            Quest as any,
            QUESTS[predictableToken][chainId]
        );
        const outComeValue = await questContract.methods
            .getOutcomeValue(marketid, outComeId)
            .call();
        return outComeValue;
    } catch (error) {
        throw error;
    }
};

export const getMarketData = async (
    library: any,
    marketid: number,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const questContract = new web3.eth.Contract(
            Quest as any,
            QUESTS[predictableToken][chainId]
        );
        const marketData = await questContract.methods
            .getMarketData(marketid)
            .call();
        return marketData;
    } catch (error) {
        throw error;
    }
};

export const resolveNoLossRT = async (
    library: any,
    account: string,
    marketid: number,
    predictableToken: string,
    gasPrice: any
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const realtimeMarkets = new web3.eth.Contract(
            NoLossRT as any,
            MARKETS[predictableToken][chainId]
        );

        const gasLimit = await realtimeMarkets.methods
            .resolveMarket(marketid)
            .estimateGas({
                from: account,
            });
        const resolve = await realtimeMarkets.methods
            .resolveMarket(marketid)
            .send({
                from: account,
                gas: Math.round(gasLimit * 1.5),
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
            });
        return resolve;
    } catch (error) {
        throw error;
    }
};

export const getResultForMarket = async (
    library: any,
    account: string,
    marketid: number,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const realtimeMarkets = new web3.eth.Contract(
            NoLossRT as any,
            MARKETS[predictableToken][chainId]
        );

        const resolve = await realtimeMarkets.methods
            .getResultForMarket(marketid)
            .call();
        return resolve;
    } catch (error) {
        throw error;
    }
};

export const getAllMarketData = async (
    library: any,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const questContract = new web3.eth.Contract(
            Quest as any,
            QUESTS[predictableToken][chainId]
        );
        const marketData = await questContract.methods.getAllMarkets().call();
        return marketData;
    } catch (error) {
        throw error;
    }
};

export const placeBet = async (
    library: any,
    account: string,
    marketid: number,
    outcomeId: number,
    amount: number,
    confirmHandler: () => void,
    callback: () => void,
    errorHandler,
    gasPrice: any,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();

    try {
        const questContract = new web3.eth.Contract(
            Quest as any,
            QUESTS[predictableToken][chainId]
        );

        const tokenContract = new web3.eth.Contract(
            ERC20ABI as any,
            QUEST_POOL[predictableToken][chainId]
        );

        const allowance = await tokenContract.methods
            .allowance(account, QUESTS[predictableToken][chainId])
            .call();
        const allowanceAmount = ethers.utils.formatEther(allowance.toString());

        const totalSupply = await tokenContract.methods.totalSupply().call();
        if (Number(allowanceAmount) < amount) {
            await tokenContract.methods
                .approve(QUESTS[predictableToken][chainId], totalSupply)
                .send({
                    from: account,
                });
        }
        const betAmount = web3.utils.toWei(String(amount), "ether");

        const gasLimit = await questContract.methods
            .placeBet(
                marketid,
                outcomeId,
                betAmount,
                process.env.NEXT_PUBLIC_PROVIDER_ADDRESS
            )
            .estimateGas({ from: account });

        const placebet = await questContract.methods
            .placeBet(
                marketid,
                outcomeId,
                betAmount,
                process.env.NEXT_PUBLIC_PROVIDER_ADDRESS
            )
            .send({
                from: account,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .on("confirmation", confirmHandler)
            .then(callback);
        return placebet;
    } catch (error) {
        throw error;
    }
};

export const enterQuest = async (
    library: any,
    account: string,
    confirmHandler: () => void,
    callback: () => void,
    errorHandler,
    gasPrice: any,
    questId: number,
    totalWeightage: number,
    betOutcomes: number[],
    weightage: number[],
    amount: number,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const questContract = new web3.eth.Contract(
            Quest as any,
            QUESTS[predictableToken][chainId]
        );

        const tokenContract = new web3.eth.Contract(
            ERC20ABI as any,
            QUEST_POOL[predictableToken][chainId]
        );

        const allowance = await tokenContract.methods
            .allowance(account, MARKETS[predictableToken][chainId])
            .call();
        const allowanceAmount = ethers.utils.formatEther(allowance.toString());
        const totalSupply = await tokenContract.methods.totalSupply().call();

        if (Number(allowanceAmount) < Number(amount)) {
            await tokenContract.methods
                .approve(MARKETS[predictableToken][chainId], totalSupply)
                .send({
                    from: account,
                });
        }
        const betAmount = web3.utils.toWei(String(amount), "ether");

        const gasLimit = await questContract.methods
            .enter(
                questId,
                totalWeightage,
                betOutcomes,
                weightage,
                betAmount,
                account,
                process.env.NEXT_PUBLIC_PROVIDER_ADDRESS
            )
            .estimateGas({ from: account });

        const enter = await questContract.methods
            .enter(
                questId,
                totalWeightage,
                betOutcomes,
                weightage,
                betAmount,
                account,
                process.env.NEXT_PUBLIC_PROVIDER_ADDRESS
            )
            .send({
                from: account,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .on("confirmation", confirmHandler)
            .then(callback);
        return enter;
    } catch (error) {
        errorHandler();
        throw error;
    }
};

export const enterLossyWrapperQuest = async (
    library: any,
    account: string,
    confirmHandler: () => void,
    callback: () => void,
    errorHandler,
    gasPrice: any,
    questId: number,
    totalWeightage: number,
    betOutcomes: number[],
    weightage: number[],
    amount: number,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const questContract = new web3.eth.Contract(
            LossyWrapper as any,
            NATIVELOSSYWRAPPER[predictableToken][chainId]
        );

        const tokenContract = new web3.eth.Contract(
            ERC20ABI as any,
            QUEST_POOL[predictableToken][chainId]
        );

        const allowance = await tokenContract.methods
            .allowance(account, MARKETS[predictableToken][chainId])
            .call();
        const allowanceAmount = ethers.utils.formatEther(allowance.toString());

        if (Number(allowanceAmount) < Number(amount)) {
            await tokenContract.methods
                .approve(
                    MARKETS[predictableToken][chainId],
                    ethers.utils.parseEther(String(1e8))
                )
                .send({
                    from: account,
                });
        }
        const betAmount = web3.utils.toWei(String(amount), "ether");

        const gasLimit = await questContract.methods
            .enterQuest(
                questId,
                totalWeightage,
                betOutcomes,
                weightage,
                process.env.NEXT_PUBLIC_PROVIDER_ADDRESS
            )
            .estimateGas({ from: account, value: betAmount });

        const enter = await questContract.methods
            .enterQuest(
                questId,
                totalWeightage,
                betOutcomes,
                weightage,
                process.env.NEXT_PUBLIC_PROVIDER_ADDRESS
            )
            .send({
                from: account,
                value: betAmount,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .on("confirmation", confirmHandler)
            .then(callback);
        return enter;
    } catch (error) {
        errorHandler();
        throw error;
    }
};

export const enterNativeQuest = async (
    library: any,
    account: string,
    confirmHandler: () => void,
    callback: () => void,
    errorHandler,
    gasPrice: any,
    questId: number,
    totalWeightage: number,
    betOutcomes: number[],
    weightage: number[],
    amount: number,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const nativeQuestContract = new web3.eth.Contract(
            NativeQuest as any,
            QUESTS[predictableToken][chainId]
        );

        const betAmount = web3.utils.toWei(String(amount), "ether");
        const gasLimit = await nativeQuestContract.methods
            .enter(
                questId,
                totalWeightage,
                betOutcomes,
                weightage,
                account,
                process.env.NEXT_PUBLIC_PROVIDER_ADDRESS
            )
            .estimateGas({ from: account, value: betAmount });

        const enter = await nativeQuestContract.methods
            .enter(
                questId,
                totalWeightage,
                betOutcomes,
                weightage,
                account,
                process.env.NEXT_PUBLIC_PROVIDER_ADDRESS
            )
            .send({
                from: account,
                value: betAmount,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .on("confirmation", confirmHandler)
            .then(callback);
        return enter;
    } catch (error) {
        errorHandler();
        throw error;
    }
};

export const claimRewards = async (
    library: any,
    account: string,
    marketId: number,
    callback: () => void,
    errorHandler: () => void,
    gasPrice: any,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const questContract = new web3.eth.Contract(
            Quest as any,
            QUESTS[predictableToken][chainId]
        );
        const gasLimit = await questContract.methods
            .claim(marketId, account)
            .estimateGas({ from: account });

        const claim = await questContract.methods
            .claim(marketId, account)
            .send({
                from: account,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .then(callback);
        return claim;
    } catch (error) {
        throw error;
    }
};

export const claimRewardsLossyWrapperQuest = async (
    library: any,
    account: string,
    marketId: number,
    callback: () => void,
    errorHandler: () => void,
    gasPrice: any,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();

    try {
        const questContract = new web3.eth.Contract(
            LossyWrapper as any,
            NATIVELOSSYWRAPPER[predictableToken][chainId]
        );

        const gasLimit = await questContract.methods
            .claimQuest(marketId)
            .estimateGas({ from: account });

        const claim = await questContract.methods
            .claimQuest(marketId)
            .send({
                from: account,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .then(callback);
        return claim;
    } catch (error) {
        throw error;
    }
};

export const getUserRewardAmount = async (
    library: any,
    account: string,
    questId: number,
    predictableToken: string
) => {
    try {
        if (!NETWORK_URL) return {};
        const web3 = new Web3(
            library?.provider ||
                Web3.givenProvider ||
                new Web3.providers.HttpProvider(NETWORK_URL)
        );
        const chainId = await web3.eth.getChainId();

        const questContract = new web3.eth.Contract(
            Quest as any,
            QUESTS[predictableToken][chainId]
        );

        const rewardAmount = await questContract.methods
            .getRewards(questId, account)
            .call({ from: account });
        return rewardAmount;
    } catch (err) {
        throw err;
    }
};

export const closeNoLossRTMarket = async (
    library: any,
    account: string,
    marketId: number,
    predictableToken: string,
    gasPrice: any
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();

    try {
        const realtimeMarkets = new web3.eth.Contract(
            NoLossRT as any,
            MARKETS[predictableToken][chainId]
        );

        const gasLimit = await realtimeMarkets.methods
            .closeMarket(marketId)
            .estimateGas({
                from: account,
            });

        const rewards = await realtimeMarkets.methods
            .closeMarket(marketId)
            .send({
                from: account,
                gas: Math.round(gasLimit * 2),
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
            });

        return rewards;
    } catch (error) {
        throw error;
    }
};

export const getUserMarkets = async (
    library: any,
    account: string,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const questContract = new web3.eth.Contract(
            Quest as any,
            QUESTS[predictableToken][chainId]
        );

        const userMarkets = await questContract.methods
            .getUserMarkets(account)
            .call();

        return userMarkets;
    } catch (error) {
        throw error;
    }
};

export const getMarketOutcomeData = async (
    library: any,
    marketid: number,
    outComeId: number,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const questContract = new web3.eth.Contract(
            Quest as any,
            QUESTS[predictableToken][chainId]
        );
        const outComeValue = await questContract.methods
            .getMarketOutcomeData(marketid, outComeId)
            .call();
        return outComeValue;
    } catch (error) {
        throw error;
    }
};

export const getMarketOutcomeValue = async (
    library: any,
    marketid: number,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    try {
        const realtimeMarkets = new web3.eth.Contract(
            NoLossRT as any,
            MARKETS[predictableToken][chainId]
        );
        const outComeValue = await realtimeMarkets.methods
            .getMarketOutcomeAmounts(marketid)
            .call();
        return outComeValue;
    } catch (error) {
        throw error;
    }
};

const returnWinnings = (outcomeData, quesAmount) => {
    let winnings = 0;
    let totalAmount = 0;
    for (let i = 0; i < outcomeData.length; i += 1) {
        totalAmount += Number(outcomeData[i]);
    }
    for (let i = 0; i < outcomeData.length; i += 1) {
        // winnings[i] =
        //     ((totalAmount + quesAmount) * quesAmount) / (outcomeData[i] + quesAmount);
        winnings +=
            ((totalAmount + quesAmount) * quesAmount) /
            (outcomeData[i] + quesAmount);
    }
    return winnings;
};

export const resolveMarketOutcome: any = async (
    library: any,
    predictableToken: string,
    markets: any,
    qweight: any
) => {
    const unresolvedPoolAmount: any = [];

    for (let i = 0; i < markets.length; i += 1) {
        const outcomeVal = getMarketOutcomeValue(
            library,
            markets[0].id,
            predictableToken
        );

        unresolvedPoolAmount.push(outcomeVal);
    }
    const preResult = await Promise.all(unresolvedPoolAmount);

    let totalOutcome = 0;
    for (let i = 0; i < preResult.length; i += 1) {
        const resVal: any = preResult[i];
        const winnings = returnWinnings(resVal, qweight);
        totalOutcome += winnings;
    }
    const ethVaule: string = ethers.utils.formatEther(String(totalOutcome));

    return ethVaule;
};
