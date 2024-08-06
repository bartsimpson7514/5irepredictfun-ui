export const vaultData = vaultAddress => {
    return `{
      userHistories(where:{vaultAddress: "${vaultAddress}"}, orderBy: timestamp, orderDirection:desc) {
        id
        assetAmount
        shareAmount
        txnType
        userAddress
        timestamp
        vaultAddress
      }
    }`;
};

export const vaultUserData = (address, vaultAddress) => {
    return `{
      userHistories(where:{userAddress: "${address}", vaultAddress: "${vaultAddress}"},orderBy: timestamp) {
        id
        assetAmount
        shareAmount
        txnType
        userAddress
        timestamp
        vaultAddress
      }
    }`;
};

export const vaultWeekData = vaultAddress => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const weekBeforeTimestamp = currentTimestamp - 604800;
    return `{
    userHistories(where:{timestamp_gt: "${weekBeforeTimestamp}", , vaultAddress: "${vaultAddress}"},orderBy: timestamp) {
      id
      assetAmount
      shareAmount
      txnType
      userAddress
      timestamp
      vaultAddress
    }
  }`;
};

export const vaultUserAllData = (address, markets) => {
    const marketsString = markets
        ?.map(market => `"${market?.toLowerCase()}"`)
        .join(",");

    return `{
    userHistories(where:{userAddress: "${address}", vaultAddress_in:[${marketsString}]},orderBy: timestamp,  orderDirection: desc) {
      id
      assetAmount
      shareAmount
      txnType
      userAddress
      timestamp
      vaultAddress
    }
  }`;
};

export const vaultStartTimestamp = vaultAddress => {
    return `{
    userHistories(where:{ vaultAddress: "${vaultAddress}"},orderBy: timestamp, first: 1) {
      timestamp
    }
  }`;
};

export const vaultLastData = vaultAddress => {
    return `{
  userHistories(where:{ vaultAddress: "${vaultAddress}"},orderBy: timestamp, orderDirection: desc, first: 1) {
    id
    assetAmount
    shareAmount
    txnType
    userAddress
    timestamp
    vaultAddress
  }
}`;
};

export const VAULTLASTDATA = `query GetVaultData($vaultAddress: String){
    userHistories(where:{ vaultAddress: $vaultAddress},orderBy: timestamp, orderDirection: desc, first: 1) {
      id
      assetAmount
      shareAmount
      txnType
      userAddress
      timestamp
      vaultAddress
    }
  }`;

export const VAULTSTARTTIMESTAMP = `query GetVaultStartTimestamp($vaultAddress: String){
    userHistories(where:{ vaultAddress: $vaultAddress},orderBy: timestamp, first: 1) {
      timestamp
    }
  }`;

export const questUserHistoryQuery = (address, isNoLossy) => {
    if (isNoLossy) {
        return `{
          noLossQuestUserHistories(where:{userAddress: "${address}"},orderBy: betTimestamp,  orderDirection: desc) {
          id
          userAddress
          claimed
          betTimestamp
          totalReward
          claimedReward
          betAmount
          quest {
            id
            questId
            title
            resolved
            description
            category   
            markets {
              id
              marketId
              balance
              category
              link
              outcomeIds
              outcomeStrings
              question
              resolutionSource
              state
            }   
            opensAtTimestamp
            closesAtTimestamp
            predictionStartTimestamp
    
          }
          markets {
            id
            userAddress
            claimed
            outcomeAmount
            reward
            betTimestamp
            result
            totalBet
            outcomeTimes
            market {
              state
              category
              description
              question
              outcomeIds
              outcomeStrings
              finalOutcomeId
              finalOutcomeString       
            }
          }
        }
    }`;
    }
    return `{
          lossyQuestUserHistories(where:{userAddress: "${address}"},orderBy: betTimestamp,  orderDirection: desc) {
        id
        userAddress
        claimed
        betTimestamp
        totalReward
        claimedReward
        betAmount
        quest {
          id
          questId
          title
          description
          category   
          resolved 
          markets {
            id
            marketId
            balance
            category
            link
            outcomeIds
            outcomeStrings
            question
            resolutionSource
            state
          }    
          opensAtTimestamp
          closesAtTimestamp
          predictionStartTimestamp
  
        }
        markets {
          id
          userAddress
          claimed
          outcomeAmount
          reward
          betTimestamp
          result
          totalBet
          outcomeTimes
          market {
            state
            category
            description
            question
            outcomeIds
            outcomeStrings
            finalOutcomeId
            finalOutcomeString       
          }
        }
      }
  }`;
};
