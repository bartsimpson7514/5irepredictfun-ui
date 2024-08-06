import { useUserMarkets } from "@Hooks/useUserMarkets";
import ShareIcon from "@Public/svgs/share.svg";
import { AppState } from "@Redux";
import { shortenName } from "@Utils";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Countdown from "react-countdown";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { checkBlackListInprogressQuest } from "@Constants/blackListedQuest";
import { Quest, QuestState } from "./constants";
import { formatDate, fromWei } from "./questhelpers";
import { categoryRender, dispayTimer, renderer } from "./questUtils";

interface IOutComeForm {
    questData: Quest;
    reviewSection: Boolean;
}
const QuestMultiQuestionHeader: React.FC<IOutComeForm> = ({
    questData,
    reviewSection = false,
}) => {
    const { library } = useWeb3React();
    const { query } = useRouter();
    const { predictableToken, isQuestPredicted } = useSelector(
        (state: AppState) => state.prediction
    );
    const { t } = useTranslation();
    const { userMarketData, refetch } = useUserMarkets();
    const userData = userMarketData.filter(
        data => data.quest.id === questData?.id
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            refetch({});
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, [isQuestPredicted]);

    const commitAmt = userData.length ? userData[0]?.betAmount : 0;

    return (
        <>
            {questData && (
                <div
                    className={`flex relative bg-quest-info-header  items-center  group   rounded-t-lg  sm:px-6 w-full ${
                        reviewSection
                            ? "justify-start py-4 sm:py-6"
                            : "justify-center py-4"
                    }`}
                >
                    <div className="flex sm:flex-row flex-col justify-start px-4 sm:px-0 gap-4 sm:w-[916px]">
                        <div className="flex gap-3">
                            <img
                                src={
                                    questData.image.indexOf("://") === -1
                                        ? `http://${questData.image}`
                                        : questData.image
                                }
                                alt={" "}
                                className="items-center
                                w-[98px] h-[96px]
                                  rounded-lg"
                            />

                            <div className="flex flex-col sm:hidden gap-2 justify-start items-start">
                                <div className="flex gap-2 items-center">
                                    <div
                                        className="text-xs font-medium"
                                        style={{
                                            color: categoryRender(questData)
                                                .baseColor,
                                        }}
                                    >
                                        {questData.category}
                                    </div>
                                    <div className="h-[16px] w-[1.5px] bg-primary-200 opacity-50" />
                                    <div className="flex gap-3 items-center justify-center">
                                        <a
                                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                                `Explore this quest: ${questData.title}`
                                            )}%0A%0A${encodeURIComponent(
                                                `Place your prediction on @NexterDotFi:  ${window.location.href}/${questData.id}?marketid=${questData.id}`
                                            )}`}
                                            target="_blank"
                                            onClick={event =>
                                                event.stopPropagation()
                                            }
                                            className="text-primary-100 "
                                            rel="noreferrer"
                                        >
                                            <ShareIcon className="cursor-pointer stroke-primary-200 hover:stroke-primary-100" />
                                        </a>
                                    </div>
                                </div>
                                <div className="text-primary-100 text-sm whitespace-normal">
                                    {shortenName(questData.title, 100)}
                                </div>
                            </div>
                        </div>
                        <div className=" flex-col hidden w-full sm:flex justify-between">
                            <div className="flex flex-col gap-2 justify-start items-start sm:mb-3">
                                <div className="flex gap-2 items-center">
                                    <div
                                        className="text-xs font-medium"
                                        style={{
                                            color: categoryRender(questData)
                                                .baseColor,
                                        }}
                                    >
                                        {t(questData.category)}
                                    </div>
                                    <div className="h-[16px] w-[1.5px] bg-primary-200 opacity-50" />
                                    <div className="flex gap-3 items-center justify-center">
                                        <a
                                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                                `Explore this quest: ${questData.title}`
                                            )}%0A%0A${encodeURIComponent(
                                                `Place your prediction on @NexterDotFi:  ${window.location.href}/${questData.id}?marketid=${questData.id}`
                                            )}`}
                                            target="_blank"
                                            onClick={event =>
                                                event.stopPropagation()
                                            }
                                            className="text-primary-100 "
                                            rel="noreferrer"
                                        >
                                            <ShareIcon className="cursor-pointer stroke-primary-200 hover:stroke-primary-100" />
                                        </a>
                                    </div>
                                </div>
                                <div className="text-primary-100 text-base font-medium">
                                    {shortenName(questData.title, 100)}
                                </div>
                                {!reviewSection && (
                                    <div className="text-primary-200 text-sm">
                                        {shortenName(
                                            questData?.description,
                                            160
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="sm:flex flex-row sm:space-x-8 space-x-4 hidden items-center">
                                <div className="flex flex-col items-start justify-between">
                                    <div className="text-primary-100 font-medium text-sm">
                                        {questData.balance
                                            ? fromWei(
                                                  questData.balance,
                                                  library
                                              )
                                            : 0}
                                        &nbsp;
                                        {`${predictableToken}`}
                                    </div>

                                    <div className="text-primary-300 font-normal text-xs whitespace-nowrap">
                                        {t("Funding Pool")}
                                    </div>
                                </div>
                                <div className="h-6 w-[0.5px] bg-primary-200" />
                                <div>
                                    <span className="text-primary-100 font-medium text-sm">
                                        {`${
                                            commitAmt
                                                ? `${fromWei(
                                                      commitAmt,
                                                      library
                                                  )} ${predictableToken}`
                                                : "---"
                                        } `}
                                    </span>
                                    <br />
                                    <span className="text-primary-300 font-normal text-xs text-center">
                                        {t("Your Commit amt")}
                                    </span>
                                </div>
                                <div className="h-6 w-[0.5px] bg-primary-200" />
                                {checkBlackListInprogressQuest(
                                    predictableToken,
                                    Number(query.marketid)
                                ) ? null : (
                                    <div>
                                        <span className="text-primary-100 font-medium text-sm whitespace-nowrap">
                                            {dispayTimer(questData, query, t)
                                                ?.value > 0 && (
                                                <Countdown
                                                    key={
                                                        dispayTimer(
                                                            questData,
                                                            query,
                                                            t
                                                        )?.value
                                                    }
                                                    date={
                                                        dispayTimer(
                                                            questData,
                                                            query,
                                                            t
                                                        )?.value * 1000
                                                    }
                                                    renderer={renderer}
                                                />
                                            )}
                                        </span>

                                        <br />
                                        {dispayTimer(questData, query, t)
                                            ?.text === QuestState.EXPIRED ||
                                        dispayTimer(questData, query, t)
                                            ?.text ===
                                            QuestState.INRESOLUTION ? (
                                            <span
                                                className={`${
                                                    dispayTimer(
                                                        questData,
                                                        query,
                                                        t
                                                    )?.color
                                                }  -translate-y-5 absolute font-normal text-xs whitespace-nowrap`}
                                            >
                                                {
                                                    dispayTimer(
                                                        questData,
                                                        query,
                                                        t
                                                    )?.text
                                                }
                                            </span>
                                        ) : (
                                            <span className="text-primary-300 font-normal text-xs">
                                                {
                                                    dispayTimer(
                                                        questData,
                                                        query,
                                                        t
                                                    )?.text
                                                }
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-row items-center space-x-3 sm:hidden">
                            <div className="flex flex-col items-start justify-between">
                                <div className="text-primary-100 font-medium text-sm">
                                    {questData.balance
                                        ? fromWei(questData.balance, library)
                                        : 0}
                                    &nbsp;
                                    {`${predictableToken}`}
                                </div>

                                <div className="text-primary-300 font-normal text-xs whitespace-nowrap">
                                    {t("Funding Pool")}
                                </div>
                            </div>
                            <div className="h-6 w-[0.5px] bg-primary-200" />

                            <div className="flex items-center flex-col justify-center">
                                <div className="text-primary-100 font-medium text-sm">
                                    {`${
                                        commitAmt
                                            ? `${fromWei(
                                                  commitAmt,
                                                  library
                                              )} ${predictableToken}`
                                            : "---"
                                    } `}
                                </div>
                                <div className="text-primary-300 font-normal text-xs text-center">
                                    {t("Your Commit amt")}
                                </div>
                            </div>
                            <div className="h-6 w-[0.5px] bg-primary-200" />

                            <div>
                                <span className="text-primary-100 font-medium text-sm whitespace-nowrap">
                                    {dispayTimer(questData, query, t)?.value >
                                        0 &&
                                        formatDate(
                                            dispayTimer(questData, query, t)
                                                ?.value
                                        )}
                                </span>
                                <br />
                                {dispayTimer(questData, query, t)?.text ===
                                    QuestState.EXPIRED ||
                                dispayTimer(questData, query, t)?.text ===
                                    QuestState.INRESOLUTION ? (
                                    <span
                                        className={`${
                                            dispayTimer(questData, query, t)
                                                ?.color
                                        }  -translate-y-5 absolute font-normal text-xs whitespace-nowrap`}
                                    >
                                        {dispayTimer(questData, query, t)?.text}
                                    </span>
                                ) : (
                                    <span className="text-primary-300 font-normal text-xs">
                                        {dispayTimer(questData, query, t)?.text}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default QuestMultiQuestionHeader;
