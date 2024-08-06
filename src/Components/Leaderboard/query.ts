import { leaderboardBlockedUsers, vaultBlockedUsers } from "@Constants";

export const leaderboard = (sortValue: string, direction: string) => {
    const vaultUsers = vaultBlockedUsers
        .map(user => `"${user.toLowerCase()}"`)
        .join(",");
    const leaderboardUsers = leaderboardBlockedUsers
        .map(user => `"${user.toLowerCase()}"`)
        .join(",");
    return `{
      userInfos(where:{address_not_in: [${vaultUsers} , ${leaderboardUsers}]}, orderBy: "${sortValue}",orderDirection:"${direction}", first:1000){
      address
      roundsWon
      roundsPlayed
      winRate
      netWinnings
      netLosses
      bettedAmount
      market
    }
}`;
};

export const userInfo = (userAddress: any) => {
    return `{
    userInfos(where:{address:"${userAddress}"}, orderBy:netWinnings,orderDirection:desc){
      address
      roundsWon
      roundsPlayed
      roundsLost
      roundsDraw
      winRate
      netWinnings
      netLosses
      bettedAmount
      market
  }
}`;
};
