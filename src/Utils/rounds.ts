import Web3 from "web3";
import {
    ODDZ_PREDICTION_STORAGE,
    ODDZ_PREDICTION,
    USDC_DECIMAL,
    NYSE_MARKET,
    ODDZ_SDK,
    PREDICT_TOKENS,
} from "@Constants";
import PredictionStorage from "@Contracts/OddzPredictionStorage.json";
import ODDZSDKLossless from "@Contracts/OddzSDKLossless.json";
import BNBSDK from "@Contracts/BNBSDK.json";
import NyseMarket from "@Contracts/NyscMarketTime2022.json";
import Prediction from "@Contracts/OddzPrediction.json";
import { RPC_URLS } from "@Connectors";
import { RoundProps } from "@Components/Prediction/Card/consts";
import { MARKET_STATUS } from "@Components/Constants";
import { ethers } from "ethers";

const NETWORK_URL = process.env.NEXT_PUBLIC_NETWORK_URL;

export const getRoundDetails = async (
    currentRoundId: number,
    asset: string,
    chainId: number,
    library: any,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider ||
            Web3.givenProvider ||
            new Web3.providers.HttpProvider(NETWORK_URL)
    );

    web3.setProvider(RPC_URLS[chainId]);

    const predictionManager = new web3.eth.Contract(
        PredictionStorage as any,
        ODDZ_PREDICTION_STORAGE[predictableToken][chainId][asset]
    );
    let roundDetails;
    if (currentRoundId < 2) {
        roundDetails = await predictionManager.methods
            .getArrayRounds(
                Number(currentRoundId) - 1,
                Number(currentRoundId) + 3
            ) // this is correct logic - commented out for quick fix
            // .getArrayRounds(Number(currentRoundId) - 1, Number(currentRoundId))
            .call();
    } else if (currentRoundId < 3) {
        roundDetails = await predictionManager.methods
            .getArrayRounds(
                Number(currentRoundId) - 2,
                Number(currentRoundId) + 3
            ) // this is correct logic - commented out for quick fix
            // .getArrayRounds(Number(currentRoundId) - 1, Number(currentRoundId))
            .call();
    } else {
        roundDetails = await predictionManager.methods
            .getArrayRounds(
                Number(currentRoundId) - 3,
                Number(currentRoundId) + 3
            ) // this is correct logic - commented out for quick fix
            // .getArrayRounds(Number(currentRoundId) - 1, Number(currentRoundId))
            .call();
    }

    const roundInfo: RoundProps[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let liveRoundEndtime = 0;
    roundDetails.forEach((rnd, index) => {
        if (index === 5) {
            const laterRoundTime =
                Number(rnd.roundEndTimestamp) - Number(rnd.roundStartTimestamp);
            liveRoundEndtime = Number(rnd.roundEndTimestamp) + laterRoundTime;
        }
        roundInfo.push({
            currentRoundId,
            downPredictAmount: rnd.downPredictAmount,
            endPrice: rnd.endPrice,
            rewardAmount: rnd.rewardAmount,
            rewardBaseCalAmount: rnd.rewardBaseCalAmount,
            roundEndTimestamp: rnd.roundEndTimestamp,
            roundId: rnd.roundId,
            roundStartTimestamp: rnd.roundStartTimestamp,
            roundState: rnd.roundState,
            startPrice: rnd.startPrice,
            totalAmount: rnd.totalAmount,
            upPredictAmount: rnd.upPredictAmount,
        });
    });

    // next plus one card

    // predictableToken === PREDICT_TOKENS.MATIC &&
    //     roundInfo.push({
    //         currentRoundId,
    //         downPredictAmount: 0,
    //         endPrice: 0,
    //         rewardAmount: 0,
    //         rewardBaseCalAmount: 0,
    //         roundEndTimestamp: liveRoundEndtime,
    //         roundId: 0,
    //         roundStartTimestamp: 0,
    //         roundState: 0,
    //         startPrice: 0,
    //         totalAmount: 0,
    //         upPredictAmount: 0,
    //     });
    return roundInfo;
};

