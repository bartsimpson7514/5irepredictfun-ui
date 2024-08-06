import React, { useState } from "react";
import HistoryNotFound from "@Components/History/empty-history";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import { useQuestHistory } from "@Hooks/useQuestHistory";
import QuestTable from "./quest-table";

const QuestHistory = () => {
    const [sortBy, setSortBye] = useState("");
    const { userQuestHistoryData, loading } = useQuestHistory(sortBy);

    return (
        <>
            <div>
                {userQuestHistoryData && userQuestHistoryData.length <= 0 ? (
                    <HistoryNotFound />
                ) : (
                    <div className="flex items-center flex-col justify-center">
                        {loading ? (
                            <div className="w-full h-28 mt-10">
                                <QuickSwapLoader />
                            </div>
                        ) : (
                            <>
                                <div className="w-full">
                                    <QuestTable
                                        questHistory={userQuestHistoryData}
                                        sortBy={setSortBye}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default QuestHistory;
