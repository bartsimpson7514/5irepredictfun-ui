import { userInfo } from "@Components/Leaderboard/query";
import {
    ASSET_TYPES,
    ODDZ_HISTORY_GRAPH_API,
    ODDZ_PREDICTION_OLD_AND_NEW_ADRESSES,
    SUBGRAPH_HISTORY_NOT_SUPPORTED,
} from "@Constants";
import { AppState } from "@Redux";
import { getUserInfo } from "@Utils/roundsGetter";
import { useWeb3React } from "@web3-react/core";
import { GraphQLClient } from "graphql-hooks";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

export const useUserInfoProfile = account => {
    const [userInfos, setUserInfos] = useState({});
    const [loading, setLoading] = useState(false);

    const { library } = useWeb3React();

    const { selectedChainId, selectedAsset, predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );

    const client = new GraphQLClient({
        url: ODDZ_HISTORY_GRAPH_API[predictableToken][selectedChainId],
    });

    const getUserInfoData = async () => {
        const userInfoData = {
            userInfos: [
                {
                    address: "",
                    roundsWon: 0,
                    roundsPlayed: 0,
                    roundsLost: 0,
                    roundsDraw: 0,
                    winRate: 0,
                    netWinnings: 0,
                    netLosses: 0,
                    bettedAmount: 0,
                    market: [],
                },
            ],
        };
        const markets = ASSET_TYPES[selectedChainId].map(
            ASSET_TYPE =>
                ODDZ_PREDICTION_OLD_AND_NEW_ADRESSES[predictableToken][
                    selectedChainId
                ][ASSET_TYPE.symbol]
        );
        markets.map(async address => {
            if (address) {
                const data = await getUserInfo(
                    account,
                    selectedChainId,
                    library,
                    address
                );

                userInfoData.userInfos[0].address = account;
                userInfoData.userInfos[0].roundsWon += Number(
                    data.userInfo.roundsWon
                );
                userInfoData.userInfos[0].roundsPlayed += Number(
                    data.userInfo.roundsPlayed
                );
                userInfoData.userInfos[0].roundsLost += Number(
                    data.userInfo.roundsLost
                );
                userInfoData.userInfos[0].roundsDraw += Number(
                    data.userInfo.roundsDraw
                );
                userInfoData.userInfos[0].winRate += Number(
                    data.userInfo.winRate
                );
                userInfoData.userInfos[0].netWinnings += Number(
                    data.userInfo.netWinnings
                );
                userInfoData.userInfos[0].netLosses += Number(
                    data.userInfo.netLosses
                );
                userInfoData.userInfos[0].bettedAmount += Number(
                    data.userInfo.bettedAmount
                );
                userInfoData.userInfos[0].market.push(address);
            }
        });
        return userInfoData;
    };

    const getUserInfoProfile = async () => {
        setLoading(true);

        if (SUBGRAPH_HISTORY_NOT_SUPPORTED.includes(selectedChainId)) {
            const data = await getUserInfoData();
            setUserInfos(data);
        } else {
            const userData: any = await client.request({
                query: userInfo(account?.toLowerCase()),
            });
            setUserInfos(userData?.data);
        }
        setLoading(false);
    };

    useMemo(() => {
        getUserInfoProfile();
    }, [account, predictableToken, selectedChainId, selectedAsset]);

    return { userInfos, loading };
};