export const getRoundDetailsStocks = async (
    currentRoundId: number,
    asset: string,
    chainId: number,
    library: any,
    marketState: string,
    endRoundMarketTime: any,
    roundTime: number,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider ||
            Web3.givenProvider ||
            new Web3.providers.HttpProvider(NETWORK_URL)
    );
    web3.setProvider(RPC_URLS[chainId]);

    const predictionManager = new web3.eth.Contract(
        PredictionStorage as any,
        ODDZ_PREDICTION_STORAGE[predictableToken][chainId][asset]
    );
    let roundDetails;
    if (marketState === MARKET_STATUS.ACTIVE) {
        roundDetails = await predictionManager.methods
            .getArrayRounds(
                Number(currentRoundId) - 3,
                Number(currentRoundId) + 2
            )
            .call();
    } else {
        const currentTimestamp: number = Math.floor(Date.now() / 1000);

        if (endRoundMarketTime - currentTimestamp <= roundTime) {
            roundDetails = await predictionManager.methods
                .getArrayRounds(
                    Number(currentRoundId) - 3,
                    Number(currentRoundId)
                )
                .call();
        } else if (endRoundMarketTime - currentTimestamp <= 2 * roundTime) {
            roundDetails = await predictionManager.methods
                .getArrayRounds(
                    Number(currentRoundId) - 3,
                    Number(currentRoundId) + 1
                )
                .call();
        } else {
            // eslint-disable-next-line no-lonely-if
            if (currentRoundId < 2) {
                roundDetails = await predictionManager.methods
                    .getArrayRounds(
                        Number(currentRoundId),
                        Number(currentRoundId) + 3
                    ) // this is correct logic - commented out for quick fix
                    // .getArrayRounds(Number(currentRoundId) - 1, Number(currentRoundId))
                    .call();
            } else if (currentRoundId < 3) {
                roundDetails = await predictionManager.methods
                    .getArrayRounds(
                        Number(currentRoundId) - 1,
                        Number(currentRoundId) + 3
                    ) // this is correct logic - commented out for quick fix
                    // .getArrayRounds(Number(currentRoundId) - 1, Number(currentRoundId))
                    .call();
            } else {
                roundDetails = await predictionManager.methods
                    .getArrayRounds(
                        Number(currentRoundId) - 3,
                        Number(currentRoundId) + 3
                    ) // this is correct logic - commented out for quick fix
                    // .getArrayRounds(Number(currentRoundId) - 1, Number(currentRoundId))
                    .call();
            }
        }
    }

    const roundInfo: RoundProps[] = [];

    roundDetails.forEach(rnd => {
        if (
            marketState === MARKET_STATUS.ACTIVE &&
            Number(rnd.roundId) === Number(currentRoundId)
        ) {
            roundInfo.push({
                currentRoundId,
                downPredictAmount: rnd.downPredictAmount,
                endPrice: rnd.endPrice,
                rewardAmount: rnd.rewardAmount,
                rewardBaseCalAmount: rnd.rewardBaseCalAmount,
                roundEndTimestamp: rnd.roundEndTimestamp,
                roundId: 0,
                roundStartTimestamp: rnd.roundStartTimestamp,
                roundState: rnd.roundState,
                startPrice: rnd.startPrice,
                totalAmount: rnd.totalAmount,
                upPredictAmount: rnd.upPredictAmount,
            });
        }
        roundInfo.push({
            currentRoundId,
            downPredictAmount: rnd.downPredictAmount,
            endPrice: rnd.endPrice,
            rewardAmount: rnd.rewardAmount,
            rewardBaseCalAmount: rnd.rewardBaseCalAmount,
            roundEndTimestamp: rnd.roundEndTimestamp,
            roundId: rnd.roundId,
            roundStartTimestamp: rnd.roundStartTimestamp,
            roundState: rnd.roundState,
            startPrice: rnd.startPrice,
            totalAmount: rnd.totalAmount,
            upPredictAmount: rnd.upPredictAmount,
        });
    });

    return roundInfo;
};

export const getCurrentRoundId = async (
    asset: string,
    chainId: number,
    library: any,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider ||
            Web3.givenProvider ||
            new Web3.providers.HttpProvider(NETWORK_URL)
    );

    web3.setProvider(RPC_URLS[chainId]); // should be changed once we introduce new network

    const predictionCont = new web3.eth.Contract(
        Prediction as any,
        ODDZ_PREDICTION[predictableToken][chainId][asset]
    );

    const currentRoundId = await predictionCont.methods.currentRoundId().call();
    return currentRoundId;
};

