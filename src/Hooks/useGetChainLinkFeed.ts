import { getPriceFeed } from "@Components/Prediction/query";
import { BHAVISH_PRICE_FEED } from "@Constants";
import { AppState } from "@Redux";
import { getLastPrice } from "@Utils/priceFeed";
import { useWeb3React } from "@web3-react/core";
import { GraphQLClient } from "graphql-hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useGetChainLinkFeed = asset => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [shouldRefetch, refetch] = useState({});
    const { selectedChainId, predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );
    const currentTimestamp: number = Math.floor(Date.now() / 1000);
    const { library } = useWeb3React();

    const client = new GraphQLClient({
        url: BHAVISH_PRICE_FEED[predictableToken][selectedChainId],
    });

    const getCurrentPrice = async assetSelected => {
        try {
            const result: any = await getLastPrice(
                assetSelected,
                selectedChainId,
                library
            );
            return result;
        } catch (err) {
            return 0;
        }
    };

    const getQuest = async () => {
        const priceFeed: any = await client.request({
            query: getPriceFeed(asset),
        });

        return priceFeed;
    };

    const getPriceGraph = async assetSelected => {
        const graphPrice = await getQuest();
        const price = await getCurrentPrice(assetSelected);
        const priceArr = graphPrice?.data?.rounds;
        if (price && priceArr)
            priceArr.splice(0, 0, {
                id: "",
                pair: `${assetSelected}/USD`,
                price: price * 1e8,
                roundId: null,
                timestamp: String(currentTimestamp),
            });
        if (graphPrice?.data?.rounds) {
            setData(priceArr);
            setLoading(false);
        }
    };

    useEffect(() => {
        let fetchPrice;
        (async () => {
            setLoading(true);
            setTimeout(async () => {
                await getPriceGraph(asset);
            }, 1000);
            fetchPrice = setInterval(async () => {
                await getPriceGraph(asset);
            }, 10000);
        })();

        return () => {
            clearInterval(fetchPrice);
            setLoading(false);
            setData([]);
        };
    }, [shouldRefetch, asset]);

    return { data, refetch, loading };
};
