import { AppState } from "@Redux";
import { rewardsText } from "@Utils/common";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import Countdown from "react-countdown";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ClaimOnQuestCards from "./claim-on-quest-card";
import { formatQuestion, fromWei, getFinalOutcomeString } from "./questhelpers";
import { renderer, returnColor, tagRender } from "./questUtils";
import TooltipAnswer from "./tooltipAnswers";

const RenderEndedSection = ({
    tag,
    questData,
    data,
    isAnswered,
    userData,
    ended,
    expired,
    startsin,
    questId,
}) => {
    const { library } = useWeb3React();
    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );
    const { t } = useTranslation();
    let totalBetAmount = 0;
    return (
        <div className="rounded-t-lg sm:p-6 px-4 py-6 bg-card-background relative">
            {tag && tagRender(tag, t)}

            <div className="absolute top-0 right-0 sm:pt-4 sm:pr-6 pt-2 pr-4  text-primary-warning text-xs font-medium">
                {ended ? (
                    <>
                        <span className="text-xs font-normal text-primary-100">
                            {t("In Progress")}
                            &nbsp;
                        </span>
                        <Countdown
                            key={questData?.closesAtTimestamp}
                            date={questData?.closesAtTimestamp * 1000}
                            renderer={renderer}
                        />
                    </>
                ) : null}
                {expired ? (
                    <div className="text-primary-error">{t("Expired")}</div>
                ) : null}
                {startsin ? (
                    <div className="flex gap-1 items-center text-primary-100">
                        <div className="text-xs font-normal	 text-primary-300">
                            {t("Starts in")}
                        </div>
                        <Countdown
                            key={questData?.predictionStartTimestamp}
                            date={questData?.predictionStartTimestamp * 1000}
                            renderer={renderer}
                        />
                    </div>
                ) : null}
            </div>
            <div className="flex sm:gap-y-6 gap-y-4 flex-col">
                <span className=" text-base font-medium text-primary-100 mt-4">
                    {t("Markets", { dataLength: data.length / data.length })}
                </span>
                <div className="flex flex-col gap-4">
                    {React.Children.toArray(
                        data &&
                            data.map((market, index) => {
                                let selectedOutcome;
                                let finalOutcomeString;
                                let finalOutcomeIndex;
                                let totalReward;

                                if (isAnswered) {
                                    if (market) {
                                        selectedOutcome = userData[0]?.markets[
                                            index
                                        ].outcomeTimes.reduce(
                                            (a, b) => Number(a) + Number(b),
                                            0
                                        );
                                        finalOutcomeString = getFinalOutcomeString(
                                            market
                                        );
                                        finalOutcomeIndex = market.market.outcomeStrings.indexOf(
                                            finalOutcomeString
                                        );

                                        const reward =
                                            Number(market.reward) >= 0
                                                ? Number(market.reward) +
                                                  Number(
                                                      userData[0].markets[index]
                                                          .outcomeAmount[
                                                          finalOutcomeIndex
                                                      ]
                                                  )
                                                : Number(market.reward);

                                        totalReward = returnColor(
                                            reward,
                                            library
                                        );

                                        totalBetAmount =
                                            Number(
                                                userData[0].markets[index]
                                                    .outcomeAmount[
                                                    finalOutcomeIndex
                                                ]
                                            ) + totalBetAmount;
                                    }
                                }

                                return (
                                    <div className="flex flex-col ">
                                        <p className="text-primary-300 text-xs font-medium mb-2">
                                            {t("Question_No", {
                                                index: index + 1,
                                            })}
                                        </p>
                                        <p className="text-primary-200 text-sm">
                                            {isAnswered
                                                ? `${formatQuestion(
                                                      market.market.question
                                                  )}`
                                                : `${formatQuestion(
                                                      market.question
                                                  )}`}
                                        </p>
                                        {isAnswered && (
                                            <div className="grid grid-cols-2 gap-6 justify-between mt-3">
                                                <div className="flex flex-col items-start justify-start">
                                                    <p className="text-primary-100 text-sm text-opacity-70 flex items-center gap-1">
                                                        {`${selectedOutcome} Times`}
                                                        <TooltipAnswer
                                                            userData={userData}
                                                            questionNum={index}
                                                            option={
                                                                market.market
                                                                    .outcomeStrings
                                                            }
                                                        />
                                                    </p>
                                                    <h1 className="text-primary-200 text-xs font-medium">
                                                        {t("Your Answer")}
                                                    </h1>
                                                </div>
                                                <div className="flex flex-col items-start justify-start">
                                                    <p
                                                        className={`text-sm ${
                                                            userData[0].markets[
                                                                index
                                                            ].outcomeTimes[
                                                                finalOutcomeIndex
                                                            ] > 0
                                                                ? "text-primary-success"
                                                                : "text-primary-error"
                                                        }`}
                                                    >
                                                        {finalOutcomeString}
                                                    </p>
                                                    <h1 className="text-primary-200 text-xs font-medium">
                                                        {t("Correct Answer")}
                                                    </h1>
                                                </div>
                                                <div className="flex flex-col items-start justify-start">
                                                    <p className="text-primary-100 text-sm opacity-70">
                                                        {`${fromWei(
                                                            market.totalBet,
                                                            library
                                                        )} ${predictableToken}`}
                                                    </p>
                                                    <h1 className="text-primary-200 text-xs font-medium">
                                                        {t("Commit Amount")}
                                                    </h1>
                                                </div>
                                                <div className="flex flex-col items-start justify-start">
                                                    <p
                                                        className={`${totalReward.color} text-sm`}
                                                    >
                                                        {`
                                                               ${
                                                                   totalReward.text
                                                               }
                                                               ${
                                                                   totalReward.text !==
                                                                   "---"
                                                                       ? rewardsText(
                                                                             predictableToken
                                                                         )
                                                                       : ""
                                                               }
                                                            `}
                                                    </p>
                                                    <h1 className="text-primary-200 text-xs font-medium">
                                                        {t("Earnings")}
                                                    </h1>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                    )}
                </div>
            </div>
            <ClaimOnQuestCards
                questId={questId}
                commitAmt={totalBetAmount}
                noQuestion={data.length}
                page="DETAIL"
                betAmount={userData[0]?.betAmount}
            />
        </div>
    );
};

export default RenderEndedSection;