export const getMarketActiveTime = async (
    asset: string,
    chainId: number,
    library: any,
    currentTimeStamp: number
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider ||
            Web3.givenProvider ||
            new Web3.providers.HttpProvider(NETWORK_URL)
    );

    web3.setProvider(RPC_URLS[chainId]); // should be changed once we introduce new network

    const predictionCont = new web3.eth.Contract(
        NyseMarket as any,
        NYSE_MARKET[chainId]
    );

    const time = await predictionCont.methods
        .getMarketActiveTime(currentTimeStamp)
        .call();
    return time;
};

export const getMarketStatus = async (
    asset: string,
    chainId: number,
    library: any,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider ||
            Web3.givenProvider ||
            new Web3.providers.HttpProvider(NETWORK_URL)
    );

    web3.setProvider(RPC_URLS[chainId]); // should be changed once we introduce new network

    const predictionCont = new web3.eth.Contract(
        Prediction as any,
        ODDZ_PREDICTION[predictableToken][chainId][asset]
    );
    const marketState = await predictionCont.methods.marketStatus().call();
    return marketState;
};

export const getCommitedInfo = async (
    roundId: number,
    account: any,
    asset: string,
    chainId: number,
    library: any,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider ||
            Web3.givenProvider ||
            new Web3.providers.HttpProvider(NETWORK_URL)
    );
    web3.setProvider(RPC_URLS[chainId]); // should be changed once we introduce new network

    const predictionManager = new web3.eth.Contract(
        PredictionStorage as any,
        ODDZ_PREDICTION_STORAGE[predictableToken][chainId][asset]
    );

    const roundDetails = await predictionManager.methods
        .getBetInfo(roundId, account)
        .call();

    return roundDetails;
};

