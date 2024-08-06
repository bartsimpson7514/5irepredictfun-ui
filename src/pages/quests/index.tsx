import React from "react";
import QuestLayout from "@Components/Quests";
import { FEATURE_SUPPORTED } from "@Constants";
import BGNNotSupportedSection from "@Basic/BgnNotSupported";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";

const QuestPage = () => {
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    return (
        <>
            {FEATURE_SUPPORTED[selectedChainId][predictableToken]?.quests ? (
                <QuestLayout />
            ) : (
                <BGNNotSupportedSection title="Quests" />
            )}
        </>
    );
};

export default QuestPage;
