import { AppState } from "@Redux";
import { fetchGas } from "@Utils";
import {
    getResultForMarket,
    resolveNoLossRT,
    closeNoLossRTMarket,
} from "@Utils/quest";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";

interface IRenderResolutionSection {
    marketid: number;
    marketState: string;
    setClaimed;
}
const RenderResolutionSection: React.FC<IRenderResolutionSection> = ({
    marketid,
    marketState,
    setClaimed,
}) => {
    const { library, account } = useWeb3React();
    const {
        transactionSpeedOption,
        predictableToken,
        selectedChainId,
    } = useSelector((state: AppState) => state.prediction);
    const alert = useAlert();
    const [showResolve, setShowResolve] = useState(false);
    const { t } = useTranslation();
    const getMarketResult = async (id: number) => {
        try {
            const result = await getResultForMarket(
                library,
                account,
                id,
                predictableToken
            );
            setShowResolve(result);
        } catch (e) {
            alert.error(t("error getting market result"));
        }
    };

    const resolveQuestion = async marketId => {
        const gasFeed = await fetchGas(
            library,
            transactionSpeedOption,
            selectedChainId
        );

        try {
            await resolveNoLossRT(
                library,
                account,
                marketId,
                predictableToken,
                gasFeed
            );
            alert.success(t("Market resolved successfully"));
            setClaimed(prevVal => !prevVal);
        } catch (e) {
            alert.error(t("Something went wrong"));
        }
    };

    const onCloseMarket = async (marketId: number) => {
        const gasFeed = await fetchGas(
            library,
            transactionSpeedOption,
            selectedChainId
        );

        try {
            await closeNoLossRTMarket(
                library,
                account,
                marketId,
                predictableToken,
                gasFeed
            );
            setClaimed(prevVal => !prevVal);
        } catch (e) {
            alert.error(t("Failed to close market", { e }));
        }
    };

    useEffect(() => {
        getMarketResult(marketid);
    }, [marketid]);

    return (
        <div className="flex flex-row items-center space-x-4">
            {marketState === "OPEN" && showResolve && (
                <button
                    onClick={() => resolveQuestion(marketid)}
                    className={`py-2.5 px-2 bg-footer-text  text-primary-white rounded  text-sm font-medium `}
                    type="button"
                >
                    {t("Resolve Market")}
                </button>
            )}

            <button
                onClick={() => onCloseMarket(marketid)}
                className={`py-2.5 px-2   text-primary-white rounded  text-sm font-medium `}
                type="button"
            >
                {t("Close Market")}
            </button>
        </div>
    );
};
export default RenderResolutionSection;
