import { useMemo, useState } from "react";
import { AppState } from "@Redux";
import { useSelector } from "react-redux";
import { GraphQLClient } from "graphql-hooks";
import { BHAVISH_QUEST_GRAPH_API, PREDICT_TOKENS } from "@Constants";
import { questUserHistoryQuery } from "@Components/Prediction/Vault/queries";
import {
    MarketResult,
    QuestSort,
    QuestState,
} from "@Components/Quests/constants";
import { useWeb3React } from "@web3-react/core";

export const useQuestHistory = (sortBy: any) => {
    const [userQuestHistoryData, setUserQuestHistoryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { account } = useWeb3React();
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );

    const client = new GraphQLClient({
        url: BHAVISH_QUEST_GRAPH_API[selectedChainId],
    });

    const currentTimestamp: number = Math.floor(Date.now() / 1000);

    const sortByMarketStatus = (marketState, quests) => {
        switch (marketState) {
            case QuestState.LIVE:
                return quests.filter(quest => {
                    return (
                        quest.quest.predictionStartTimestamp <
                            currentTimestamp &&
                        currentTimestamp < quest.quest.opensAtTimestamp
                    );
                });
            case QuestState.ENDED:
                return quests.filter(quest => {
                    return (
                        quest.quest.opensAtTimestamp < currentTimestamp &&
                        currentTimestamp < quest.quest.closesAtTimestamp
                    );
                });
            case QuestState.EXPIRED:
                return quests.filter(quest => {
                    return (
                        currentTimestamp > quest.quest.closesAtTimestamp &&
                        quest.quest.resolved
                    );
                });
            case QuestState.INRESOLUTION:
                return quests.filter(quest => {
                    return (
                        currentTimestamp > quest.quest.closesAtTimestamp &&
                        !quest.quest.resolved
                    );
                });
            default:
                return quests;
        }
    };

    const sortByMarketAmount = (sortVal, quests) => {
        if (sortVal === "High") {
            return quests.sort((a, b) => b.betAmount - a.betAmount);
        }
        if (sortVal === "Low") {
            return quests.sort((a, b) => a.betAmount - b.betAmount);
        }
    };

    const sortByMarketType = (sortVal, quests) => {
        const marketCategory = quests.filter(quest => {
            return quest.quest.category.toLowerCase() === sortVal.toLowerCase();
        });
        return marketCategory;
    };

    const sortByActions = (sortVal, quests) => {
        if (sortVal === "Collected") {
            return quests.filter(
                qt => qt.claimed !== null && qt.claimed === true
            );
        }
        if (sortVal === "UnCollected") {
            const tempQuests = [];
            quests.map(quest => {
                const totalWinBetAmt = quest.markets.reduce(function(sum, b) {
                    return (
                        sum +
                        (b.result === MarketResult.WIN ? Number(b.totalBet) : 0)
                    );
                }, 0);
                const questVal: any = quest;
                Object.assign(questVal, {
                    earingsCollected: totalWinBetAmt,
                });

                tempQuests.push(questVal);
                return {};
            });
            const sortByUncollected = tempQuests.filter(
                qt => qt.earingsCollected > 0 && qt.claimed === false
            );
            return sortByUncollected;
        }
    };

    const sortByValue = (questsResult: any, isNoLossy) => {
        if (
            questsResult &&
            questsResult.data &&
            (questsResult.data.noLossQuestUserHistories ||
                questsResult.data.lossyQuestUserHistories)
        ) {
            const quests = isNoLossy
                ? questsResult.data.noLossQuestUserHistories
                : questsResult.data.lossyQuestUserHistories;

            const sortValue = sortBy.split("~");
            if (sortValue[1] === QuestSort.STATUS) {
                return sortByMarketStatus(sortValue[0], quests);
            }
            if (sortValue[1] === QuestSort.AMOUNT) {
                return sortByMarketAmount(sortValue[0], quests);
            }
            if (sortValue[1] === QuestSort.MARKETTYPE) {
                return sortByMarketType(sortValue[0], quests);
            }
            if (sortValue[1] === QuestSort.ACTIONS) {
                return sortByActions(sortValue[0], quests);
            }
            return quests;
        }
    };

    const getMarketsByQuery = async () => {
        setLoading(true);
        const isNoLossy: boolean =
            predictableToken === String(PREDICT_TOKENS.BGN);
        const questsResult: any = await client.request({
            query: questUserHistoryQuery(account, isNoLossy),
        });
        const sortedResultSet: any = sortByValue(questsResult, isNoLossy);
        if (sortedResultSet && sortedResultSet?.length > 0) {
            setUserQuestHistoryData(sortedResultSet);
        } else if (questsResult && questsResult.length > 0) {
            const quests = isNoLossy
                ? questsResult.data.noLossQuestUserHistories
                : questsResult.data.lossyQuestUserHistories;

            setUserQuestHistoryData(quests);
        }
        setLoading(false);
    };

    useMemo(() => {
        getMarketsByQuery();
    }, [predictableToken, sortBy]);

    return { userQuestHistoryData, loading };
};
