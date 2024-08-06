export const getQuests = (isLossy: boolean) => {
    if (isLossy) {
        return `{
          lossyQuests(where :{active: true}, orderBy: opensAtTimestamp, orderDirection: desc){
            id
            questId
            title
            description
            category
            active
            resolved
            image
            users
            balance
            markets {
              id
              marketId
              state
              outcomeIds
              outcomeStrings
              question
              category
              balance
              resolutionSource  
              link      
              predictionStartTimestamp 
            }
            predictionStartTimestamp
            opensAtTimestamp
            closesAtTimestamp
          } 
}`;
    }
    return `{
      noLossQuests(where :{active: true}, orderBy: opensAtTimestamp, orderDirection: desc){
        id
        questId
        title
        description
        category
        active
        resolved
        image
        users
        balance
        markets {
          id
          marketId
          state
          outcomeIds
          outcomeStrings
          question
          category
          balance
          resolutionSource  
          link      
          predictionStartTimestamp 
        }
        predictionStartTimestamp
        opensAtTimestamp
        closesAtTimestamp
      } 
}`;
};

export const getUserQuest = (isLossy: boolean, address: string) => {
    if (isLossy) {
        return `{
          lossyQuestUserHistories(where :{userAddress: "${address}"}){
          id
          userAddress
          claimed
          quest{
            id
            resolved
          }
          markets{
            id
            userAddress
            claimed
            outcomeAmount
            outcomeTimes
            betTimestamp
            reward
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
          betTimestamp
          totalReward
          claimedReward
          betAmount
          }
    }`;
    }
    return `{
      noLossQuestUserHistories(where :{userAddress: "${address}"}){
        id
        userAddress
        claimed
        quest{
          id
          resolved
        }
        markets{
          id
          userAddress
          claimed
          outcomeAmount
          outcomeTimes
          betTimestamp
          reward
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
        betTimestamp
        totalReward
        claimedReward
        betAmount
        }
  }`;
};

export const getQuestByID = (questId, isLossy) => {
    if (isLossy) {
        return `{
  lossyQuests(where:{ questId: ${questId}}){
    id
    questId
    title
    description
    category
    active
    balance
    image
    markets {
      id
      marketId
      state
      outcomeIds
      outcomeStrings
      question
      category
      balance
      resolutionSource
      userOutcomePercentage
      outcomeBetted
    }
    opensAtTimestamp
    closesAtTimestamp
    predictionStartTimestamp
    resolved
  } 
}`;
    }
    return `{
      noLossQuests(where: {questId: ${questId}}){
      id
      questId
      title
      description
      category
      active
      balance
      image
      markets {
        id
        marketId
        state
        outcomeIds
        outcomeStrings
        question
        category
        balance
        resolutionSource
        userOutcomePercentage
        outcomeBetted
        link
      }
      opensAtTimestamp
      closesAtTimestamp
      predictionStartTimestamp
      resolved
    }
  }
`;
};

export const getQuestOutcomeByID = (questId, isLossy) => {
    if (isLossy) {
        return `{
          lossyMarketOutcomePercentages(where:{marketId_in: [${questId}]},orderBy:timestamp, orderDirection:asc){
            id
            outcomePercentage
            marketId
            timestamp
            outcomeStrings
          }
        }`;
    }
    return `{
      noLossMarketOutcomePercentages(where:{marketId_in: [${questId}]},orderBy:timestamp, orderDirection:asc){
        id
        outcomePercentage
        marketId
        timestamp
        outcomeStrings
      }
    }
`;
};

export const questUserHistoryQuery = (address, isLossy) => {
    if (isLossy) {
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
              markets {
                id
                marketId
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
        description
        category   
        markets {
          id
          marketId
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
