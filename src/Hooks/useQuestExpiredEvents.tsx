import { AppState } from "@Redux";
import { getAllMarkets } from "@Utils/quest";
import { useWeb3React } from "@web3-react/core";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { MarketState } from "../Components/Quests/constants";

export const useQuestExpiredEvents = () => {
    const { library } = useWeb3React();
    const [expiredMarkets, setExpiredMarkets] = useState([]);
    const [loading, setLoading] = useState(false);
    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );

    const getMarkets = async () => {
        setLoading(true);
        const markets = await getAllMarkets(library, predictableToken);

        setLoading(false);
        const expired = markets.filter(market => {
            const { state } = market;

            return (
                Number(state) === MarketState.CLOSED ||
                Number(state) === MarketState.RESOLVED
            );
        });

        setExpiredMarkets(expired);
    };

    useMemo(() => {
        getMarkets();
    }, []);

    return { expiredMarkets, loading };
};
