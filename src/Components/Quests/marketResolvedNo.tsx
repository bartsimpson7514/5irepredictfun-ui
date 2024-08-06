import WarningIcon from "@Public/svgs/warning.svg";
import React from "react";
import { useTranslation } from "react-i18next";

interface IMarketResolvedNo {}

const MarketResolvedNo: React.FC<IMarketResolvedNo> = () => {
    const { t } = useTranslation();
    return (
        <div className="flex w-full items-center justify-center flex-col gap-8 py-20">
            <WarningIcon className="w-8 h-8" />
            <div className="flex flex-col items-center">
                <h1 className=" text-base font-bold text-primary-100">
                    {`${t("Market ended to")} `}
                    <span className="text-down">No</span>
                </h1>
                <h2 className=" text-sm leading-[22px] text-primary-100 opacity-70 text-center">
                    {t("market_resolved_text")}
                </h2>
            </div>
        </div>
    );
};
export default MarketResolvedNo;
