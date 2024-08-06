import {
    fromWei,
    getUserSelectedOutcome,
} from "@Components/Quests/questhelpers";
import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { AppState } from "@Redux";
import { useDispatch, useSelector } from "react-redux";
import {
    useToggleCollectQuestRewardModal,
    useModalOpen,
} from "@Reducers/trade/hooks";
import CollectQuestRewardModal from "@Components/Quests/collectReward";
import { ApplicationModal, updateCollectReward } from "@Reducers/trade";
import { Status } from "@Constants";
import {
    MarketResult,
    MarketStateResult,
    QuestSort,
} from "@Components/Quests/constants";
import { returnHistoryMarketState } from "@Utils";
import HeaderSelect from "@Basic/headerSelect";
import { useTranslation } from "react-i18next";
import QuestTableRows from "./quest-table-rows";
import HistoryNotFound from "./empty-history";

const QuestMwebCols = ({ sortBy, MarketTypeCategory }) => {
    const { t } = useTranslation();
    return (
        <div className="flex text-sm gap-x-2 mb-2">
            <HeaderSelect
                label="Market Type"
                options={MarketTypeCategory}
                margin={false}
                onChange={(val: string) => {
                    sortBy(`${val}~${QuestSort.MARKETTYPE}`);
                }}
                variant="text-[12px]  text-primary-200 font-normal sm:block hidden"
            />
            <HeaderSelect
                label="Amount Entered"
                options={{
                    all: t("ALL"),
                    High: t("High"),
                    Low: t("Low"),
                }}
                margin={false}
                onChange={(val: string) => {
                    sortBy(`${val}~${QuestSort.AMOUNT}`);
                }}
                variant="text-xs  text-primary-200 font-normal sm:block hidden"
            />
            <HeaderSelect
                label="Actions"
                options={{
                    all: t("ALL"),
                    Collected: t("Collected"),
                    UnCollected: t("UnCollected"),
                }}
                margin={false}
                onChange={(val: string) => {
                    sortBy(`${val}~${QuestSort.ACTIONS}`);
                }}
                variant="text-xs  text-primary-200 font-normal sm:block hidden"
            />
        </div>
    );
};

const QuestWebColumns = ({ sortBy, MarketTypeCategory }) => {
    const { t } = useTranslation();
    return (
        <div
            className="grid leading-[22px] text-primary-200 justify-between font-medium  text-sm  px-4 py-3 gap-y-1  w-full z-50 rounded-xl items-center"
            style={{
                display: "grid",
                gridTemplateColumns:
                    "11.66% 10.14% 17.14% 12.38% 9.47% 10.38% 16.8%",
            }}
        >
            <div>{t("Round")}</div>
            <div>
                <HeaderSelect
                    label="Market Type"
                    options={MarketTypeCategory}
                    margin={false}
                    onChange={(val: string) => {
                        sortBy(`${val}~${QuestSort.MARKETTYPE}`);
                    }}
                    variant="text-xs  text-primary-200 font-normal"
                />
            </div>
            <div>{t("Topic")}</div>
            <div>
                <HeaderSelect
                    label="Amount Entered"
                    options={{
                        all: t("ALL"),
                        High: t("High"),
                        Low: t("Low"),
                    }}
                    margin={false}
                    onChange={(val: string) => {
                        sortBy(`${val}~${QuestSort.AMOUNT}`);
                    }}
                    variant="text-xs  text-primary-200 font-normal"
                />
            </div>
            <div>
                <HeaderSelect
                    label="Status"
                    options={{
                        all: t("ALL"),
                        Live: t("Live"),
                        "In Progress": t("In Progress"),
                        "In-Resolution": t("In_Resolution"),
                        Expired: t("Expired"),
                    }}
                    margin={false}
                    onChange={(val: string) => {
                        sortBy(`${val}~${QuestSort.STATUS}`);
                    }}
                    variant="text-[12px]  text-primary-200 font-normal"
                />
            </div>
            <div>
                <span>{t("Earnings")}</span>
            </div>
            <div>
                <HeaderSelect
                    label="Actions"
                    options={{
                        all: t("ALL"),
                        Collected: t("Collected"),
                        UnCollected: t("UnCollected"),
                    }}
                    margin={false}
                    onChange={(val: string) => {
                        sortBy(`${val}~${QuestSort.ACTIONS}`);
                    }}
                    variant="text-xs  text-primary-200 font-normal"
                />
            </div>
        </div>
    );
};

