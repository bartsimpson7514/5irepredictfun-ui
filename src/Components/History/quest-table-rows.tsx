import {
    fromWei,
    returnCurrencyName,
    trimmingQuest,
} from "@Components/Quests/questhelpers";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import UpArrow from "@Public/svgs/uparrow.svg";
import DownArrow from "@Public/svgs/arrow.svg";
import { PREDICT_TOKENS } from "@Constants";
import { iff } from "@Components/Quests/constants";
import { handleGaEvent } from "@Utils/googleanalytics";
import { useTranslation } from "react-i18next";
import QuestAccordian from "./quest-accordian";

export interface IQuestTableProps {
    item: any;
    index: any;
    claimedId: number;
    library?: any;
    predictableToken: string;
    isMarketClosed?: boolean;
    statusValue: any;
    totalWinBetAmt: number;
    betAmount: number;
    totalUserReward: number;
    handleClaim: (totalUserReward: number, totalBetAmount: number) => void;
}

const QuestTableRows: React.FC<IQuestTableProps> = ({ ...props }) => {
    const [isActive, setIsActive] = useState(false);
    const { t } = useTranslation();
    const renderWebRows = () => {
        return (
            <>
                <div
                    className="grid text-sm leading-[22px] text-primary-100 justify-between font-normal w-full bg-history-section px-4 py-3 mb-1 rounded-xl items-center"
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            " 11.66% 10.14% 17.14% 12.38% 9.47% 10.38% 16.8%",
                    }}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                        setIsActive(!isActive);
                    }}
                >
                    <div>
                        <p className="font-medium transition-all text-sm text-primary-100 leading-[22px]">
                            {`#${props.index + 1}`}
                        </p>
                        <small className="text-[10px] font-normal leading-[18px] text-primary-200">
                            {`${new Date(
                                props.item.betTimestamp * 1000
                            ).toLocaleDateString()} ${new Date(
                                props.item.betTimestamp * 1000
                            ).toLocaleTimeString()}`}
                        </small>
                    </div>
                    <div className="transition-all break-keep">
                        {props.item.quest.category}
                    </div>
                    <div
                        className="transition-all text-primary-100 font-normal "
                        title={props.item.quest.title}
                    >
                        {trimmingQuest(props.item.quest.title, 20)}
                    </div>
                    <div>
                        <span className="transition-all font-normal text-primary-100 leading-[22px]">
                            {`${fromWei(props.item.betAmount, props.library)} ${
                                props.predictableToken
                            }`}
                        </span>
                    </div>
                    <div className="transition-all">
                        <span className="font-medium text-md">
                            {props.isMarketClosed
                                ? t("Market-Closed")
                                : props.statusValue.text}
                        </span>
                    </div>
                    <div className="transition-all  text-sm leading-[22px] break-keep">
                        {props.item.markets[0].market.state === "RESOLVED" ? (
                            <>
                                {props.predictableToken ===
                                    PREDICT_TOKENS.MATIC ||
                                props.predictableToken ===
                                    PREDICT_TOKENS.BNB ? (
                                    <>
                                        <span
                                            className={`text text-md ${
                                                props.totalWinBetAmt > 0
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {`${fromWei(
                                                Number(props.betAmount) +
                                                    Number(
                                                        props.totalUserReward
                                                    ),
                                                props.library
                                            )} ${props.predictableToken}`}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span
                                            className={`text text-md ${
                                                props.totalWinBetAmt > 0
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {`${
                                                props.betAmount
                                                    ? fromWei(
                                                          props.betAmount,
                                                          props.library
                                                      )
                                                    : ""
                                            } ${props.predictableToken}`}
                                        </span>
                                        {props.totalUserReward &&
                                        props.totalUserReward !== 0 ? (
                                            <span className="text-primary-100">
                                                &nbsp; &amp;
                                            </span>
                                        ) : null}

                                        {props.totalUserReward &&
                                        props.totalUserReward !== 0 ? (
                                            <p
                                                className={`text ${
                                                    props.totalUserReward > 0
                                                        ? "text-green-500"
                                                        : "text-red-500"
                                                }`}
                                            >
                                                {` ${fromWei(
                                                    props.totalUserReward,
                                                    props.library
                                                )} ${returnCurrencyName(
                                                    props.predictableToken
                                                )}`}
                                            </p>
                                        ) : (
                                            ""
                                        )}
                                    </>
                                )}
                            </>
                        ) : (
                            <span className="text-primary-100 leading-[22px] text-sm font-normal">
                                {props.isMarketClosed ? (
                                    <span className="text-green-500">
                                        {`${
                                            props.betAmount
                                                ? fromWei(
                                                      props.betAmount,
                                                      props.library
                                                  )
                                                : ""
                                        } ${props.predictableToken}`}
                                    </span>
                                ) : (
                                    "---"
                                )}
                            </span>
                        )}
                    </div>
                    <div className="text-sm transition-all text-primary-100 flex items-center justify-between ">
                        <>
                            {!props.item.claimed &&
                            ((props.totalWinBetAmt > 0 &&
                                props.item.quest.resolved &&
                                props.claimedId !== props.item.quest.questId) ||
                                props.isMarketClosed) ? (
                                <div className="justify-center">
                                    <button
                                        type="button"
                                        className="text-primary-white py-[5px] px-3 whitespace-nowrap rounded-lg bg-footer-text text-sm leading-[22px] font-medium"
                                        onClick={() => {
                                            props.handleClaim(
                                                props.totalUserReward,
                                                props.totalWinBetAmt
                                            );
                                            handleGaEvent(
                                                "QUEST EARNINGS CLICKED"
                                            );
                                        }}
                                    >
                                        {props.isMarketClosed
                                            ? t("Collect Refund")
                                            : t("Collect Earnings")}
                                    </button>
                                </div>
                            ) : (
                                iff(
                                    props.item.claimed ||
                                        props.claimedId ===
                                            props.item.quest.questId,
                                    <div className="text-primary-100 ">
                                        {t("Earnings collected")}
                                    </div>,
                                    <div className="text-primary-100">---</div>
                                )
                            )}
                        </>
                        <div>{isActive ? <UpArrow /> : <DownArrow />}</div>
                    </div>
                </div>
                <div>
                    <Transition
                        show={isActive}
                        enter="duration-500 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-300 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                        style={{ width: "100%" }}
                        className="w-full -translate-y-2"
                    >
                        {isActive && (
                            <div className="flex transition-all w-full items-center justify-center bg-history-section rounded-b-xl">
                                <div
                                    className="accordion-content mb-6 w-full px-[2px]  dark:text-primary-100 text-sm text-primary-100 flex sm:flex-row flex-col gap-4 justify-between"
                                    style={{
                                        lineHeight: "25.2px",
                                    }}
                                >
                                    <QuestAccordian
                                        questHistory={props.item}
                                        status={props.statusValue.text}
                                    />
                                </div>
                            </div>
                        )}
                    </Transition>
                </div>
            </>
        );
    };

    const rendermWebRows = () => {
        return (
            <div className="sm:hidden block p-4 bg-history-section flex flex-col rounded-lg mb-4">
                <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                        setIsActive(!isActive);
                    }}
                >
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        <div className="flex flex-col  items-start justify-start">
                            <h1 className="text-sm leading-[22px] text-primary-100">
                                <div>{`#${props.index + 1}`}</div>
                                <small className="text-[10px] text-center leading-[18px] text-primary-200">
                                    {`${new Date(
                                        props.item.betTimestamp * 1000
                                    ).toLocaleDateString()} ${new Date(
                                        props.item.betTimestamp * 1000
                                    ).toLocaleTimeString()}`}
                                </small>
                            </h1>
                            <h2 className="text-sm font-medium text-primary-200">
                                {t("Round")}
                            </h2>
                        </div>
                        <div className="flex justify-between gap-y-4 w-full font-normal leading-[22px]  text-sm">
                            <div>
                                <h1 className="text-left text-primary-100 mb-1">
                                    {props.item.quest.category}
                                </h1>
                                <h2 className="font-medium text-primary-200">
                                    {t("Market Type")}
                                </h2>
                            </div>

                            <div>{isActive ? <UpArrow /> : <DownArrow />}</div>
                        </div>
                        <div>
                            <h1
                                className="text-sm leading[-22px] text-primary-100 mb-1"
                                title={trimmingQuest(
                                    props.item.quest.title,
                                    15
                                )}
                            >
                                {trimmingQuest(props.item.quest.title, 15)}
                            </h1>
                            <h2 className="text-sm font-medium text-primary-200">
                                {t("Topic")}
                            </h2>
                        </div>

                        <div>
                            <h1 className="text-sm leading-4 text-primary-100 mb-1">
                                {`${fromWei(
                                    props.item.betAmount,
                                    props.library
                                )} ${props.predictableToken}`}
                            </h1>
                            <h2 className="text-sm font-medium text-primary-200">
                                {t("Amt Entered")}
                            </h2>
                        </div>
                        <div>
                            <h1 className="text-sm leading-[22px] font-normal text-primary-100 mb-1">
                                {props.isMarketClosed
                                    ? "Market-Closed"
                                    : props.statusValue.text}
                            </h1>
                            <h2 className="text-sm font-medium leading-[22px] text-primary-200">
                                {t("Status")}
                            </h2>
                        </div>
                        <div>
                            <h1 className="text-sm leading-4 text-primary-100 pb-1.5">
                                {props.item.markets[0].market.state ===
                                "RESOLVED" ? (
                                    <>
                                        <>
                                            <span
                                                className={`text text-md ${
                                                    props.totalWinBetAmt > 0
                                                        ? "text-green-500"
                                                        : "text-red-500"
                                                }`}
                                            >
                                                {`${
                                                    props.betAmount
                                                        ? fromWei(
                                                              props.betAmount,
                                                              props.library
                                                          )
                                                        : ""
                                                } ${props.predictableToken}`}
                                            </span>
                                            {props.totalUserReward &&
                                            props.totalUserReward !== 0 ? (
                                                <span className="text-primary-100">
                                                    &nbsp; &amp;
                                                </span>
                                            ) : null}
                                        </>

                                        {props.totalUserReward &&
                                        props.totalUserReward !== 0 ? (
                                            <p
                                                className={`text ${
                                                    props.totalUserReward > 0
                                                        ? "text-green-500"
                                                        : "text-red-500"
                                                }`}
                                            >
                                                {props.predictableToken ===
                                                    PREDICT_TOKENS.BGN && (
                                                    <>&amp;</>
                                                )}
                                                {` ${fromWei(
                                                    props.totalUserReward,
                                                    props.library
                                                )} ${returnCurrencyName(
                                                    props.predictableToken
                                                )}`}
                                            </p>
                                        ) : (
                                            ""
                                        )}
                                    </>
                                ) : (
                                    <span className="text-primary-100 leading-[22px] text-sm font-normal">
                                        {props.isMarketClosed ? (
                                            <span className="text-green-500">
                                                {`${
                                                    props.betAmount
                                                        ? fromWei(
                                                              props.betAmount,
                                                              props.library
                                                          )
                                                        : ""
                                                } ${props.predictableToken}`}
                                            </span>
                                        ) : (
                                            "---"
                                        )}
                                    </span>
                                )}
                            </h1>
                            <h2 className="text-sm font-medium text-primary-200">
                                {t("Earnings")}
                            </h2>
                        </div>
                        <div className="col-span-2">
                            {!props.item.claimed &&
                            ((props.totalWinBetAmt > 0 &&
                                props.claimedId !== props.item.quest.questId) ||
                                props.isMarketClosed) ? (
                                <div className="flex items-center justify-left">
                                    <button
                                        type="button"
                                        className="text-primary-white p-2 rounded-md bg-footer-text text-sm leading-[22px] font-medium"
                                        onClick={() =>
                                            props.handleClaim(
                                                props.totalUserReward,
                                                props.totalWinBetAmt
                                            )
                                        }
                                    >
                                        {props.isMarketClosed
                                            ? t("Collect Refund")
                                            : t("Collect Earnings")}
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {iff(
                                        props.item.claimed ||
                                            props.claimedId ===
                                                props.item.quest.questId,
                                        <div className="text-primary-100  text-sm">
                                            {t("Earnings Collected")}
                                        </div>,
                                        <div className="text-primary-100 ">
                                            <span className="text-primary-100 leading-[22px] text-sm font-normal">
                                                {props.isMarketClosed ? (
                                                    <span className="text-green-500">
                                                        {`${
                                                            props.betAmount
                                                                ? fromWei(
                                                                      props.betAmount,
                                                                      props.library
                                                                  )
                                                                : ""
                                                        } ${
                                                            props.predictableToken
                                                        }`}
                                                    </span>
                                                ) : (
                                                    "---"
                                                )}
                                            </span>
                                        </div>
                                    )}
                                    <h2 className="text-sm font-medium text-primary-200">
                                        {t("Actions")}
                                    </h2>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <Transition
                        show={isActive}
                        enter="duration-500 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-300 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                        style={{ width: "100%" }}
                        className="w-full mt-4"
                    >
                        {isActive && (
                            <div className="flex transition-all w-full items-center justify-center bg-history-section rounded-b-xl">
                                <div
                                    className="accordion-content w-full   dark:text-primary-100 text-sm text-primary-100 flex sm:flex-row flex-col gap-4 justify-between"
                                    style={{
                                        lineHeight: "25.2px",
                                    }}
                                >
                                    <QuestAccordian
                                        questHistory={props.item}
                                        status={props.statusValue.text}
                                    />
                                </div>
                            </div>
                        )}
                    </Transition>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="sm:block hidden">{renderWebRows()}</div>
            <div className="sm:hidden block">{rendermWebRows()}</div>
        </>
    );
};

export default QuestTableRows;
