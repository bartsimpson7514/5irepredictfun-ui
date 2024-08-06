/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
import {
    useBGDepositModalToggle,
    useModalOpen,
    useToggleQuestGraphModal,
    useWalletModalToggle,
} from "@Reducers/trade/hooks";
import { AppState } from "@Redux";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { useGetMarketOutcome } from "@Hooks/useGetMarketOucome";
import { toDecimals } from "@Utils";
import QuestChartIcon from "@Public/svgs/quest-chart-icon.svg";
import { ApplicationModal } from "@Reducers/trade";
import { QuestGraphModal } from "@Components/QuestGraphModal";
import { useUserMarkets } from "@Hooks/useUserMarkets";
import InfoIconLight from "public/animations/InfoIconLight.json";
import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";
import { MARKET, Quest } from "./constants";
import QuestMultiQuestionHeader from "./quest-multiquestion-header";
import { formatQuestion, fromWei } from "./questhelpers";
import { categoryRender } from "./questUtils";

interface IQuestMultiQuestion {
    questData: Quest;
    onReviewQuest: (review: boolean) => void;
    onSelectedOutComeids: (outcomeid: number[]) => void;
}

const QuestMutliQuestionSection: React.FC<IQuestMultiQuestion> = ({
    questData,
    onReviewQuest,
    onSelectedOutComeids,
}) => {
    const { library } = useWeb3React();
    const {
        predictableToken,
        bgnBalance,
        bglBalance,
        nativeBalance,
    } = useSelector((state: AppState) => state.prediction);

    const [markets, setMarkets] = useState<MARKET[]>();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [outcomeRatio, setOutcomeRatio] = useState({});
    const [currentAnswerSelected, setCurrentAnswerSelected] = useState([]);
    const [selectedOutcomeId, setSelectedOutcomeId] = useState([]);
    const [isGraphOpen, setGraphOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const { t } = useTranslation();
    const toggleQuestGraphModal = useToggleQuestGraphModal();
    const openGraphModal = useModalOpen(ApplicationModal.QUEST_GRAPH);

    const marketIds = questData?.markets.map(market => Number(market.id));
    const { questOutcome } = useGetMarketOutcome(marketIds.toString());
    const { userMarketData } = useUserMarkets();
    const userData = userMarketData.filter(
        data => Number(data.quest.id) === Number(questData.id)
    );
    useEffect(() => {
        const dict = {};
        questOutcome.map(val => {
            if (dict[val.marketId]) {
                if (
                    Number(dict[val.marketId].timestamp) < Number(val.timestamp)
                )
                    dict[val.marketId] = val;
            } else dict[val.marketId] = val;
            // eslint-disable-next-line no-useless-return
            return;
        });
        setOutcomeRatio(dict);
    }, [questOutcome]);

    useEffect(() => {
        if (questData) {
            setMarkets(questData.markets);
        }
    }, [questData]);

    const renderQuestionSection = (question, questionNum) => {
        return (
            <div>
                {questData && (
                    <div className="flex flex-col gap-6">
                        <div className="text-primary-100 text-sm font-medium">
                            {`${questionNum + 1}. ${formatQuestion(
                                question.question
                            )}`}
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            {React.Children.toArray(
                                question.outcomeStrings.map(
                                    (outcome, index) => {
                                        const sumTotal = questData.markets[
                                            questionNum
                                        ].outcomeBetted.reduce(
                                            (a, b) => Number(a) + Number(b)
                                        );

                                        const assumedDeposit = 1000000000000000000;

                                        const potentailEarning = toDecimals(
                                            (sumTotal + assumedDeposit) /
                                                (Number(
                                                    questData.markets[
                                                        questionNum
                                                    ].outcomeBetted[index]
                                                ) +
                                                    assumedDeposit),
                                            2
                                        );
                                        return (
                                            <div className="flex flex-col gap-2">
                                                <div className="">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const currentAns = outcome;
                                                            setCurrentAnswerSelected(
                                                                prevAns => {
                                                                    if (
                                                                        prevAns[
                                                                            currentQuestion
                                                                        ]
                                                                    ) {
                                                                        const updateVal = prevAns.map(
                                                                            (
                                                                                value,
                                                                                idx
                                                                            ) => {
                                                                                if (
                                                                                    idx ===
                                                                                    currentQuestion
                                                                                )
                                                                                    return currentAns;
                                                                                return value;
                                                                            }
                                                                        );

                                                                        return updateVal;
                                                                    }
                                                                    return [
                                                                        ...prevAns,
                                                                        currentAns,
                                                                    ];
                                                                }
                                                            );

                                                            setSelectedOutcomeId(
                                                                prevAns => {
                                                                    if (
                                                                        Number.isInteger(
                                                                            prevAns[
                                                                                currentQuestion
                                                                            ]
                                                                        )
                                                                    ) {
                                                                        const updateVal = prevAns.map(
                                                                            (
                                                                                value,
                                                                                idx
                                                                            ) => {
                                                                                if (
                                                                                    idx ===
                                                                                    currentQuestion
                                                                                )
                                                                                    return index;
                                                                                return value;
                                                                            }
                                                                        );

                                                                        return updateVal;
                                                                    }
                                                                    return [
                                                                        ...prevAns,
                                                                        index,
                                                                    ];
                                                                }
                                                            );
                                                        }}
                                                        className={`w-full group p-4 relative border-[1.5px] ${
                                                            currentAnswerSelected[
                                                                questionNum
                                                            ] === outcome
                                                                ? "border-primary-white"
                                                                : "border-primary-200"
                                                        } z-50 outline-none focus:outline-none  text-sm font-medium rounded-lg shadow-sm  flex flex-row justify-between items-center gap-x-2`}
                                                        style={{
                                                            borderColor:
                                                                currentAnswerSelected[
                                                                    questionNum
                                                                ] === outcome
                                                                    ? categoryRender(
                                                                          questData
                                                                      )
                                                                          .baseColor
                                                                    : "#696C80",
                                                        }}
                                                    >
                                                        <div
                                                            className={`h-full absolute left-0  
                                                        border-primary-blue  opacity-50 ${
                                                            Number(
                                                                questData
                                                                    .markets[
                                                                    questionNum
                                                                ]
                                                                    .userOutcomePercentage[
                                                                    index
                                                                ]
                                                            ) === 100
                                                                ? " rounded-l-lg rounded-r-md"
                                                                : " rounded-l-lg"
                                                        }
                                                
                                                 `}
                                                            style={{
                                                                width: `${questData.markets[questionNum].userOutcomePercentage[index]}%`,
                                                                background: categoryRender(
                                                                    questData
                                                                ).gradient,
                                                            }}
                                                        />

                                                        <div className="flex flex-row justify-between items-center z-10">
                                                            <div
                                                                className={`flex items-center justify-center border-2 0 rounded-full w-4 h-4 ${
                                                                    currentAnswerSelected[
                                                                        questionNum
                                                                    ] ===
                                                                    outcome
                                                                        ? "border-asset-text"
                                                                        : "border-primary-200"
                                                                } `}
                                                            >
                                                                <div
                                                                    className={`  rounded-full w-2 h-2 ${
                                                                        currentAnswerSelected[
                                                                            questionNum
                                                                        ] ===
                                                                        outcome
                                                                            ? "bg-asset-text"
                                                                            : "  "
                                                                    } `}
                                                                />
                                                            </div>
                                                            <span
                                                                className={`${
                                                                    currentAnswerSelected[
                                                                        questionNum
                                                                    ] ===
                                                                    outcome
                                                                        ? "text-asset-text"
                                                                        : "text-primary-100"
                                                                } text-sm font-medium ml-3`}
                                                            >
                                                                {outcome}
                                                            </span>
                                                        </div>

                                                        <span className="text-primary-100 text-sm font-medium text-opacity-60">
                                                            {toDecimals(
                                                                questData
                                                                    .markets[
                                                                    questionNum
                                                                ]
                                                                    .userOutcomePercentage[
                                                                    index
                                                                ],
                                                                2
                                                            )}
                                                            %
                                                        </span>
                                                    </button>
                                                </div>

                                                {currentAnswerSelected[
                                                    questionNum
                                                ] === outcome && (
                                                    <div className="flex gap-1 w-full items-center justify-end text-sm text-sidebar-icon">
                                                        <div className="flex items-center gap-1">
                                                            <span className="whitespace-nowrap">
                                                                {`${t(
                                                                    "Potential earning"
                                                                )} `}
                                                            </span>
                                                            <span className="text-potential-text font-semibold whitespace-nowrap">
                                                                {`${potentailEarning} x `}
                                                            </span>
                                                        </div>
                                                        {userData.length >
                                                            0 && (
                                                            <>
                                                                <span className=" text-primary-white font-semibold">
                                                                    {` | `}
                                                                </span>
                                                                <div className=" whitespace-nowrap">
                                                                    <span>
                                                                        {`${t(
                                                                            "Prev Commit"
                                                                        )} `}
                                                                    </span>
                                                                    <span className="text-primary-white font-semibold">
                                                                        {` ${
                                                                            userData.length >
                                                                            0
                                                                                ? fromWei(
                                                                                      userData[0]
                                                                                          .markets[
                                                                                          questionNum
                                                                                      ]
                                                                                          .outcomeAmount[
                                                                                          index
                                                                                      ],
                                                                                      library
                                                                                  )
                                                                                : "---"
                                                                        } ${predictableToken}`}
                                                                    </span>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }
                                )
                            )}
                        </div>
                    </div>
                )}
                {userData.length > 0 && (
                    <div className="text-primary-200 text-xs font-medium mt-3 flex gap-1 items-center justify-start">
                        {t("Want to see your previously selected choice")}
                        <div className="relative">
                            <Lottie
                                animationData={InfoIconLight}
                                autoPlay
                                loop
                                onMouseEnter={() => setShowMore(true)}
                                onMouseLeave={() => setShowMore(false)}
                                style={{
                                    width: "12px",
                                    marginLeft: "3px",
                                }}
                            />
                            {showMore && (
                                <div className="sm:-left-[15px] top-[22px] sm:right-auto -right-[15px] absolute">
                                    <div className="mx-auto container p-2  bg-gray-400 rounded relative">
                                        <p className=" text-xs leading-none text-gray-600 pt-2 pb-2 max-w-[600px]">
                                            <div className="flex gap-2 flex-wrap">
                                                {React.Children.toArray(
                                                    userData &&
                                                        userData[0].markets[
                                                            questionNum
                                                        ].outcomeTimes.map(
                                                            (val, index) => (
                                                                <>
                                                                    {val >
                                                                        0 && (
                                                                        <div className="gap-2 flex items-center justify-between bg-[#393944] bg-opacity-50 rounded-[63px] px-3 py-1">
                                                                            <div className="text-primary-100 text-sm font-medium whitespace-nowrap break-words">
                                                                                {
                                                                                    question
                                                                                        .outcomeStrings[
                                                                                        index
                                                                                    ]
                                                                                }
                                                                            </div>
                                                                            <div className="text-primary-200 text-xs">
                                                                                {`x${val}`}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </>
                                                            )
                                                        )
                                                )}
                                            </div>
                                        </p>
                                        <svg
                                            className="absolute fill-tooltip-bg z-10 rotate-180 sm:right-auto sm:left-[14px] right-[14px] top-[-10px] "
                                            width={16}
                                            height={10}
                                            viewBox="0 0 16 10"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M8 10L0 0L16 1.41326e-06L8 10Z" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex mt-8 gap-8 justify-between items-center">
                    {currentQuestion !== 0 && (
                        <button
                            type="button"
                            onClick={() => {
                                if (currentQuestion !== 0) {
                                    setCurrentQuestion(
                                        currentQues => currentQues - 1
                                    );
                                }
                                onSelectedOutComeids(selectedOutcomeId);
                            }}
                            disabled={currentQuestion === 0}
                            className={`
                            bg-gray-200 text-primary-blue hover:text-primary-white hover:bg-footer-text inline-flex w-full items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm 
                                 `}
                        >
                            {t("Back")}
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => {
                            onSelectedOutComeids(selectedOutcomeId);
                            if (
                                currentQuestion !==
                                questData?.markets.length - 1
                            ) {
                                setCurrentQuestion(
                                    currentQues => currentQues + 1
                                );
                            } else {
                                onReviewQuest(true);
                            }
                        }}
                        disabled={!currentAnswerSelected[currentQuestion]}
                        className={`
                         ${
                             currentAnswerSelected[currentQuestion]
                                 ? "bg-footer-text "
                                 : "bg-footer-text bg-opacity-20"
                         } inline-flex w-full items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-white
                         `}
                    >
                        {t("Next")}
                    </button>
                </div>
            </div>
        );
    };

    const renderSelectOptionSection = () => {
        return (
            <div className="sm:flex sm:items-center sm:justify-center">
                <div className="text-primary-100  rounded-t sm:p-8 px-4 py-6 sm:w-[489px] w-full">
                    <div className="flex justify-between">
                        {/* <h3 className="text-sm font-medium">
                                                Market:
                                                {`${currentQuestion +
                                                    1}/${markets &&
                                                    markets.length}`}
                                            </h3> */}
                        <div
                            className="flex gap-1 text-primary-200 items-center cursor-pointer text-sm font-medium"
                            role="button"
                            tabIndex={0}
                            onClick={() => {
                                setGraphOpen(true);
                                toggleQuestGraphModal();
                            }}
                        >
                            <span>
                                <QuestChartIcon />
                            </span>
                            {t("Graph")}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-4 sm:mt-6">
                        <div className="flex flex-col gap-y-8">
                            {markets && (
                                <>
                                    <div className="flex flex-row w-full gap-x-8">
                                        {React.Children.toArray(
                                            markets.map((market, index) => (
                                                <div className="w-full">
                                                    <button
                                                        type="button"
                                                        className="w-full"
                                                        onClick={() => {
                                                            if (
                                                                currentAnswerSelected[
                                                                    index
                                                                ] ||
                                                                index ===
                                                                    currentAnswerSelected.length
                                                            )
                                                                setCurrentQuestion(
                                                                    index
                                                                );
                                                        }}
                                                    >
                                                        <div
                                                            className={`flex flex-col gap-1 items-start 
                                                                                
                                                                                `}
                                                        >
                                                            <div
                                                                className={`text-sm font-medium ${
                                                                    currentAnswerSelected[
                                                                        index
                                                                    ] ||
                                                                    index ===
                                                                        currentAnswerSelected.length
                                                                        ? index ===
                                                                          currentQuestion
                                                                            ? "text-asset-text"
                                                                            : "text-asset-text opacity-70"
                                                                        : "text-primary-200 opacity-30"
                                                                }`}
                                                            >
                                                                {`0${index +
                                                                    1}`}
                                                            </div>
                                                            <div
                                                                className={`w-full h-[6px]  rounded ${
                                                                    currentAnswerSelected[
                                                                        index
                                                                    ] ||
                                                                    index ===
                                                                        currentAnswerSelected.length
                                                                        ? index ===
                                                                          currentQuestion
                                                                            ? "bg-asset-text"
                                                                            : "bg-asset-text bg-opacity-70"
                                                                        : "bg-primary-200 bg-opacity-30"
                                                                }`}
                                                            />
                                                        </div>
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    {renderQuestionSection(
                                        markets[currentQuestion],
                                        currentQuestion
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    useEffect(() => {
        if (isGraphOpen) {
            document
                .querySelector(".main-content")
                ?.classList.add("overflow-hidden");
        } else {
            document
                .querySelector(".main-content")
                ?.classList.remove("overflow-hidden");
        }
    }, [isGraphOpen]);

    return (
        <div>
            {questData && (
                <>
                    <div className="flex flex-col">
                        <QuestMultiQuestionHeader
                            questData={questData}
                            reviewSection={false}
                        />
                        {renderSelectOptionSection()}
                    </div>
                    {markets && (
                        <QuestGraphModal
                            open={openGraphModal}
                            onClose={() => {
                                setGraphOpen(false);
                                toggleQuestGraphModal();
                            }}
                            questData={questData}
                            questionIndex={currentQuestion}
                            currentQuestion={Number(
                                markets[currentQuestion].marketId
                            )}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default QuestMutliQuestionSection;
