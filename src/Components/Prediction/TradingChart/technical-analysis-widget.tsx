import React from "react";
import { INTEGRATIONS } from "@Constants";
import TechnicalAnalysis from "./technical-analysis";

const TechnicalAnalysisWidget = ({ symbol, height = 250 }) => {
    const ChartRender = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
            case INTEGRATIONS.QUICKSWAP:
            case INTEGRATIONS.ONYX:
            case INTEGRATIONS.ZEBEC:
                return "dark";
            case INTEGRATIONS.ZEROSWAP:
                return "light";
            default:
                return "dark";
        }
    };

    return (
        <TechnicalAnalysis
            colorTheme={ChartRender()}
            height={height}
            interval="5m"
            showIntervalTabs={false}
            symbol={symbol}
            width="100%"
        />
    );
};
export default TechnicalAnalysisWidget;
