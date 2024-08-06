import { Quest } from "@Components/Quests/constants";
import { getQuestByID } from "@Components/Quests/query";
import { BHAVISH_QUEST_GRAPH_API, PREDICT_TOKENS } from "@Constants";
import { AppState } from "@Redux";
import { GraphQLClient } from "graphql-hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useGetMarket = (questId: number) => {
    const [questData, setQuestData] = useState<Quest>();
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
            query: getQuestByID(questId, isLossy),
        });

        if (quest) {
            if (predictableToken === String(PREDICT_TOKENS.BGN)) {
                setQuestData(quest.data.noLossQuests[0]);
            }

            if (
                predictableToken === String(PREDICT_TOKENS.MATIC) ||
                predictableToken === String(PREDICT_TOKENS.BNB)
            ) {
                setQuestData(quest.data.lossyQuests[0]);
            }
        }

        setLoading(false);
    };

    useEffect(() => {
        getQuest();
    }, [questId, shouldRefetch]);

    return { questData, refetch, loading };
};
