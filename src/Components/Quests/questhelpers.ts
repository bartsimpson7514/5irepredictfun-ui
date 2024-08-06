import { PREDICT_TOKENS } from "@Constants";
import { toDecimals } from "@Utils";
import { ethers } from "ethers";
import Web3 from "web3";

export const formatValue = (value: number) => {
    if (value >= 1000) {
        return `BGN ${value / 1e3}K`;
    }

    return `BGN ${value}`;
};

export const formatDate = (endTime: number) => {
    const currentTime: number = Date.now();
    const timeRemaing = endTime * 1000 - currentTime;

    if (timeRemaing < 0) {
        return "-";
    }
    const seconds = Math.floor(timeRemaing / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} days`;
    }
    if (hours > 1) {
        return `${hours} hours`;
    }

    return `${minutes} mins`;
};
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
export const getCompleteDate = (epoch: number) => {
    const date = new Date(epoch * 1000);
    return `${
        monthNames[date.getMonth()]
    } ${date.getDate()},${date.getFullYear()} ${date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    })}`;
};

export const formatDateTime = (endTime: number) => {
    if (endTime < 0) {
        return "-";
    }
    const seconds = Math.floor(endTime);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} days`;
    }
    if (hours > 1) {
        return `${hours} hours`;
    }

    return `${minutes} mins`;
};
export const getEpochFromDate = (date: string, time: any) => {
    const epoch = Math.round(new Date(`${date} ${time}`).getTime() / 1000);
    return epoch;
};

export const formatQuestion = (question: string) => {
    return question?.split("␟")[0];
};

const NETWORK_URL = process.env.NEXT_PUBLIC_NETWORK_URL;

export const fromWei = (val: number, library: any) => {
    if (!NETWORK_URL) return;
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );

    // const value = web3.utils.fromWei(String(val), "gwei");
    const mNum = val.toLocaleString("fullwide", { useGrouping: false });

    const bnValue = web3.utils.toBN(mNum).toString();
    const value = web3.utils.fromWei(bnValue, "ether");

    return toDecimals(Number(value), 4);
};

export const convertToWei = (val: number, library: any) => {
    if (!NETWORK_URL) return;
    const web3 = new Web3(
        library?.provider || new Web3.providers.HttpProvider(NETWORK_URL)
    );
    const value = web3.utils.toWei(String(val), "ether");

    return toDecimals(Number(value), 4);
};

export const fromBytestoString = (val: string) => {
    const stringVal = ethers.utils.parseBytes32String(val);
    return stringVal;
};

export const getUserSelectedOutcome = (ques: any) => {
    const bettedOutcome = ques.outcomeAmount.findIndex(
        outcomeamt => Number(outcomeamt) > 0
    );

    const correctQuesArr = [];
    ques.outcomeTimes.filter((element, index) => {
        if (Number(element) > 0) {
            correctQuesArr.push(ques.market.outcomeStrings[index]);
        }
        return 0;
    });

    const outcomeString = correctQuesArr.filter((element, index) => {
        if (element === ques.market.finalOutcomeString) {
            return correctQuesArr[index];
        }
        return 0;
    });

    const selectedOutcome =
        outcomeString.length > 0
            ? outcomeString[0]
            : ques.market.outcomeStrings[bettedOutcome];
    return selectedOutcome;
};

export const isUserInfoPage = () => {
    return (
        window.location.pathname === "/history" ||
        window.location.pathname === "/profile" ||
        window.location.pathname === "/leaderboard"
    );
};

export const trimmingQuest = (quest, characters) => {
    return `${quest.slice(0, characters)}...`;
};

export const getFinalOutcomeString = quest => {
    return quest.market.finalOutcomeString;
};

export const getFinalOutcomeTimes = quest => {
    return quest.outcomeTimes.reduce((a, b) => Number(a) + Number(b), 0);
};

export const returnCurrencyName = predictableToken => {
    return predictableToken === PREDICT_TOKENS.BGN
        ? PREDICT_TOKENS.BRN
        : predictableToken;
};

export const getTotalBetUserAmount = (questId, userData) => {
    let totalBetAmount = 0;
    userData.markets.forEach(function(ele) {
        totalBetAmount += Number(ele.outcomeAmount[ele.market.finalOutcomeId]);
    });

    return totalBetAmount;
};
