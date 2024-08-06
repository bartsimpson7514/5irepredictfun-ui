import React from "react";
import TickerTape from "@Components/Prediction/TradingChart/ticker-tap";
import { chartParams } from "@Components/Constants";
import { useRouter } from "next/router";
import { INTEGRATIONS } from "@Constants";

const TradingViewTicker = () => {
    const router = useRouter();
    const param = router.pathname;
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
        <>
            {param !== "/restricted" && (
                <TickerTape
                    symbols={Object.values(chartParams)}
                    colorTheme={ChartRender()}
                    largeChartUrl={`${window.location.origin}/api/redirect`}
                />
            )}
        </>
    );
};

export default TradingViewTicker;
