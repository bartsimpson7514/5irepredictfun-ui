import Web3 from "web3";
import {
    ODDZ_PREDICTION,
    ODDZ_SDK,
    QUEST_POOL,
    USDC_DECIMAL,
} from "@Constants";
import { ethers } from "ethers";
import ODDZSDK from "@Contracts/OddzSDK.json";
import ODDZSDKLossless from "@Contracts/OddzSDKLossless.json";
import ERC20ABI from "@Contracts/erc-20.json";
// import { returnTokenAddress } from "@Utils/common";
// import { approveWithGasless, predictWithGasless } from "./gasless-meta-txn";

const NETWORK_URL = process.env.NEXT_PUBLIC_NETWORK_URL;
/* eslint consistent-return: ["error", { "treatUndefinedAsUnspecified": true }] */

export const predictWithGameToken = async (
    library: any,
    asset: string,
    roundId: number,
    commitedAmount: number,
    user = "",
    predictUp: boolean,
    gasPrice: any,
    confirmHandler: () => void,
    callback: () => void,
    errorHandler,
    predictableToken: string
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();
    const predictManager = new web3.eth.Contract(
        ODDZSDKLossless as any,
        ODDZ_SDK[predictableToken][chainId]
    );
    const calcedAmount = ethers.utils.parseUnits(commitedAmount.toString(), 18);

    const predStruct = {
        underlying: ethers.utils.formatBytes32String(asset),
        strike: ethers.utils.formatBytes32String("USD"),
        roundId,
        directionUp: predictUp,
    };

    const tokenContract = new web3.eth.Contract(
        ERC20ABI as any,
        QUEST_POOL[predictableToken][chainId]
    );

    const allowance = await tokenContract.methods
        .allowance(user, ODDZ_PREDICTION[predictableToken][chainId][asset])
        .call();
    const allowanceAmount = ethers.utils.formatEther(allowance.toString());

    const totalSupply = await tokenContract.methods.totalSupply().call();

    if (Number(allowanceAmount) < commitedAmount) {
        await tokenContract.methods
            .approve(
                ODDZ_PREDICTION[predictableToken][chainId][asset],
                totalSupply
            )
            .send({
                from: user,
            });
    }
    const gasLimit = await predictManager.methods
        .predict(
            predStruct,
            user,
            process.env.NEXT_PUBLIC_PROVIDER_ADDRESS,
            calcedAmount
        )
        .estimateGas({ from: user });

    const predictmethod = await predictManager.methods
        .predict(
            predStruct,
            user,
            process.env.NEXT_PUBLIC_PROVIDER_ADDRESS,
            calcedAmount
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
};

export const predict = async (
    library: any,
    asset: string,
    roundId: number,
    commitedAmount: number,
    user = "",
    predictUp: boolean,
    gasPrice: any,
    confirmHandler: () => void,
    callback: () => void,
    errorHandler,
    predictableToken: string
    // strike?: number
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const chainId = await web3.eth.getChainId();

    const predictManager = new web3.eth.Contract(
        ODDZSDK as any,
        ODDZ_SDK[predictableToken][chainId]
    );
    const calcedAmount = ethers.utils.parseUnits(commitedAmount.toString(), 18);

    const predStruct = {
        underlying: ethers.utils.formatBytes32String(asset),
        strike: ethers.utils.formatBytes32String("USD"),
        roundId: Number(roundId),
        directionUp: predictUp,
    };

    const gasLimit = await predictManager.methods
        .predict(predStruct, user, process.env.NEXT_PUBLIC_PROVIDER_ADDRESS)
        .estimateGas({ from: user, value: calcedAmount });
    const predictmethod = await predictManager.methods
        .predict(predStruct, user, process.env.NEXT_PUBLIC_PROVIDER_ADDRESS)
        .send({
            from: user,
            value: calcedAmount,
            gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
            gas: Math.round(gasLimit * 1.5),
        })
        .on("error", errorHandler)
        .on("confirmation", confirmHandler)
        .then(callback);

    return predictmethod;
};

// export const swapAndpredict = async (
//     library: any,
//     predictableToken: string,
//     asset: string,
//     roundId: number,
//     commitedAmount: number,
//     user = "",
//     predictUp: boolean,
//     gasPrice: any,
//     slippage: number,
//     roundEndTime: number,
//     confirmHandler: () => void,
//     callback: () => void,
//     errorHandler
// ) => {
//     if (!NETWORK_URL) return {};
//     const web3 = new Web3(
//         library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
//     );
//     const chainId = await web3.eth.getChainId();
//     const predictManager = new web3.eth.Contract(
//         ODDZSDK as any,
//         ODDZ_SDK[predictableToken][chainId]
//     );

//     const tokenContract = new web3.eth.Contract(
//         ERC20ABI as any,
//         returnTokenAddress(predictableToken, chainId)
//     );

//     const decimals = await tokenContract.methods.decimals().call();

//     const calcedAmount = ethers.utils.parseUnits(
//         commitedAmount.toString(),
//         decimals
//     );

//     const allowance = await tokenContract.methods
//         .allowance(user, ODDZ_SDK[predictableToken][chainId])
//         .call();
//     const totalSupply = await tokenContract.methods.totalSupply().call();

//     if (
//         web3.utils
//             .toBN(allowance)
//             .sub(web3.utils.toBN(calcedAmount.toString()))
//             .isNeg()
//     ) {
//         const approvalGasLimit = await tokenContract.methods
//             .approve(ODDZ_SDK[predictableToken][chainId], totalSupply)
//             .estimateGas({ from: user });

//         await tokenContract.methods
//             .approve(ODDZ_SDK[predictableToken][chainId], totalSupply)
//             .send({
//                 from: user,
//                 gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
//                 gas: Math.round(approvalGasLimit * 1.3),
//             });
//     }

//     const swapStruct = {
//         amountIn: calcedAmount,
//         deadline: roundEndTime,
//         fromAsset: ethers.utils.formatBytes32String(predictableToken),
//         toAsset: ethers.utils.formatBytes32String("MATIC"),
//     };

//     const predStruct = {
//         underlying: ethers.utils.formatBytes32String(asset),
//         strike: ethers.utils.formatBytes32String("USD"),
//         roundId: Number(roundId),
//         directionUp: predictUp,
//     };

//     const gasLimit = await predictManager.methods
//         .swapAndPredict(swapStruct, predStruct, slippage, user)
//         .estimateGas({ from: user });

//     const predictmethod = await predictManager.methods
//         .swapAndPredict(swapStruct, predStruct, slippage, user)
//         .send({
//             from: user,
//             gasPrice: web3.utils.toWei(String(gasPrice), "gwei"),
//             gas: Math.round(gasLimit * 1.3),
//         })
//         .on("error", errorHandler)
//         .on("confirmation", confirmHandler)
//         .then(callback);

//     return predictmethod;
// };

// export const swapAndPredictWithGasless = async (
//     library: any,
//     predictableToken: string,
//     asset: string,
//     roundId: number,
//     commitedAmount: number,
//     user = "",
//     predictUp: boolean,
//     slippage: number,
//     roundEndTime: number
// ) => {
//     if (!NETWORK_URL) return {};
//     const web3 = new Web3(
//         library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
//     );
//     const chainId = await web3.eth.getChainId();
//     const sdkContract = new web3.eth.Contract(
//         ODDZSDK as any,
//         ODDZ_SDK[predictableToken][chainId]
//     );

//     const tokenContract = new web3.eth.Contract(
//         ERC20ABI as any,
//         returnTokenAddress(predictableToken, chainId)
//     );

//     const decimals = await tokenContract.methods.decimals().call();

//     const calcedAmount = ethers.utils.parseUnits(
//         commitedAmount.toString(),
//         decimals
//     );

//     const swapStruct = {
//         amountIn: calcedAmount,
//         deadline: roundEndTime,
//         fromAsset: ethers.utils.formatBytes32String(predictableToken),
//         toAsset: ethers.utils.formatBytes32String("MATIC"),
//     };

//     const predStruct = {
//         underlying: ethers.utils.formatBytes32String(asset),
//         strike: ethers.utils.formatBytes32String("USD"),
//         roundId: Number(roundId),
//         directionUp: predictUp,
//     };

//     const totalSupply = await tokenContract.methods.totalSupply().call();
//     const allowance = await tokenContract.methods
//         .allowance(user, ODDZ_SDK[predictableToken][chainId])
//         .call();

//     if (
//         web3.utils
//             .toBN(allowance)
//             .sub(web3.utils.toBN(calcedAmount.toString()))
//             .isNeg()
//     ) {
//         try {
//             // lets see what we could do with result
//             const result: any = await approveWithGasless(
//                 // same order
//                 totalSupply,
//                 predictableToken,
//                 ODDZ_SDK[predictableToken][chainId],
//                 library
//             );
//             if (!result[0] && result[1] !== "") {
//                 // display txn failed with txn hash from result[1]
//                 return [false, result[1], true];
//             }
//             if (result[1] === "") {
//                 return [false, "", true];
//             }
//         } catch (e) {
//             // if approve fails then return and show alert in frontend
//             // a modal with approve and predict steps will be better here
//             // for gasless on and off for stablecoins
//             return [false, "", true];
//         }
//     }

//     try {
//         const gasLimit = await sdkContract.methods
//             .swapAndPredictWithGasless(swapStruct, predStruct, slippage, user)
//             .estimateGas({ from: user });
//         const result: any = await predictWithGasless(
//             // same order
//             swapStruct,
//             predStruct,
//             process.env.NEXT_PUBLIC_PROVIDER_ADDRESS,
//             gasLimit,
//             library,
//             predictableToken
//         );
//         if (result[0]) {
//             // display success alert along with txn hash from result [1]
//             return [true, result[1], false];
//         }
//         if (result[1] !== "") {
//             // display txn failed with txn hash from result[1]
//             return [false, result[1], false];
//         }
//         // display just failed
//         return [false, "", false];
//     } catch (e) {
//         return [false, "", false];
//     }
// };

export const getMinimumGaslessBetAmount = async (
    library,
    chainId,
    predictableToken
) => {
    if (!NETWORK_URL) return {};
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );

    const predictManager = new web3.eth.Contract(
        ODDZSDK as any,
        ODDZ_SDK[predictableToken][chainId]
    );

    const minGaslessAmount = await predictManager.methods
        .minimumGaslessBetAmount()
        .call();

    return minGaslessAmount / USDC_DECIMAL;
};
