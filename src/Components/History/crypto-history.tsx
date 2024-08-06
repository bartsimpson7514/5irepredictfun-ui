import React from "react";
import HistoryRoundTable from "@Components/History/history-round-table";
import HistoryNotFound from "@Components/History/empty-history";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";

const CryptoHistory = ({ userHistories, loading, selectedTab }) => {
    return (
        <>
            {userHistories?.userHistories?.length <= 0 ? (
                <HistoryNotFound />
            ) : (
                <div className="flex items-center flex-col justify-center">
                    {loading ? (
                        <div className="w-full h-28 mt-10">
                            <QuickSwapLoader />
                        </div>
                    ) : (
                        <HistoryRoundTable
                            userHistories={userHistories}
                            selectedTab={selectedTab}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default CryptoHistory;
