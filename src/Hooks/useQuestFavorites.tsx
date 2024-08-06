import { Quest } from "@Components/Quests/constants";

// import without from "lodash/without";

import { useLocalStorage } from "./useLocalStorage";

export const useQuestFavorites = () => {
    const [favoriteMarkets, setFavoriteMarkets] = useLocalStorage(0, {});

    function addFavoriteMarket(marketid: number, market: Quest) {
        setFavoriteMarkets({
            ...favoriteMarkets,
            [marketid]: { ...market },
        });
    }

    function removeFavoriteMarket(marketid: number) {
        const tempFav = { ...favoriteMarkets };
        delete tempFav[marketid];
        setFavoriteMarkets(tempFav);
    }

    return { favoriteMarkets, addFavoriteMarket, removeFavoriteMarket };
};
