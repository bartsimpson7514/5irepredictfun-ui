/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
import { Direction } from "@Components/Constants";
import { userHistory } from "@Components/History/queries";
import { RoundState } from "@Components/Prediction/Card/consts";
import {
    ASSET_TYPES,
    ODDZ_HISTORY_GRAPH_API,
    ODDZ_PREDICTION_OLD_AND_NEW_ADRESSES,
    SUBGRAPH_HISTORY_NOT_SUPPORTED,
} from "@Constants";
import { AppState } from "@Redux";
import { getUserHistory } from "@Utils/roundsGetter";
import { useWeb3React } from "@web3-react/core";
import { GraphQLClient } from "graphql-hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useUserPredicitionHistory = (account, assetArray, isNoLossy) => {
    const [userHistories, setUserHistory] = useState({});
    const [loading, setLoading] = useState(false);
    const [refetchData, setRefetchData] = useState(false);

    const refetch = () => {
        setRefetchData(!refetchData);
    };

    const { library } = useWeb3React();

    const { selectedChainId, selectedAsset, predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );

    const client = new GraphQLClient({
        url: ODDZ_HISTORY_GRAPH_API[predictableToken][selectedChainId],
    });

    const findAssetFromAddress = address => {
        for (const innerAsset in ODDZ_PREDICTION_OLD_AND_NEW_ADRESSES[
            predictableToken
        ][selectedChainId]) {
            if (
                ODDZ_PREDICTION_OLD_AND_NEW_ADRESSES[predictableToken][
                    selectedChainId
                ][innerAsset] === address
            ) {
                return innerAsset;
            }
        }

        return null; // If the address is not found, return null or handle the case as needed
    };

    const fetchDetails = async address => {
        const infoData = await getUserHistory(
            account,
            selectedChainId,
            library,
            address
        );
        return infoData;
    };

    const getUserHistoryData = async () => {
        const userHistoryData = {
            userHistories: [],
        };
        const promiseArr = [];
        const markets = ASSET_TYPES[selectedChainId].map(ASSET_TYPE => {
            return {
                address:
                    ODDZ_PREDICTION_OLD_AND_NEW_ADRESSES[predictableToken][
                        selectedChainId
                    ][ASSET_TYPE.symbol],
            };
        });
        await markets.map(async ({ address }) => {
            if (address) {
                const infoData = fetchDetails(address);
                promiseArr.push(infoData);
            }
        });
        await Promise.all(promiseArr).then(value => {
            value.map(infoData => {
                infoData[0]?.map(data => {
                    const userData = {
                        id: "",
                        userAddress: "",
                        upPredictAmount: "",
                        downPredictAmount: "",
                        rewardReceived: "",
                        totalAmount: null,
                        betTimestamp: "",
                        claimed: false,
                        market: "",
                        roundId: {
                            id: "",
                            roundId: "",
                            asset: "",
                            upPredictAmount: "",
                            downPredictAmount: "",
                            totalAmount: 0,
                            rewardAmount: "",
                            startPrice: "",
                            endPrice: "",
                            roundState: "",
                            winStatus: "",
                        },
                    };
                    userData.id = data.roundId;
                    userData.userAddress = account;
                    userData.upPredictAmount = data.upPredictAmount;
                    userData.downPredictAmount = data.downPredictAmount;
                    userData.rewardReceived = data.rewardReceived;
                    userData.claimed = data.claimed;
                    userData.market = data.market;
                    userData.totalAmount =
                        Number(data.upPredictAmount) +
                        Number(data.downPredictAmount);
                    userData.betTimestamp = data.roundStartTimestamp;
                    userData.roundId.id = data.roundId;
                    userData.roundId.roundId = data.roundId;
                    userData.roundId.asset = `${findAssetFromAddress(
                        data.market
                    )}/USD`;
                    userData.roundId.upPredictAmount =
                        data.roundUpPredictAmount;
                    userData.roundId.downPredictAmount =
                        data.roundDownPredictAmount;
                    userData.roundId.totalAmount =
                        Number(data.roundUpPredictAmount) +
                        Number(data.roundDownPredictAmount);
                    userData.roundId.rewardAmount = data.rewardAmount;
                    userData.roundId.startPrice = data.startPrice;
                    userData.roundId.endPrice = data.endPrice;
                    userData.roundId.roundState = RoundState[data.roundState];
                    userData.roundId.winStatus = Direction[data.winStatus];
                    userHistoryData.userHistories.push(userData);
                });
            });
        });

        return userHistoryData;
    };

    const getUserInfoProfile = async () => {
        setLoading(true);

        if (SUBGRAPH_HISTORY_NOT_SUPPORTED.includes(selectedChainId)) {
            const data = await getUserHistoryData();
            setUserHistory(data);
        } else {
            const userData: any = await client.request({
                query: userHistory(
                    account?.toLowerCase(),
                    assetArray,
                    isNoLossy
                ),
            });
            setUserHistory(userData?.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (account) getUserInfoProfile();
    }, [
        account,
        predictableToken,
        selectedChainId,
        selectedAsset,
        refetchData,
    ]);

    return { userHistories, loading, refetch };
};
