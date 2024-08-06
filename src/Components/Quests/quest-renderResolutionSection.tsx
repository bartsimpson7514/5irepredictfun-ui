import { AppState } from "@Redux";
import { rewardsText } from "@Utils/common";
import { useWeb3React } from "@web3-react/core";
import Lottie from "lottie-react";
import React from "react";
import Countdown from "react-countdown";
import { useSelector } from "react-redux";
import InfoIconLight from "public/animations/InfoIconLight.json";
import InfoIconDark from "public/animations/InfoIconDark.json";
import ReactTooltip from "react-tooltip";
import { useTranslation } from "react-i18next";
import resolveConfig from "tailwindcss/resolveConfig";
import { INTEGRATIONS } from "@Constants";
import { QuestState } from "./constants";
import { formatQuestion, fromWei } from "./questhelpers";
import { renderer, tagRender } from "./questUtils";
import TooltipAnswer from "./tooltipAnswers";
import tailwindConfig from "../../../tailwind.config";

const RenderUIResolutionSection = ({
    tag,
    questData,
    data,
    isAnswered,
    userData,
    outcomeRatio,
    ended,
}) => {
    const { library } = useWeb3React();
    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );
    const { t } = useTranslation();
    const currentTimestamp: number = Math.floor(Date.now() / 1000);
    const singleDayTimeStamp = 86400;
    const fullConfig = resolveConfig(tailwindConfig);

    const ToolTipRender = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
            case INTEGRATIONS.QUICKSWAP:
            case INTEGRATIONS.ONYX:
            case INTEGRATIONS.ZEBEC:
                return (
                    <Lottie
                        animationData={InfoIconLight}
                        autoPlay
                        loop
                        style={{
                            width: "12px",
                        }}
                    />
                );
            case INTEGRATIONS.ZEROSWAP:
                return (
                    <Lottie
                        animationData={InfoIconDark}
                        autoPlay
                        loop
                        style={{
                            width: "12px",
                        }}
                    />
                );

            default:
                return (
                    <Lottie
                        animationData={InfoIconLight}
                        autoPlay
                        loop
                        style={{
                            width: "12px",
                        }}
                    />
                );
        }
    };

    return (
        <div className="rounded-t-lg sm:p-6 px-4 py-6 bg-card-background relative">
            {tag && tagRender(tag, t)}
            <div className="absolute top-0 right-0 sm:pt-4 sm:pr-6 pt-2 pr-4  text-primary-warning text-xs font-medium">
                {ended ? (
                    <>
                        <span className="text-xs font-normal text-primary-100">
                            {QuestState.ENDED}
                            &nbsp;
                        </span>
                        <Countdown
                            key={questData?.closesAtTimestamp}
                            date={questData?.closesAtTimestamp * 1000}
                            renderer={renderer}
                        />
                    </>
                ) : (
                    <div className="flex gap-1 items-center">
                        <span>
                            {QuestState.INRESOLUTION}
                            &nbsp;
                        </span>
                        {currentTimestamp >
                        Number(questData?.closesAtTimestamp) +
                            Number(singleDayTimeStamp) ? (
                            <div>
                                <div
                                    data-tip={t(
                                        "The team is working to resolve the Quest"
                                    )}
                                    data-for="toolTipClosedPrice"
                                    data-place="bottom"
                                >
                                    {ToolTipRender()}
                                </div>
                                <div>
                                    <ReactTooltip
                                        id="toolTipClosedPrice"
                                        effect="solid"
                                        class="text-center w-36 text-sm justify-center absolute z-100"
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
                            </div>
                        ) : (
                            <div className="text-primary-300">
                                <Countdown
                                    key={questData?.closesAtTimestamp}
                                    date={
                                        (Number(questData?.closesAtTimestamp) +
                                            Number(singleDayTimeStamp)) *
                                        1000
                                    }
                                    renderer={renderer}
                                />
                            </div>
                        )}
                    </div>
                )}
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
                                        {isAnswered && (
                                            <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-6 gap-3 justify-between mt-3">
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
                {!ended && (
                    <p className="text-primary-200 text-sm">
                        <span className=" text-primary-warning font-medium">
                            {`${t("Note_One")} `}
                        </span>
                        {t("Please visit")}
                        &nbsp;
                        <a
                            href="https://realityeth.github.io/"
                            className="underline font-medium text-primary-white"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t("reality")}
                        </a>
                        &nbsp;
                        {t("to resolve the question by providing a bond")}
                    </p>
                )}
            </div>
        </div>
    );
};

export default RenderUIResolutionSection;
