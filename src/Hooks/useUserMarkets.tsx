import { useMemo, useState } from "react";
import { AppState } from "@Redux";
import { useSelector } from "react-redux";
import { GraphQLClient } from "graphql-hooks";
import { BHAVISH_QUEST_GRAPH_API, PREDICT_TOKENS } from "@Constants";
import { getUserQuest } from "@Components/Quests/query";
import { useWeb3React } from "@web3-react/core";

export const useUserMarkets = () => {
    const [userMarketData, setMarketsByCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const { account } = useWeb3React();
    const [shouldRefetch, refetch] = useState({});
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );

    const client = new GraphQLClient({
        url: BHAVISH_QUEST_GRAPH_API[selectedChainId],
    });

    const getMarketsByQuery = async () => {
        setLoading(true);
        const isLossy: boolean = predictableToken !== PREDICT_TOKENS.BGN; // pass this value dynamically when we introduce lossy
        const questsResult: any = await client.request({
            query: getUserQuest(isLossy, account),
        });

        if (questsResult && questsResult.data) {
            if (predictableToken === String(PREDICT_TOKENS.BGN)) {
                const markets = questsResult.data.noLossQuestUserHistories;
                setMarketsByCategory(markets);
                setLoading(false);
            }

            if (
                predictableToken === String(PREDICT_TOKENS.MATIC) ||
                predictableToken === String(PREDICT_TOKENS.BNB)
            ) {
                const markets = questsResult.data.lossyQuestUserHistories;
                setMarketsByCategory(markets);
                setLoading(false);
            }
        }
    };

    useMemo(() => {
        getMarketsByQuery();
    }, [predictableToken, shouldRefetch]);

    return { userMarketData, refetch, loading };
};
