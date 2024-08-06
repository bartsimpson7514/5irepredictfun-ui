import React from "react";
import Widget from "./widget";

export interface TickerTapeSymbol {
    proName: string;
    title: string;
}

export interface TickerTapeProps {
    symbols?: TickerTapeSymbol[];
    showSymbolLogo?: boolean;
    colorTheme?: any;
    isTransparent?: boolean;
    largeChartUrl?: string;
    displayMode?: any;
    locale?: any;

    children?: never;

    copyrightStyles?: any;
}

const defaultSymbols: TickerTapeSymbol[] = [
    {
        proName: "FOREXCOM:SPXUSD",
        title: "S&P 500",
    },
    {
        proName: "FOREXCOM:NSXUSD",
        title: "Nasdaq 100",
    },
    {
        proName: "FX_IDC:EURUSD",
        title: "EUR/USD",
    },
    {
        proName: "BITSTAMP:BTCUSD",
        title: "BTC/USD",
    },
    {
        proName: "BITSTAMP:ETHUSD",
        title: "ETH/USD",
    },
];

const TickerTape: React.FC<TickerTapeProps> = ({
    symbols = defaultSymbols,
    showSymbolLogo = true,
    colorTheme = "light",
    isTransparent = false,
    largeChartUrl = undefined,
    displayMode = "adaptive",
    locale = "en",
    copyrightStyles,
    ...props
}) => {
    return (
        <div id="tradingview_widget_wrapper h-[32px]">
            <Widget
                scriptHTML={{
                    symbols,
                    showSymbolLogo,
                    colorTheme,
                    isTransparent,
                    largeChartUrl,
                    displayMode,
                    locale,
                    shouldUnmount: false,
                    ...props,
                }}
                scriptSRC="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
            />
        </div>
    );
};

export default TickerTape;
