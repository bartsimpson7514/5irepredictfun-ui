import React from "react";
import MarketPauseIcon from "@Public/svgs/market-pause-icon.svg";
import { useTranslation } from "react-i18next";

const MarketPaused = () => {
    const { t } = useTranslation();
    return (
        <div className="text-sm p-2 rounded-md align-center sm:h-full m-auto justify-center">
            <div
                className="w-full flex items-center justify-center flex-col"
                style={{ height: "360px" }}
            >
                <div>
                    <MarketPauseIcon />
                </div>

                <span className="text-[14px] text-primary-100 font-medium text-highlight mt-4">
                    {t("Markets Paused")}
                </span>
                <span className="text-primary-100 opacity-70 text-sm text-highlight mt-2 text-center break-normal m-w-[455px]">
                    <p>{t("Markets_Paused_TextOne")}</p>
                    <p className="mt-2">{t("Markets_Paused_TextTwo")}</p>
                </span>
            </div>
        </div>
    );
};

export default MarketPaused;
