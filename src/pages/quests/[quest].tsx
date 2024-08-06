import React, { useEffect, useState } from "react";
import BackToIndex from "@Basic/BackToIndex";
import { useRouter } from "next/router";
import { useGetMarket } from "@Hooks/useGetMarket";
import QuestInfoView from "@Components/Quests/quest-info-view";
import QuestMultiQuestionSection from "@Components/Quests/questMultiQuestionSection";
import OutcomeForm from "@Components/Quests/outcome-form";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import { checkBlackListInprogressQuest } from "@Constants/blackListedQuest";

const Quest = () => {
    const { query } = useRouter();
    const { isQuestPredicted, predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );

    const questId = Number(query.marketid);

    const checkResolution = () => {
        return (
            checkBlackListInprogressQuest(
                predictableToken,
                Number(query.marketid)
            ) || query.ended === "true"
        );
    };

    const inResolution = query.inresolution === "true";
    const ended = checkResolution();
    const expired = query.expired === "true";
    const startsin = query.startsin === "true";
    const answered = query.answered === "true";

    const { questData, refetch } = useGetMarket(Number(questId));

    // const { questOutcome } = useGetMarketOutcome(questId);
    const [reviewQuest, setReviewQuest] = useState(false);
    const [betOutcomes, setBetOutcomes] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            refetch({});
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, [isQuestPredicted]);

    return (
        <div className=" flex flex-col sm:gap-6 gap-4">
            <BackToIndex title="Quests" link="/quests" />

            <>
                <div className="sm:flex sm:w-full justify-between">
                    <div className="flex sm:flex-row flex-col-reverse sm:gap-8 gap-4 w-full  ">
                        {questData &&
                        !reviewQuest &&
                        !inResolution &&
                        !ended &&
                        !expired &&
                        !answered &&
                        !startsin ? (
                            <div className="w-full border border-primary-100 rounded-[10px] border-opacity-10">
                                <QuestMultiQuestionSection
                                    // outcomesPercent={questOutcome}
                                    questData={questData}
                                    onReviewQuest={onreview => {
                                        setReviewQuest(onreview);
                                    }}
                                    onSelectedOutComeids={outcomes =>
                                        setBetOutcomes(outcomes)
                                    }
                                />
                            </div>
                        ) : (
                            <>
                                <QuestInfoView questData={questData} />
                                {questData &&
                                    reviewQuest &&
                                    !inResolution &&
                                    !ended && (
                                        <OutcomeForm
                                            expired={expired}
                                            ended={ended}
                                            inResolution={inResolution}
                                            questId={questId}
                                            title={questData.title}
                                            startsin={startsin}
                                            answered={answered}
                                            markets={questData.markets}
                                            questions={
                                                questData?.markets.length
                                            }
                                            onPlacebetSuccess={() => {
                                                refetch({});
                                            }}
                                            betOutcomes={betOutcomes}
                                        />
                                    )}

                                {/** todo : needs to be refacoted */}
                                {questData && inResolution && (
                                    <OutcomeForm
                                        expired={expired}
                                        ended={ended}
                                        inResolution={inResolution}
                                        questId={questId}
                                        title={questData.title}
                                        startsin={startsin}
                                        answered={answered}
                                        markets={questData.markets}
                                        questions={questData?.markets.length}
                                        onPlacebetSuccess={() => {}}
                                        betOutcomes={betOutcomes}
                                    />
                                )}

                                {questData && ended && (
                                    <OutcomeForm
                                        expired={expired}
                                        ended
                                        startsin={startsin}
                                        inResolution={inResolution}
                                        questId={questId}
                                        title={questData.title}
                                        answered={answered}
                                        markets={questData.markets}
                                        questions={questData?.markets.length}
                                        onPlacebetSuccess={() => {}}
                                        betOutcomes={betOutcomes}
                                    />
                                )}

                                {questData && expired && (
                                    <OutcomeForm
                                        expired
                                        startsin={startsin}
                                        ended={ended}
                                        inResolution={inResolution}
                                        questId={questId}
                                        answered={answered}
                                        title={questData.title}
                                        markets={questData.markets}
                                        questions={questData?.markets.length}
                                        onPlacebetSuccess={() => {}}
                                        betOutcomes={betOutcomes}
                                    />
                                )}

                                {questData && startsin && (
                                    <OutcomeForm
                                        expired={expired}
                                        ended={ended}
                                        startsin
                                        inResolution={inResolution}
                                        answered={answered}
                                        questId={questId}
                                        title={questData.title}
                                        markets={questData.markets}
                                        questions={questData?.markets.length}
                                        onPlacebetSuccess={() => {}}
                                        betOutcomes={betOutcomes}
                                    />
                                )}

                                {questData &&
                                    answered &&
                                    !reviewQuest &&
                                    !inResolution &&
                                    !ended &&
                                    !expired &&
                                    !startsin && (
                                        <OutcomeForm
                                            expired={expired}
                                            ended={ended}
                                            inResolution={inResolution}
                                            questId={questId}
                                            title={questData.title}
                                            startsin={startsin}
                                            answered
                                            markets={questData.markets}
                                            questions={
                                                questData?.markets.length
                                            }
                                            onPlacebetSuccess={() => {}}
                                            betOutcomes={betOutcomes}
                                        />
                                    )}
                            </>
                        )}
                    </div>
                </div>
            </>
        </div>
    );
};

export default Quest;
