import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import Script from "next/script";
import { isMobile } from "react-device-detect";
import { INTEGRATIONS } from "@Constants";

interface ITradingChart {
    symbol: string;
    id: string;
    timeFrame: number;
}

const tradingViewListener = async () =>
    new Promise<void>(resolve =>
        Object.defineProperty(window, "TradingView", {
            configurable: true,
            set(value) {
                this.tv = value;
                resolve(value);
            },
        })
    );

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

const secondsToMinutes = seconds => {
    return String(seconds / 60);
};

export const TradingChart: React.FC<ITradingChart> = ({ ...props }) => {
    const widgetRef = useRef<any>();
    const { symbol, id } = props;
    const { isDarkMode } = useSelector((state: AppState) => state.prediction);
    const initializeTradingView = (
        TradingViewObj: any,
        symbol1: string,
        opts: any
    ) => {
        let timezone = "Etc/UTC";
        try {
            timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch (e) {
            // noop
        }
        /* eslint-disable new-cap */
        /* eslint-disable no-new */
        // @ts-ignore
        return new TradingViewObj.widget({
            // Advanced Chart Widget uses the legacy embedding scheme,
            // an id property should be specified in the settings object
            id: props.id,
            autosize: true,
            height: "100%",
            symbol1,
            interval: secondsToMinutes(props.timeFrame),
            timezone,
            theme: ChartRender(),
            style: "1",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true,
            hide_side_toolbar: false,
            enabled_features: ["header_fullscreen_button"],
            ...opts,
        });
    };

    useEffect(() => {
        const opts: any = {
            container_id: "tradingview_b239c",
            symbol,
        };

        if (isMobile) {
            opts.hide_side_toolbar = true;
        }

        // @ts-ignore
        if (window.tv) {
            // @ts-ignore
            widgetRef.current = initializeTradingView(
                // @ts-ignore
                window.tv,
                props.symbol,
                opts
            );
        } else {
            tradingViewListener().then(tv => {
                widgetRef.current = initializeTradingView(
                    tv,
                    props.symbol,
                    opts
                );
            });
        }

        // Ignore isMobile to avoid re-render TV
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol, id, isDarkMode, props.timeFrame]);

    return (
        <div className="tradingview_container overflow-hidden ">
            <Script
                src="https://s3.tradingview.com/tv.js"
                strategy="lazyOnload"
                id="tv.js"
            />
            <div id="tradingview_b239c" />
        </div>
    );
};
