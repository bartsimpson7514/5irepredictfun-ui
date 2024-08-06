import { useMemo, useState } from "react";
import { AppState } from "@Redux";
import { useSelector } from "react-redux";
import { GraphQLClient } from "graphql-hooks";
import { BHAVISH_QUEST_GRAPH_API, PREDICT_TOKENS } from "@Constants";
import { useWeb3React } from "@web3-react/core";
import { questUserHistoryQuery } from "@Components/Prediction/Vault/queries";

export const useUserHistory = questId => {
    const [userMarketHistory, setMarketsByCategory]: any = useState();
    const [loading, setLoading] = useState(false);
    const { account } = useWeb3React();
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );

    const client = new GraphQLClient({
        url: BHAVISH_QUEST_GRAPH_API[selectedChainId],
    });

    const getMarketsByQuery = async () => {
        setLoading(true);
        const isNoLossy: boolean =
            predictableToken === String(PREDICT_TOKENS.BGN);
        const questsResult: any = await client.request({
            query: questUserHistoryQuery(account, isNoLossy),
        });

        if (questsResult && questsResult.data) {
            if (predictableToken === String(PREDICT_TOKENS.BGN)) {
                const markets = questsResult.data.noLossQuestUserHistories;
                const filterInfo = markets.filter(
                    item => Number(item.quest.id) === questId
                );
                setMarketsByCategory(filterInfo[0]);
                setLoading(false);
            }

            if (
                predictableToken === String(PREDICT_TOKENS.MATIC) ||
                predictableToken === String(PREDICT_TOKENS.BNB)
            ) {
                const markets = questsResult.data.lossyQuestUserHistories;
                const filterInfo = markets.filter(
                    item => Number(item.quest.id) === questId
                );
                setMarketsByCategory(filterInfo[0]);
                setLoading(false);
            }
        }
    };

    useMemo(() => {
        getMarketsByQuery();
    }, [predictableToken]);

    return { userMarketHistory, loading };
};
