/* eslint-disable no-nested-ternary */
import React from "react";
import WonTag from "@Public/svgs/won-tag.svg";
import LostTag from "@Public/svgs/lost-tag.svg";
import EnteredTag from "@Public/svgs/entered-tag.svg";
import { formatTime } from "@Utils/time";
import { QuestState } from "./constants";
import { fromWei } from "./questhelpers";

export const tagRender = (tagState, translate) => {
    const TAG = {
        ENTERED: {
            text: translate("You Entered"),
            Icon: EnteredTag,
            textColor: "text-primary-blue",
            bgColor: "bg-primary-blue bg-opacity-20",
        },
        WON: {
            text: translate("You Won"),
            Icon: WonTag,
            textColor: "text-primary-success",
            bgColor: "bg-primary-success bg-opacity-10",
        },
        LOST: {
            text: translate("You Lost"),
            Icon: LostTag,
            textColor: "text-primary-error",
            bgColor: "bg-primary-error bg-opacity-10",
        },
    };
    return (
        <div
            className={`absolute top-0 left-0 ${TAG[tagState].textColor} ${TAG[tagState].bgColor}  px-2 py-1 rounded-br-lg rounded-tl-lg text-xs font-medium`}
        >
            <div className="flex gap-1 items-center text-sm leading-4 font-normal justify-between">
                {TAG[tagState].Icon()}
                {TAG[tagState].text}
            </div>
        </div>
    );
};

export const returnMarketState = market => {
    const currentTimestamp: number = Math.floor(Date.now() / 1000);

    const state = { text: "", color: "" };
    if (currentTimestamp < market.predictionStartTimestamp) {
        state.text = QuestState.UPCOMING;
        state.color = "text-primary-100";
    } else if (
        market.predictionStartTimestamp < currentTimestamp &&
        currentTimestamp < market.opensAtTimestamp
    ) {
        state.text = "Live";
        state.color = "text-green-500";
    } else if (
        market.opensAtTimestamp < currentTimestamp &&
        currentTimestamp < market.closesAtTimestamp
    ) {
        state.text = QuestState.ENDED;
        state.color = "text-primary-100";
    } else if (
        currentTimestamp > market.closesAtTimestamp &&
        !market.resolved
    ) {
        state.text = QuestState.INRESOLUTION;
        state.color = "text-primary-warning";
    } else if (currentTimestamp > market.closesAtTimestamp && market.resolved) {
        state.text = QuestState.EXPIRED;
        state.color = "text-primary-error";
    }
    return state;
};

export const tagStatus = userData => {
    if (userData.length > 0 && Number(userData[0]?.betAmount) > 0) {
        if (userData[0].quest.resolved) {
            const reward = userData[0]?.markets.reduce(
                (previousValue, currentValue) => {
                    return Number(previousValue) + Number(currentValue.reward);
                },
                0
            );

            if (reward > 0) {
                return "WON";
            }
            if (reward <= 0) {
                return "LOST";
            }
        }
        return "ENTERED";
    }
    return "";
};

export const categoryRender = market => {
    switch (market.category) {
        case "Crypto":
            return {
                baseColor: "#FFD60A",
                gradient:
                    "linear-gradient(270deg, #FFD60A 0.13%, rgba(255, 214, 10, 0.3) 100.13%)",
            };
        case "Politics":
            return {
                baseColor: "#F95738",
                gradient:
                    "linear-gradient(270deg, #F95738 0.13%, rgba(249, 87, 56, 0.3) 100.13%)",
            };
        case "Sports":
            return {
                baseColor: "#03B1E3",
                gradient:
                    "linear-gradient(270deg, #03B1E3 0.13%, rgba(31, 82, 113, 0.3) 100.13%)",
            };
        case "Others":
            return {
                baseColor: "#E4C1F9",
                gradient:
                    "linear-gradient(270deg, #E4C1F9 0.13%, rgba(228, 193, 249, 0.3) 100.13%)",
            };
        default:
            return {
                baseColor: "#E4C1F9",
                gradient:
                    "linear-gradient(270deg, #E4C1F9 0.13%, rgba(228, 193, 249, 0.3) 100.13%)",
            };
    }
};

export const Message = () => {
    return (
        <>
            <div className="text-primary-200 text-center font-medium text-highlight sm:text-sm text-xs justify-center mb-16px">
                Please connect your wallet to experience the magic of prediction
            </div>
        </>
    );
};

export const WrongNetworkMessage = () => {
    return (
        <>
            <div className="text-primary-200 text-center font-medium text-highlight sm:text-sm text-xs justify-center mb-16px">
                Please switch network to polygon for experiencing the magic of
                prediction
            </div>
        </>
    );
};

export const dispayTimer = (questData, query, t) => {
    const currentTimestamp: number = Math.floor(Date.now() / 1000);

    if (currentTimestamp < questData.predictionStartTimestamp) {
        return {
            text: t("Prediction Starts in"),
            value: questData.predictionStartTimestamp,
            color: "text-primary-300",
        };
    }
    if (currentTimestamp < questData.opensAtTimestamp) {
        return {
            text: t("Prediction Ends in"),
            value: questData.opensAtTimestamp,
            color: "text-primary-300",
        };
    }
    if (currentTimestamp < questData.closesAtTimestamp) {
        return {
            text: t("Round Ends in"),
            value: questData.closesAtTimestamp,
            color: "text-primary-300",
        };
    }
    if (query.inresolution === "true") {
        return {
            text: QuestState.INRESOLUTION,
            value: 0,
            color: "text-primary-warning",
        };
    }
    return {
        text: QuestState.EXPIRED,
        value: 0,
        color: "text-primary-error",
    };
};

export const renderer = ({ days, hours, minutes, seconds }) => {
    return <span>{formatTime(days, hours, minutes, seconds)}</span>;
};

export const rendererMin = ({ days, hours, minutes, seconds }) => {
    return <span>{formatTime(days, hours, minutes, seconds)}</span>;
};

export const returnColor = (value, library) => {
    const valueDesc = {
        color: "text-primary-200",
        text: fromWei(value, library).toString(),
    };
    if (Number(value) !== 0) {
        valueDesc.color = "text-green-500";
        valueDesc.text = fromWei(value, library).toString();
    }
    if (Number(value) === 0) {
        valueDesc.color = "text-primary-200";
        valueDesc.text = "---";
    }
    return valueDesc;
};

export const returnText = (value, token) => {
    if (value !== "---") {
        return `${value} ${token}`;
    }
    return value;
};

export const returnStateText = market => {
    const currentTimestamp: number = Math.floor(Date.now() / 1000);

    return currentTimestamp < market.predictionStartTimestamp
        ? {
              text: "Starts in",
              color: "text-primary-100",
          }
        : currentTimestamp < market.opensAtTimestamp
        ? {
              text: "Ends in",
              color: "text-primary-100",
          }
        : { text: "", color: "" };
};
