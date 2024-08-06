import React from "react";
import MarketClosedIcon from "@Public/svgs/market-closed-icon.svg";
import { useTranslation, Trans } from "react-i18next";

const MarketClosed = () => {
    const { t } = useTranslation();
    // Function returns the market time in the format of "hh:mm a"
    const getMarketTime = (hours, minutes) => {
        const localDate = new Date();
        const utcTime = new Date(
            Date.UTC(
                localDate.getFullYear(),
                localDate.getMonth(),
                localDate.getDate(),
                hours,
                minutes,
                0,
                0
            )
        );
        const time = utcTime.toLocaleTimeString("en-US", { hour12: true });
        return time.slice(0, -6) + time.slice(-3);
    };

    // Function returns the timezone the user is in"
    const getTimeZone = () => {
        const localDate = new Date();
        return String(localDate).slice(34);
    };
    return (
        <div className="text-sm p-2 rounded-md align-center sm:h-full m-auto justify-center">
            <div
                className="w-full flex items-center justify-center flex-col"
                style={{ height: "360px" }}
            >
                <div>
                    <MarketClosedIcon />
                </div>
                <Trans i18nKey="stocks_closed">
                    <span className="text-sm text-primary-100 font-medium text-highlight mt-4">
                        {t("Stocks Market Closed")}
                    </span>
                </Trans>
                <span className="text-primary-200 text-sm text-highlight mt-2 text-center break-normal max-w-[355px] ">
                    {t("market closed", {
                        fromTime: getMarketTime(20, 0),
                        toTime: getMarketTime(12, 30),
                        timeZone: getTimeZone(),
                    })}
                </span>
            </div>
        </div>
    );
};

export default MarketClosed;
