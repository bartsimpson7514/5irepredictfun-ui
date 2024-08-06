import React from "react";
import { Status, USDC_DECIMAL } from "@Constants";
import { useTranslation } from "react-i18next";
import Accordion from "./history-accordian";
import HistoryAccMweb from "./history-accordian-mweb";

const Pagination = ({ data, isClaimSuccess, currentPage, rowsPerPage }) => {
    const { t } = useTranslation();

    const startIndex = currentPage * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, data.length);
    const currentItems = data.slice(startIndex, endIndex);

    const returnWinStatus = (upAmount, downAmount, status, roundState) => {
        let winStatus = "NOT STARTED";
        if (status && roundState.toUpperCase() === Status.ENDED.toUpperCase()) {
            if (status === "TIE") {
                winStatus = "DRAW";
            } else if (
                (upAmount > 0 && status === "UP") ||
                (downAmount > 0 && status === "DOWN")
            ) {
                winStatus = "YOU WON";
            } else {
                winStatus = "YOU LOST";
            }
        }
        return winStatus;
    };

    return (
        <>
            {currentItems?.map(history => {
                const yourResult = returnWinStatus(
                    history.upPredictAmount,
                    history.downPredictAmount,
                    history.roundId.winStatus,
                    history.roundId.roundState
                );

                const direction: boolean = Number(history.upPredictAmount) > 0;

                return (
                    <>
                        <Accordion
                            index={history.roundId.roundId}
                            round={history.roundId}
                            YourResult={t(yourResult)}
                            Yourdirection={direction ? "UP" : "DOWN"}
                            upPredictAmount={
                                Number(history.upPredictAmount) / USDC_DECIMAL
                            }
                            downPredictAmount={
                                Number(history.downPredictAmount) / USDC_DECIMAL
                            }
                            rewardReceived={Number(history.rewardReceived)}
                            claimed={history.claimed}
                            roundState={history.roundId.roundState}
                            betTime={history.betTimestamp}
                            isClaimSuccess={isClaimSuccess}
                            market={history.market}
                        />

                        <HistoryAccMweb
                            index={history.roundId.roundId}
                            key={history.id}
                            round={history.roundId}
                            YourResult={t(yourResult)}
                            Yourdirection={direction ? "UP" : "DOWN"}
                            upPredictAmount={
                                Number(history.upPredictAmount) / USDC_DECIMAL
                            }
                            downPredictAmount={
                                Number(history.downPredictAmount) / USDC_DECIMAL
                            }
                            rewardReceived={Number(history.rewardReceived)}
                            claimed={history.claimed}
                            betTime={history.betTimestamp}
                            isClaimSuccess={isClaimSuccess}
                            market={history.market}
                        />
                    </>
                );
            })}
        </>
    );
};

export default Pagination;