const QuestTable = ({ questHistory, sortBy }) => {
    const open = useModalOpen(ApplicationModal.COLLECT_QUEST_REWARD);
    const toggleCollectQuestRewardModal = useToggleCollectQuestRewardModal();
    const [claimedQuestId, setClaimedQuestId] = useState(0);
    const closeCollectCard = id => {
        toggleCollectQuestRewardModal();
        setClaimedQuestId(id);
    };
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const MarketTypeCategory = {
        All: t("All Markets"),
        Crypto: t("Crypto"),
        Sports: t("Sports"),
        Politics: t("Politics"),
        IPL: t("IPL"),
    };
    return (
        <>
            {questHistory && questHistory?.length <= 0 ? (
                <HistoryNotFound />
            ) : (
                <>
                    <div className="w-full pt-4 border-seperate border-spacing-10 border-t border-history-divider">
                        <div>
                            <div className="hidden sm:block">
                                <QuestWebColumns
                                    sortBy={sortBy}
                                    MarketTypeCategory={MarketTypeCategory}
                                />
                            </div>
                            <div className="block sm:hidden">
                                <QuestMwebCols
                                    sortBy={sortBy}
                                    MarketTypeCategory={MarketTypeCategory}
                                />
                            </div>
                            {questHistory &&
                                questHistory.map((item, index) => {
                                    const { library } = useWeb3React();
                                    const { predictableToken } = useSelector(
                                        (state: AppState) => state.prediction
                                    );

                                    const totalUserReward = item.markets.reduce(
                                        function(sum, b) {
                                            return sum + Number(b.reward);
                                        },
                                        0
                                    );

                                    const totalWinBetAmt = item.markets.reduce(
                                        function(sum, b) {
                                            const finalOutcomeIndex = b.market.outcomeStrings.indexOf(
                                                b.market.finalOutcomeString
                                            );
                                            const amt =
                                                b.result === MarketResult.WIN &&
                                                getUserSelectedOutcome(b) ===
                                                    b.market.finalOutcomeString
                                                    ? Number(
                                                          b.outcomeAmount[
                                                              finalOutcomeIndex
                                                          ]
                                                      )
                                                    : 0;
                                            const val = sum + amt;

                                            return val;
                                        },
                                        0
                                    );

                                    const marketClosedcount = item.markets.reduce(
                                        function(sum, b) {
                                            return (
                                                sum +
                                                (b.market.state ===
                                                MarketStateResult.CLOSED
                                                    ? 1
                                                    : 0)
                                            );
                                        },
                                        0
                                    );

                                    const isMarketClosed =
                                        item.markets.length ===
                                        marketClosedcount;

                                    const totalLossAmt = item.markets.reduce(
                                        function(sum, b) {
                                            return sum + Number(b.totalBet);
                                        },
                                        0
                                    );

                                    const betAmount =
                                        totalWinBetAmt > 0
                                            ? totalWinBetAmt
                                            : totalLossAmt;

                                    const totalCount = item.markets.length;
                                    const wonCount = item.markets.filter(
                                        function(ele) {
                                            return (
                                                ele.result === MarketResult.WIN
                                            );
                                        }
                                    );

                                    const handleClaim = (
                                        rewardAmt: number,
                                        betAmt: number
                                    ) => {
                                        const userBetAmt = betAmt
                                            ? betAmt / 1e18
                                            : 0;
                                        dispatch(
                                            updateCollectReward({
                                                status: Status.EXPIRED,
                                                asset: predictableToken,
                                                roundId: item.quest.questId,
                                                betAmount: isMarketClosed
                                                    ? fromWei(
                                                          totalLossAmt,
                                                          library
                                                      )
                                                    : fromWei(
                                                          item.betAmount,
                                                          library
                                                      ),
                                                rewardAmount: rewardAmt
                                                    ? rewardAmt / 1e18
                                                    : 0,
                                                bgnAmount: isMarketClosed
                                                    ? fromWei(
                                                          totalLossAmt,
                                                          library
                                                      )
                                                    : userBetAmt,
                                                questions:
                                                    totalCount > 1
                                                        ? `${wonCount.length} / ${totalCount}`
                                                        : "1",
                                                collectEarnings: "QUESTPAGE",
                                                isRefund: isMarketClosed,
                                            })
                                        );
                                        toggleCollectQuestRewardModal();
                                    };

                                    const statusValue = returnHistoryMarketState(
                                        item.quest.predictionStartTimestamp,
                                        item.quest.opensAtTimestamp,
                                        item.quest.closesAtTimestamp,
                                        item.quest.resolved
                                    );

                                    const columnProps = {
                                        item,
                                        index,
                                        claimedId: claimedQuestId,
                                        library,
                                        predictableToken,
                                        isMarketClosed,
                                        statusValue,
                                        totalWinBetAmt,
                                        betAmount,
                                        totalUserReward,
                                        handleClaim,
                                    };

                                    return <QuestTableRows {...columnProps} />;
                                })}
                        </div>
                    </div>
                </>
            )}
            <CollectQuestRewardModal open={open} onClose={closeCollectCard} />
        </>
    );
};

export default QuestTable;
