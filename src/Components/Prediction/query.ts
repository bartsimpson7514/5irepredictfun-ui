export const getPriceFeed = asset => {
    return ` {
      rounds(where: {pair:"${asset}/USD"}, orderBy: timestamp, orderDirection: desc, first: 20) {
        roundId
        id
        price
        timestamp
        pair
      }
    }`;
};
