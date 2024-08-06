import {
    fromWei,
    getUserSelectedOutcome,
    returnCurrencyName,
    trimmingQuest,
} from "@Components/Quests/questhelpers";
import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { AppState } from "@Redux";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
import UpArrow from "@Public/svgs/uparrow.svg";
import DownArrow from "@Public/svgs/arrow.svg";
import { updateCollectReward } from "@Reducers/trade";
import { PREDICT_TOKENS, Status } from "@Constants";
import { useToggleCollectQuestRewardModal } from "@Reducers/trade/hooks";
import {
    iff,
    MarketResult,
    MarketStateResult,
} from "@Components/Quests/constants";
import { renderQuestStatus } from "@Utils";
import QuestAccordian from "./quest-accordian";

const QuestMweb = ({ item, index, claimedId }) => {
    const { library } = useWeb3React();
    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );
    const dispatch = useDispatch();
    const toggleCollectQuestRewardModal = useToggleCollectQuestRewardModal();

    const totalUserReward = item.markets.reduce(function(sum, b) {
        return sum + Number(b.reward);
    }, 0);

    const totalWinBetAmt = item.markets.reduce(function(sum, b) {
        const finalOutcomeIndex = b.market.outcomeStrings.indexOf(
            b.market.finalOutcomeString
        );
        const amt =
            b.result === MarketResult.WIN &&
            getUserSelectedOutcome(b) === b.market.finalOutcomeString
                ? Number(b.outcomeAmount[finalOutcomeIndex])
                : 0;
        const val = sum + amt;

        return val;
    }, 0);
    const totalLossAmt = item.markets.reduce(function(sum, b) {
        return sum + Number(b.totalBet);
    }, 0);
    const marketClosedcount = item.markets.reduce(function(sum, b) {
        return sum + (b.market.state === MarketStateResult.CLOSED ? 1 : 0);
    }, 0);

    const isMarketClosed = item.markets.length === marketClosedcount;

    const betAmount = totalWinBetAmt > 0 ? totalWinBetAmt : totalLossAmt;

    const [isActive, setIsActive] = useState(false);

    const totalCount = item.markets.length;
    const wonCount = item.markets.filter(function(ele) {
        return ele.result === MarketResult.WIN;
    });

    const handleClaim = (rewardAmt: number, betAmt: number) => {
        const userBetAmt = betAmt ? betAmt / 1e18 : 0;

        dispatch(
            updateCollectReward({
                status: Status.EXPIRED,
                asset: predictableToken,
                roundId: item.quest.questId,
                rewardAmount: rewardAmt ? rewardAmt / 1e18 : 0,
                betAmount: isMarketClosed
                    ? fromWei(totalLossAmt, library)
                    : fromWei(item.betAmount, library),
                bgnAmount: isMarketClosed
                    ? fromWei(totalLossAmt, library)
                    : userBetAmt,
                questions:
                    totalCount > 1 ? `${wonCount.length} / ${totalCount}` : "1",
                collectEarnings: "QUESTPAGE",
                isRefund: isMarketClosed,
            })
        );
        toggleCollectQuestRewardModal();
    };

    const statusValue = renderQuestStatus(
        item.quest.predictionStartTimestamp,
        item.quest.opensAtTimestamp,
        item.quest.closesAtTimestamp
    );

    return (
        <div className="p-4 bg-gray-300 flex flex-col rounded-lg mb-4">
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
                            <div>{`#${index + 1}`}</div>
                            <small className="text-[10px] text-center leading-[18px] text-primary-200">
                                {`${new Date(
                                    item.betTimestamp * 1000
                                ).toLocaleDateString()} ${new Date(
                                    item.betTimestamp * 1000
                                ).toLocaleTimeString()}`}
                            </small>
                        </h1>
                        <h2 className="text-sm font-medium text-primary-200">
                            Round
                        </h2>
                    </div>
                    <div className="flex justify-between gap-y-4 w-full font-normal leading-[22px]  text-sm">
                        <div>
                            <h1 className="text-left text-primary-100 mb-1">
                                {item.quest.category}
                            </h1>
                            <h2 className="font-medium text-primary-200">
                                Market Type
                            </h2>
                        </div>

                        <div>{isActive ? <UpArrow /> : <DownArrow />}</div>
                    </div>
                    <div>
                        <h1
                            className="text-sm leading[-22px] text-primary-100 mb-1"
                            title={trimmingQuest(item.quest.title, 15)}
                        >
                            {trimmingQuest(item.quest.title, 15)}
                        </h1>
                        <h2 className="text-sm font-medium text-primary-200">
                            Topic
                        </h2>
                    </div>

                    <div>
                        <h1 className="text-sm leading-4 text-primary-100 mb-1">
                            {`${fromWei(
                                item.betAmount,
                                library
                            )} ${predictableToken}`}
                        </h1>
                        <h2 className="text-sm font-medium text-primary-200">
                            Amt Entered
                        </h2>
                    </div>
                    <div>
                        <h1 className="text-sm leading-[22px] font-normal text-primary-100 mb-1">
                            {isMarketClosed
                                ? "Market-Closed"
                                : statusValue.text}
                        </h1>
                        <h2 className="text-sm font-medium leading-[22px] text-primary-200">
                            Status
                        </h2>
                    </div>
                    <div>
                        <h1 className="text-sm leading-4 text-primary-100 pb-1.5">
                            {item.markets[0].market.state === "RESOLVED" ? (
                                <>
                                    <>
                                        <span
                                            className={`text text-md ${
                                                totalWinBetAmt > 0
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {`${
                                                betAmount
                                                    ? fromWei(
                                                          betAmount,
                                                          library
                                                      )
                                                    : ""
                                            } ${predictableToken}`}
                                        </span>
                                        {totalUserReward &&
                                        totalUserReward !== 0 ? (
                                            <span className="text-primary-100">
                                                &nbsp; &amp;
                                            </span>
                                        ) : null}
                                    </>

                                    {totalUserReward &&
                                    totalUserReward !== 0 ? (
                                        <p
                                            className={`text ${
                                                totalUserReward > 0
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {predictableToken ===
                                                PREDICT_TOKENS.BGN && (
                                                <>&amp;</>
                                            )}
                                            {` ${fromWei(
                                                totalUserReward,
                                                library
                                            )} ${returnCurrencyName(
                                                predictableToken
                                            )}`}
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                </>
                            ) : (
                                <span className="text-primary-100 leading-[22px] text-sm font-normal">
                                    {isMarketClosed ? (
                                        <span className="text-green-500">
                                            {`${
                                                betAmount
                                                    ? fromWei(
                                                          betAmount,
                                                          library
                                                      )
                                                    : ""
                                            } ${predictableToken}`}
                                        </span>
                                    ) : (
                                        "---"
                                    )}
                                </span>
                            )}
                        </h1>
                        <h2 className="text-sm font-medium text-primary-200">
                            Earnings
                        </h2>
                    </div>
                    <div className="col-span-2">
                        {!item.claimed &&
                        ((totalWinBetAmt > 0 &&
                            claimedId !== item.quest.questId) ||
                            isMarketClosed) ? (
                            <div className="flex items-center justify-left">
                                <button
                                    type="button"
                                    className="text-primary-white p-2 rounded-md bg-footer-text text-sm leading-[22px] font-medium"
                                    onClick={() =>
                                        handleClaim(
                                            totalUserReward,
                                            totalWinBetAmt
                                        )
                                    }
                                >
                                    {isMarketClosed
                                        ? "Collect Refund"
                                        : "Collect Earnings"}
                                </button>
                            </div>
                        ) : (
                            <>
                                {iff(
                                    item.claimed ||
                                        claimedId === item.quest.questId,
                                    <div className="text-primary-100  text-sm">
                                        Earnings Collected
                                    </div>,
                                    <div className="text-primary-100 ">
                                        <span className="text-primary-100 leading-[22px] text-sm font-normal">
                                            {isMarketClosed ? (
                                                <span className="text-green-500">
                                                    {`${
                                                        betAmount
                                                            ? fromWei(
                                                                  betAmount,
                                                                  library
                                                              )
                                                            : ""
                                                    } ${predictableToken}`}
                                                </span>
                                            ) : (
                                                "---"
                                            )}
                                        </span>
                                    </div>
                                )}
                                <h2 className="text-sm font-medium text-primary-200">
                                    Actions
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
                                    questHistory={item}
                                    status={statusValue.text}
                                />
                            </div>
                        </div>
                    )}
                </Transition>
            </div>
        </div>
    );
};

export default QuestMweb;
