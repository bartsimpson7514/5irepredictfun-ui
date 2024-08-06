import { AppState } from "@Redux";
import { rewardsText } from "@Utils/common";
import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import React from "react";
import Countdown from "react-countdown";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { QuestState } from "./constants";
import { formatDate, formatQuestion, fromWei } from "./questhelpers";
import { renderer, returnMarketState, tagRender } from "./questUtils";
import TooltipAnswer from "./tooltipAnswers";

const RenderAnsweredSection = ({
    tag,
    questData,
    data,
    isAnswered,
    userData,
    outcomeRatio,
    answered,
}) => {
    const { library } = useWeb3React();
    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );
    const { t } = useTranslation();
    const currentTimestamp: number = Math.floor(Date.now() / 1000);

    return (
        <div className="rounded-t-lg sm:p-6 px-4 py-6 bg-card-background relative">
            {tag && tagRender(tag, t)}
            <div className="absolute top-0 right-0 sm:pt-4 sm:pr-6 pt-2 pr-4 text-primary-warning rounded-bl-lg rounded-tr-lg text-xs font-medium">
                {answered ? (
                    <div className="flex gap-1 items-center text-primary-300">
                        <div className="text-xs font-normal	 text-primary-warning">
                            {t("Ends in")}
                        </div>
                        <Countdown
                            key={questData?.closesAtTimestamp}
                            date={questData?.closesAtTimestamp * 1000}
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
                                let potentialEarning;

                                if (isAnswered) {
                                    if (market) {
                                        selectedOutcome = userData[0]?.markets[
                                            index
                                        ].outcomeTimes.reduce(
                                            (a, b) => Number(a) + Number(b),
                                            0
                                        );

                                        if (
                                            Object.keys(outcomeRatio).length !==
                                            0
                                        ) {
                                            const maxVal = Math.max(
                                                ...market.outcomeAmount
                                            );

                                            const indexPerc = market.outcomeAmount.findIndex(
                                                outcomeamt =>
                                                    Number(outcomeamt) ===
                                                    Number(maxVal)
                                            );
                                            const percentageRatio =
                                                outcomeRatio[
                                                    market.id.split("-")[0]
                                                ].outcomePercentage[indexPerc];

                                            potentialEarning =
                                                fromWei(
                                                    market.outcomeAmount[
                                                        indexPerc
                                                    ],
                                                    library
                                                ) *
                                                (100 / percentageRatio);
                                        }
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
                                        {isAnswered && userData && (
                                            <div className="grid sm:grid-cols-3 grid-cols-2 gap-6 justify-between mt-3">
                                                <div className="flex flex-col items-start justify-start">
                                                    <p className="text-primary-100 text-sm text-opacity-70 flex items-center gap-1">
                                                        {t("No_Times", {
                                                            selectedOutcome,
                                                        })}

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
                                                    <p className="text-primary-100 text-sm">
                                                        {`${potentialEarning &&
                                                            potentialEarning.toFixed(
                                                                2
                                                            )} ${rewardsText(
                                                            predictableToken
                                                        )}`}
                                                    </p>
                                                    <h1 className="text-primary-200 text-xs font-medium">
                                                        {t(
                                                            "Potential Earnings"
                                                        )}
                                                    </h1>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                    )}
                </div>

                {questData && (
                    <Link
                        href={{
                            pathname: `/quests/${questData.id}}`,
                            query: {
                                marketid: questData.id,
                                inresolution:
                                    formatDate(
                                        Number(questData.closesAtTimestamp)
                                    ) === "-" && questData.resolved === null,
                                ended:
                                    returnMarketState(questData).text ===
                                    QuestState.ENDED,
                                expired: questData.resolved,
                                startsin:
                                    currentTimestamp <
                                    questData.predictionStartTimestamp,
                                answered: false,
                            },
                        }}
                        key={questData.id}
                    >
                        <button
                            type="button"
                            className=" bg-footer-text w-full items-center rounded-lg text-base text-primary-white font-medium py-3"
                        >
                            {t("Predict Again")}
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default RenderAnsweredSection;
