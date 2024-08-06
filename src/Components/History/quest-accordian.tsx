import {
    MarketResult,
    MarketState,
    QuestState,
} from "@Components/Quests/constants";
import {
    formatQuestion,
    fromWei,
    getFinalOutcomeString,
    getFinalOutcomeTimes,
    getUserSelectedOutcome,
    returnCurrencyName,
    trimmingQuest,
} from "@Components/Quests/questhelpers";
import TooltipAnswerHistory from "@Components/Quests/tooltipAnswersHistory";
import InfoIcon from "@Public/svgs/info.svg";
import { AppState } from "@Redux";
import { rewardsText } from "@Utils/common";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";

const QuestAccordian = ({ questHistory, status }) => {
    const { library } = useWeb3React();
    // const betAmount = Number(questHistory.betAmount) / 1e18;
    // const rewardWeightage = betAmount / questHistory.markets.length;
    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );
    const fullConfig = resolveConfig(tailwindConfig);

    const { t } = useTranslation();
    const returnColor = value => {
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

    const returnText = (value, token) => {
        if (value !== "---") {
            return `${value} ${token}`;
        }
        return value;
    };
    return (
        <>
            <div className="hidden sm:block px-4 bg-history-section  w-full">
                <div
                    className="grid justify-between mt-[16px] mb-[12px] text-xs text-primary-200"
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "11.66% 10.14% 17.14% 12.38% 9.47% 10.38% 16.8%",
                    }}
                >
                    <div className=" col-span-2 ">{t("Questions")}</div>
                    <div>{t("Your Answers")}</div>
                    <div>{t("Correct Answers")}</div>

                    <div>{t("Amount Entered")}</div>
                    <div>{t("Amount Received")}</div>
                    <div className="text-xs flex text-primary-200">
                        <div>
                            {t("Rewards")}
                            &nbsp;
                        </div>
                        <div
                            className="pt-0.5 "
                            data-tip={`${rewardsText(predictableToken)} ${t(
                                "tokens are won only if there are predictions placed on the opposing outcomes!"
                            )}`}
                            data-for="tooltipforreward"
                            data-place="bottom"
                        >
                            <InfoIcon />
                        </div>
                        <div>
                            <ReactTooltip
                                id="tooltipforreward"
                                effect="solid"
                                className="text-center text-sm justify-center absolute z-100 rounded-md"
                                backgroundColor={
                                    fullConfig.theme.colors[
                                        "tooltip-background"
                                    ]
                                }
                                textColor={
                                    fullConfig.theme.colors["tooltip-text"]
                                }
                                multiline
                            />
                        </div>
                    </div>
                </div>
                {questHistory.markets.map((ques, index) => {
                    const { outcomeIds } = ques.market;
                    const isBetWon = outcomeIds.includes(
                        ques.market.finalOutcomeId
                    );
                    const returnTextColor = () => {
                        let color = "text-red-500";
                        if (ques.result && ques.result === MarketResult.WIN) {
                            color = isBetWon // && Number(ques.reward) !== 0
                                ? "text-green-500"
                                : "text-red-500";
                        }
                        return color;
                    };

                    const totalReward = returnColor(ques.reward);

                    const selectedOutcome = getUserSelectedOutcome(ques);

                    const finalOutcomeString = getFinalOutcomeString(ques);

                    const finalOutcomeIndex = ques.market.outcomeStrings.indexOf(
                        finalOutcomeString
                    );
                    const betAmount = ques.outcomeAmount[finalOutcomeIndex];

                    const returnCorrectAnsColor = () => {
                        return selectedOutcome === finalOutcomeString
                            ? "text-primary-success"
                            : "text-primary-error";
                    };

                    return (
                        <div
                            className="grid text-sm leading-[22px] justify-between text-primary-200 font-normal w-full bg-history-section mb-2"
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "11.66% 10.14% 17.14% 12.38% 9.47% 10.38% 16.8%",
                            }}
                        >
                            <div
                                className="col-span-2"
                                title={`${formatQuestion(
                                    ques.market.question
                                )}`}
                            >
                                {`${index + 1}. ${trimmingQuest(
                                    formatQuestion(ques.market.question),
                                    35
                                )}`}
                            </div>

                            <div className="flex">
                                {`${getFinalOutcomeTimes(ques)} Times`}
                                <span className="pt-1.5 pl-1">
                                    <TooltipAnswerHistory
                                        userData={ques.outcomeTimes}
                                        option={ques.market.outcomeStrings}
                                    />
                                </span>
                            </div>
                            {status === QuestState.LIVE ? (
                                "--"
                            ) : (
                                <div className={` ${returnCorrectAnsColor()}`}>
                                    {finalOutcomeString}
                                </div>
                            )}
                            <div>
                                <span className=" font-normal">
                                    {`${fromWei(
                                        ques.totalBet,
                                        library
                                    )} ${predictableToken}`}
                                </span>
                            </div>
                            <div>
                                <span
                                    className={`${returnTextColor()} font-normal`}
                                >
                                    {`${
                                        betAmount
                                            ? fromWei(betAmount, library)
                                            : fromWei(ques.totalBet, library)
                                    } ${predictableToken}`}
                                </span>
                            </div>
                            <div className="text-xs  col">
                                <span
                                    className={` font-normal text-md ${totalReward.color}`}
                                >
                                    {returnText(
                                        totalReward.text,
                                        returnCurrencyName(predictableToken)
                                    )}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="border-t border-history-section sm:hidden">
                {questHistory.markets.map((ques, index) => {
                    const { outcomeIds } = ques.market;
                    const isBetWon = outcomeIds.includes(
                        ques.market.finalOutcomeId
                    );
                    const returnTextColor = () => {
                        let color = "text-primary-200";
                        if (ques.market.state === MarketState.RESOLVED) {
                            color = isBetWon
                                ? "text-[#2D9017]"
                                : "text-red-500";
                        }
                        return color;
                    };
                    const totalReward = returnColor(ques.reward);

                    const selectedOutcome = getUserSelectedOutcome(ques);
                    const finalOutcomeString = getFinalOutcomeString(ques);
                    const finalOutcomeIndex = ques.market.outcomeStrings.indexOf(
                        finalOutcomeString
                    );
                    const betAmount = ques.outcomeAmount[finalOutcomeIndex];

                    const returnCorrectAnsColor = () => {
                        return selectedOutcome === finalOutcomeString
                            ? "text-primary-success"
                            : "text-primary-error";
                    };

                    return (
                        <div className="bg-history-section">
                            <div className="text-xs font-normal leading-5 text-left text-primary-200 mb-2.5 mt-6">
                                {`${t("Questions")} ${index + 1}`}
                            </div>
                            <div
                                className="text-sm leading-[22px] font-normal text-left text-primary-100"
                                title={`${formatQuestion(
                                    ques.market.question
                                )}`}
                            >
                                {`${index + 1}. ${trimmingQuest(
                                    formatQuestion(ques.market.question),
                                    35
                                )}`}
                            </div>
                            <div className="flex space-x-6 pt-4">
                                <div className="w-[124px] flex flex-col space-y-4">
                                    <div className="text-sm leading-[22px] text-primary-200">
                                        <span className="flex items-center gap-1 font-normal  text-left">
                                            {`${getFinalOutcomeTimes(ques)} ${t(
                                                "Times"
                                            )}`}
                                            <TooltipAnswerHistory
                                                userData={ques.outcomeTimes}
                                                option={
                                                    ques.market.outcomeStrings
                                                }
                                            />
                                        </span>
                                        <h2 className=" font-medium  text-left">
                                            {t("Your Answers")}
                                        </h2>
                                    </div>
                                    <div>
                                        <span className="text-left font-normal">
                                            {`${fromWei(
                                                ques.totalBet,
                                                library
                                            )} ${predictableToken}`}
                                        </span>
                                        <h2 className="font-medium  text-left text-sm leading-[22px] text-primary-200">
                                            {t("Amt Entered")}
                                        </h2>
                                    </div>
                                    <div className="text-primary-200 text-sm font-normal">
                                        <h1
                                            className={`text-left relative  ${totalReward.color}`}
                                        >
                                            {returnText(
                                                totalReward.text,
                                                returnCurrencyName(
                                                    predictableToken
                                                )
                                            )}
                                        </h1>
                                        <h2 className="font-medium items-center text-primary-200 flex  text-left">
                                            {t("Rewards")}
                                            &nbsp;
                                            <div
                                                className="pt-0.5"
                                                data-tip={`BRN ${t(
                                                    "tokens are won only if there are predictions placed on the opposing outcomes!"
                                                )}`}
                                                data-for="tooltipforreward1"
                                                data-place="bottom"
                                            >
                                                <InfoIcon />
                                            </div>
                                            <div>
                                                <ReactTooltip
                                                    id="tooltipforreward1"
                                                    effect="solid"
                                                    className="text-center text-sm justify-center absolute z-100 rounded-md"
                                                    backgroundColor={
                                                        fullConfig.theme.colors[
                                                            "tooltip-background"
                                                        ]
                                                    }
                                                    textColor={
                                                        fullConfig.theme.colors[
                                                            "tooltip-text"
                                                        ]
                                                    }
                                                    multiline
                                                />
                                            </div>
                                        </h2>
                                    </div>
                                </div>
                                <div className="w-[124px] flex flex-col space-y-4">
                                    <div className="text-sm leading-[22px] text-primary-200">
                                        <span
                                            className={`text-primary-100 font-normal inline-block text-left ${returnCorrectAnsColor()}`}
                                        >
                                            {finalOutcomeString}
                                        </span>
                                        <h2 className="font-medium  text-left text-primary-200">
                                            {t("Correct Answers")}
                                        </h2>
                                    </div>
                                    <div>
                                        <span
                                            className={`${returnTextColor()}  text-left  text-sm leading-[22px] font-normal`}
                                        >
                                            {`${
                                                betAmount
                                                    ? fromWei(
                                                          betAmount,
                                                          library
                                                      )
                                                    : fromWei(
                                                          ques.totalBet,
                                                          library
                                                      )
                                            } ${predictableToken}`}
                                        </span>
                                        <h2 className="text-left font-medium text-sm leading-[22px] text-primary-200">
                                            {t("Amt Received")}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default QuestAccordian;
