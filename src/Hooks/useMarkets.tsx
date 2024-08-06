import { useMemo, useState } from "react";
import { AppState } from "@Redux";
import { useSelector } from "react-redux";
import { GraphQLClient } from "graphql-hooks";
import { BHAVISH_QUEST_GRAPH_API, PREDICT_TOKENS } from "@Constants";
import { getQuests } from "@Components/Quests/query";
import { categories } from "@Components/Quests/constants";
import { removeQuestBGN, removeQuestMatic } from "@Constants/blackListedQuest";

export const useMarkets = (selectedCategory: string, fetch) => {
    const [marketsByCategory, setMarketsByCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const currentTimestamp: number = Math.floor(Date.now() / 1000);
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );

    const client = new GraphQLClient({
        url: BHAVISH_QUEST_GRAPH_API[selectedChainId],
    });

    const getMarketsByQuery = async () => {
        setLoading(true);
        const isLossy: boolean =
            predictableToken === String(PREDICT_TOKENS.MATIC) ||
            predictableToken === String(PREDICT_TOKENS.BNB);
        const questsResult: any = await client.request({
            query: getQuests(isLossy),
        });

        let quests;
        if (questsResult && questsResult.data) {
            if (predictableToken === String(PREDICT_TOKENS.BGN)) {
                quests = questsResult.data.noLossQuests.reverse();
                quests = quests.filter(
                    data => !removeQuestBGN.includes(data.id)
                );
            }

            if (
                predictableToken === String(PREDICT_TOKENS.MATIC) ||
                predictableToken === String(PREDICT_TOKENS.BNB)
            ) {
                quests = questsResult.data.lossyQuests.reverse();
                quests = quests.filter(
                    data => !removeQuestMatic.includes(data.id)
                );
            }
        }

        if (quests) {
            if (selectedCategory === categories.All) {
                const marketCategory = quests.sort((market1, market2) => {
                    return (
                        Number(market1.opensAtTimestamp) -
                        Number(market2.opensAtTimestamp)
                    );
                });
                setMarketsByCategory(marketCategory);
            } else if (selectedCategory === "New") {
                const marketCategory = quests.sort((market1, market2) => {
                    return (
                        Number(market2.opensAtTimestamp) -
                        Number(market1.opensAtTimestamp)
                    );
                });
                setMarketsByCategory(marketCategory);
            } else if (selectedCategory === categories.Trending) {
                const marketCategory = quests.sort((market1, market2) => {
                    return Number(market2.balance) - Number(market1.balance);
                });
                setMarketsByCategory(marketCategory);
            } else if (selectedCategory === categories.Upcoming) {
                const marketCategory = quests.filter(market => {
                    return currentTimestamp < market.predictionStartTimestamp;
                });
                setMarketsByCategory(marketCategory);
            } else {
                const marketCategory = quests.filter(quest => {
                    return (
                        quest.category.toLowerCase() ===
                        selectedCategory.toLowerCase()
                    );
                });
                setMarketsByCategory(marketCategory);
            }
            setLoading(false);
        }
    };

    useMemo(() => {
        getMarketsByQuery();
    }, [selectedCategory, predictableToken, fetch]);

    return { marketsByCategory, loading };
};
