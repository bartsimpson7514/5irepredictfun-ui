import { flatten } from "@Utils";

export const userHistory = (
    address: any,
    markets: Array<String>,
    isNoLossy = false
) => {
    const flat = flatten(markets);
    const marketsString = flat
        ?.map(market => {
            return `"${market ? market?.toLowerCase() : ""}"`;
        })
        .join(",");

    if (isNoLossy) {
        return `{
        userHistories(where:{userAddress: "${address}",market_in:[${marketsString}]},orderBy:betTimestamp,orderDirection:desc, first:1000){
          id
          userAddress
          upPredictAmount
          downPredictAmount
          rewardReceived
          totalAmount
          claimed
          market
          betTimestamp
          roundId {
            id
            roundId
            asset
            upPredictAmount
            downPredictAmount
            totalAmount
            rewardAmount
            startPrice
            endPrice
            roundState
            winStatus
          }
        }
    }`;
    }

    return `{
        userHistories(where:{userAddress: "${address}",market_in:[${marketsString}]},orderBy:betTimestamp,orderDirection:desc, first:1000){
          id
          userAddress
          upPredictAmount
          downPredictAmount
          rewardReceived
          totalAmount
          betTimestamp
          claimed
          market
          roundId {
            id
            roundId
            asset
            upPredictAmount
            downPredictAmount
            totalAmount
            rewardAmount
            startPrice
            endPrice
            roundState
            winStatus
          }
        }
    }`;
};