export const refund = async (
    asset: string,
    predictionRoundId: number,
    gasPrice,
    user: any,
    confirmHandler: () => void,
    callback: () => void,
    errorHandler: () => void,
    library: any,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider ||
            Web3.givenProvider ||
            new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();

    const predictionCont = new web3.eth.Contract(
        Prediction as any,
        ODDZ_PREDICTION[predictableToken][chainId][asset]
    );

    try {
        const gasLimit = await predictionCont.methods
            .refundUsers(predictionRoundId, user)
            .estimateGas({ from: user });

        const refundMethod = await predictionCont.methods
            .refundUsers(predictionRoundId, user)
            .send({
                from: user,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .on("confirmation", confirmHandler)
            .then(callback);

        return refundMethod;
    } catch (e) {
        throw e;
    }
};

export const claimLossless = async (
    library: any,
    gasPrice,
    asset: string,
    predictionRoundId: number,
    user: any,
    callback: () => void,
    errorHandler: () => void,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(library?.provider);
    const chainId = await web3.eth.getChainId();

    const predictionCont = new web3.eth.Contract(
        ODDZSDKLossless as any,
        ODDZ_SDK[predictableToken][chainId]
    );

    const roundIds: any = [predictionRoundId];
    // const isMaticToken = selectedToken !== PREDICT_TOKENS.MATIC;
    const predStruct = {
        underlying: ethers.utils.formatBytes32String(asset),
        strike: ethers.utils.formatBytes32String("USD"),
        roundId: Number(0),
        directionUp: false,
    };
    try {
        const gasLimit = await predictionCont.methods
            .claim(predStruct, roundIds)
            .estimateGas({ from: user });

        const predictmethod = await predictionCont.methods
            .claim(predStruct, roundIds)
            .send({
                from: user,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .then(callback);

        return predictmethod;
    } catch (e) {
        throw e;
    }
};

export const claim = async (
    library: any,
    selectedToken: string,
    gasPrice,
    asset: string,
    predictionRoundId: number,
    user: any,
    slippage: number,
    market,
    confirmHandler: () => void,
    callback: () => void,
    errorHandler: () => void
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(library?.provider);

    const predictionCont = new web3.eth.Contract(Prediction as any, market);

    const roundIds: any = [predictionRoundId];
    const isMaticToken = selectedToken !== PREDICT_TOKENS.MATIC;

    try {
        const gasLimit = await predictionCont.methods
            .claim(
                roundIds,
                web3.utils.fromAscii(selectedToken),
                isMaticToken,
                slippage,
                user
            )
            .estimateGas({ from: user });
        const predictmethod = await predictionCont.methods
            .claim(
                roundIds,
                web3.utils.fromAscii(selectedToken),
                isMaticToken,
                slippage,
                user
            )
            .send({
                from: user,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .on("confirmation", confirmHandler)
            .then(callback);

        return predictmethod;
    } catch (e) {
        errorHandler();
    }
};
export const claimBNB = async (
    library: any,
    gasPrice,
    asset: string,
    predictionRoundId: number,
    user: any,
    callback: () => void,
    errorHandler: () => void,
    predictableToken: string,
    slippage: number,
    selectedToken
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(library?.provider);
    const chainId = await web3.eth.getChainId();

    const predictionCont = new web3.eth.Contract(
        BNBSDK as any,
        ODDZ_SDK[predictableToken][chainId]
    );

    const roundIds: any = [predictionRoundId];
    // const isMaticToken = selectedToken !== PREDICT_TOKENS.MATIC;
    const predStruct = {
        underlying: ethers.utils.formatBytes32String(asset),
        strike: ethers.utils.formatBytes32String("USD"),
        roundId: Number(0),
        directionUp: false,
    };

    const isBNBToken = selectedToken === PREDICT_TOKENS.BGN;

    const swapParams = {
        slippage,
        toAsset: ethers.utils.formatBytes32String(selectedToken),
        fromAsset: ethers.utils.formatBytes32String(selectedToken),
        convert: isBNBToken,
    };

    try {
        const gasLimit = await predictionCont.methods
            .claim(predStruct, roundIds, swapParams)
            .estimateGas({ from: user });

        const predictmethod = await predictionCont.methods
            .claim(predStruct, roundIds, swapParams)
            .send({
                from: user,
                gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
                gas: Math.round(gasLimit * 1.5),
            })
            .on("error", errorHandler)
            .then(callback);

        return predictmethod;
    } catch (e) {
        throw e;
    }
};

export const getTreasuryFee = async (
    asset: string,
    selectedChain: number,
    library: any,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider ||
            Web3.givenProvider ||
            new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const predictionCont = new web3.eth.Contract(
        Prediction as any,
        ODDZ_PREDICTION[predictableToken][selectedChain][asset]
    );

    const treasuryFee = await predictionCont.methods.treasuryFee().call();

    return treasuryFee;
};

export const getRoundInterval = async (
    asset: string,
    chainId: number,
    library: any,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider ||
            Web3.givenProvider ||
            new Web3.providers.HttpProvider(NETWORK_URL)
    );
    web3.setProvider(RPC_URLS[chainId]);

    const predictionCont = new web3.eth.Contract(
        Prediction as any,
        ODDZ_PREDICTION[predictableToken][chainId][asset]
    );

    const roundInterval = await predictionCont.methods.roundTime().call();

    return roundInterval;
};

export const getUserRewardAmount = async (
    asset: string,
    roundId: number,
    user: any,
    chainId: number,
    library: any,
    predictableToken: string,
    market
) => {
    try {
        if (!NETWORK_URL) return {};
        const web3 = new Web3(
            library?.provider ||
                Web3.givenProvider ||
                new Web3.providers.HttpProvider(NETWORK_URL)
        );

        web3.setProvider(RPC_URLS[chainId]);

        const predictionCont = new web3.eth.Contract(Prediction as any, market);

        const roundIds = [roundId];

        const rewardAmount = await predictionCont.methods
            .getRewards(roundIds, user)
            .call({ from: user });

        return rewardAmount;
    } catch (err) {
        throw err;
    }
};

export const getMinPredictAmount = async (
    asset: string,
    user: any,
    chainId: number,
    library: any,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider ||
            Web3.givenProvider ||
            new Web3.providers.HttpProvider(NETWORK_URL)
    );
    web3.setProvider(RPC_URLS[chainId]);

    const predictionCont = new web3.eth.Contract(
        Prediction as any,
        ODDZ_PREDICTION[predictableToken][chainId][asset]
    );

    const minPredictamount = await predictionCont.methods
        .minPredictAmount()
        .call({ from: user });

    return minPredictamount / USDC_DECIMAL;
};
