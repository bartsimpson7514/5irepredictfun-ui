import React from "react";
import LeaderBoard from "@Components/Leaderboard/leaderboard";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import { FEATURE_SUPPORTED } from "@Constants";

const ContentPane = () => {
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    return (
        <>
            {FEATURE_SUPPORTED[selectedChainId][predictableToken]
                ?.leaderBoard ? (
                <LeaderBoard />
            ) : (
                <div className="flex py-52 flex-col gap-4 items-center justify-center">
                    <p className="flex text-entered-text text-2xl font-medium text-center">
                        Coming Soon!
                    </p>
                </div>
            )}
        </>
    );
};

export default ContentPane;
