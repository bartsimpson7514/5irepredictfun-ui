import React from "react";
import Widget from "./widget";

export type TechnicalAnalysisProps = {
    interval?:
        | "1m"
        | "5m"
        | "15m"
        | "30m"
        | "1h"
        | "2h"
        | "4h"
        | "1D"
        | "1W"
        | "1M";
    width?: string | number;
    height?: number | number;
    autosize?: boolean;
    isTransparent?: boolean;
    symbol?: string;
    showIntervalTabs?: boolean;
    locale?: any;
    colorTheme?: any;
    largeChartUrl?: string;

    children?: never;

    copyrightStyles?: any;
};

const TechnicalAnalysis: React.FC<TechnicalAnalysisProps> = ({
    interval = "1m",
    width = 425,
    height = 450,
    autosize = false,
    isTransparent = false,
    symbol = "NASDAQ:AAPL",
    showIntervalTabs = true,
    locale = "en",
    colorTheme = "light",
    largeChartUrl = undefined,
    copyrightStyles,
    ...props
}) => {
    return (
        <div id="tradingview_widget_wrapper">
            <Widget
                scriptHTML={{
                    interval,
                    ...(!autosize ? { width } : { width: "100%" }),
                    ...(!autosize ? { height } : { height: "100%" }),
                    isTransparent,
                    symbol,
                    showIntervalTabs,
                    locale,
                    colorTheme,
                    largeChartUrl,
                    shouldUnmount: true,
                    ...props,
                }}
                scriptSRC="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
            />
        </div>
    );
};

export default TechnicalAnalysis;
