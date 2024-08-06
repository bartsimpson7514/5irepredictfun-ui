import React from "react";
import MarketResolution from "@Public/svgs/quest/market-resolution.svg";
import SettlementSvg from "@Public/svgs/quest/settlement.svg";
import QuestGraphSection from "@Components/Quests/quest-graph-section";
import QuestInfo from "./quest-info";
import QuestMultiQuestionHeader from "./quest-multiquestion-header";

const QuestInfoView = ({ questData }) => {
    return (
        <div className="flex flex-col gap-4 w-full sm:w-[70%]">
            <div className="border rounded-[10px] border-primary-100 border-opacity-10">
                <div className="flex flex-col items-start w-full">
                    <QuestMultiQuestionHeader
                        questData={questData}
                        reviewSection
                    />
                    <QuestGraphSection questData={questData} />
                </div>
            </div>
            <QuestInfo
                Icon={MarketResolution}
                title="Market Resolution"
                info={() => (
                    <span className="text-primary-200 text-sm break-words text-justify">
                        {questData?.description}
                    </span>
                )}
            />
            <QuestInfo
                Icon={SettlementSvg}
                title="Source of Settlement"
                info={() => (
                    <a
                        href={questData?.markets[0]?.resolutionSource}
                        className="text-primary-100 text-sm underline  text-ellipsis"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {questData?.markets[0]?.resolutionSource}
                    </a>
                )}
            />
        </div>
    );
};

export default QuestInfoView;
