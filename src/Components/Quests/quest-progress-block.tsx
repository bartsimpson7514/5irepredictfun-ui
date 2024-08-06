import { getMarketOutcomeData } from "@Utils/quest";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { fromWei } from "./questhelpers";

const QuestProgressBlock = ({ markets, predictableToken }) => {
    const { library } = useWeb3React();
    const [outcomeBetData, setOutcomeBetData] = useState([]);

    const getMarketBetAmounts = async (
        outcomeString: string,
        outcomeid: number
    ) => {
        const betOutcomeData = await getMarketOutcomeData(
            library,
            markets.marketId,
            outcomeid,
            predictableToken
        );

        const isRecordExist =
            outcomeBetData.filter(c => c.name === outcomeString).length > 0;

        if (!isRecordExist) {
            setOutcomeBetData(prevState => [
                ...prevState,
                { name: outcomeString, betAmount: betOutcomeData },
            ]);
        }
    };

    useEffect(() => {
        if (markets) {
            markets.outcomes.forEach((_otcme, idx) =>
                getMarketBetAmounts(_otcme, idx)
            );
        }
    }, []);

    return (
        <>
            {outcomeBetData.map(item => (
                <div className="text-primary-200 text-xs">
                    {`${item.name} - ${fromWei(
                        item.betAmount,
                        library
                    )}  ${predictableToken}`}
                </div>
            ))}
        </>
    );
};
export default QuestProgressBlock;
