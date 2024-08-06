import { getQuestOutcomeByID } from "@Components/Quests/query";
import { BHAVISH_QUEST_GRAPH_API, PREDICT_TOKENS } from "@Constants";
import { AppState } from "@Redux";
import { GraphQLClient } from "graphql-hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useGetMarketOutcome = markets => {
    const [questOutcome, setQuestData] = useState([]);
    const [loading, setLoading] = useState(false);
    // set state to re render the hook, on update;
    const [shouldRefetch, refetch] = useState({});
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    const client = new GraphQLClient({
        url: BHAVISH_QUEST_GRAPH_API[selectedChainId],
    });

    const getQuest = async () => {
        setLoading(true);
        const isLossy: boolean =
            predictableToken === String(PREDICT_TOKENS.MATIC) ||
            predictableToken === String(PREDICT_TOKENS.BNB);

        const quest: any = await client.request({
            query: getQuestOutcomeByID(markets, isLossy),
        });

        if (quest && quest.data) {
            if (predictableToken === String(PREDICT_TOKENS.BGN)) {
                setQuestData(quest.data.noLossMarketOutcomePercentages);
            }

            if (
                predictableToken === String(PREDICT_TOKENS.MATIC) ||
                predictableToken === String(PREDICT_TOKENS.BNB)
            ) {
                setQuestData(quest.data.lossyMarketOutcomePercentages);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        getQuest();
    }, [markets, shouldRefetch]);

    return { questOutcome, refetch, loading };
};
