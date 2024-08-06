import React, { useEffect, useState } from "react";
import QuestGraph from "@Components/Quests/quest-graph";
import { useGetMarketOutcome } from "@Hooks/useGetMarketOucome";
import { getDateFromUnixTimestamp } from "@Utils/time";
import Select from "@Basic/select";
import { formatQuestion } from "@Components/Quests/questhelpers";
import { useTranslation } from "react-i18next";
import { Quest } from "./constants";

interface IQuestGraphSection {
    questData: Quest;
    questionIndex?: number;
    currentQuestion?: number;
}

const QuestGraphSection: React.FC<IQuestGraphSection> = ({
    questData,
    questionIndex,
    currentQuestion = 0,
}) => {
    const options = {};
    questData?.markets.forEach((market, index) => {
        options[market.marketId] = `Question ${index + 1}`;
    });
    const [market, setMarket] = useState(Number(questData?.markets[0]?.id));
    const { t } = useTranslation();
    const [marketQuestion, setMarketQuestion] = useState(
        questData?.markets[0]?.question
    );
    const { questOutcome } = useGetMarketOutcome(
        currentQuestion || [market].join()
    );
    const series = questOutcome[0]?.outcomeStrings.map(outcomeString => {
        return {
            name: outcomeString,
            type: "line",
            data: [],
        };
    });
    questOutcome?.forEach(outcome => {
        outcome.outcomePercentage.forEach((percentage, index) => {
            series[index].data.push(percentage);
        });
    });
    const labels = questOutcome?.map(outcome =>
        getDateFromUnixTimestamp(outcome.timestamp)
    );

    useEffect(() => {
        questData?.markets.forEach((mark, index) => {
            options[mark.marketId] = `Question ${index + 1}`;
        });
        setMarket(Number(questData?.markets[0]?.id));
        setMarketQuestion(questData?.markets[0]?.question);
    }, [questData]);

    useEffect(() => {
        if (Number(currentQuestion) > 0) {
            setMarketQuestion(
                `${questionIndex + 1}. ${
                    questData?.markets?.filter(data => {
                        return Number(data.id) === Number(currentQuestion);
                    })[0].question
                }`
            );
        }
    }, [currentQuestion]);

    return (
        <div className="w-full">
            <>
                {Number(currentQuestion) <= 0 && (
                    <div className="w-5/6 sm:w-1/6 mx-4  mt-4 sm:mt-6">
                        {questData?.markets.length > 1 ? (
                            <Select
                                options={options}
                                value={String(market)}
                                onChange={(val: string) => {
                                    setMarket(Number(val));
                                    setMarketQuestion(
                                        questData?.markets?.filter(data => {
                                            return (
                                                Number(data.id) === Number(val)
                                            );
                                        })[0].question
                                    );
                                }}
                                variant="border border-gray-100 py-2 px-4 rounded-md bg-primary-card-200"
                                margin={false}
                            />
                        ) : (
                            <span className="text-primary-100 sm:mx-5 sm:mt-6 text-sm">
                                {t("Question")}
                            </span>
                        )}
                    </div>
                )}
                <p
                    className={`text-xs sm:mt-6 mt-4  ${
                        Number(currentQuestion) > 0
                            ? "text-primary-200 sm:mt-4 ml-6 mb-6"
                            : "text-primary-100 sm:ml-10 ml-4"
                    }`}
                >
                    {formatQuestion(marketQuestion)}
                </p>
            </>
            <div className="pl-8 pb-4 pr-8">
                <QuestGraph series={series} labels={labels} />
            </div>
        </div>
    );
};

export default QuestGraphSection;
