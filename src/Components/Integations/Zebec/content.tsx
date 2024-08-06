import TradingViewTicker from "@Components/Prediction/TradingChart/trading-view-ticker";
import React from "react";
import Content from "@Components/Layout/Content";
import ZebecFooter from "./footer";

export const ZebecContent = ({ inactiveFlag, childrenContent }) => {
    return (
        <div className="flex flex-col relative focus:outline-none overflow-x-hidden bg-screen-background min-h-screen lg:pb-10 md:pb-10 z-50  main-content">
            <Content
                inactiveFlag={inactiveFlag}
                childrenContent={childrenContent}
            />

            <ZebecFooter />
            <div className="fixed bottom-0 w-full z-50 mdw:block hidden">
                <TradingViewTicker />
            </div>
        </div>
    );
};
