/* eslint-disable react/jsx-curly-brace-presence */
import TradingViewTicker from "@Components/Prediction/TradingChart/trading-view-ticker";
import React from "react";
import Content from "@Components/Layout/Content";
import CapitalProtectedAlert from "@Components/Header/capitalProtectedAlert";
import { PREDICT_TOKENS } from "@Constants";
import { AppState } from "@Redux";
import { useSelector } from "react-redux";
import OnyxFooter from "./footer";

export const OnyxContent = ({ inactiveFlag, childrenContent }) => {
    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );
    return (
        <div className="flex flex-col relative focus:outline-none overflow-x-hidden bg-screen-background min-h-screen lg:pb-10 md:pb-10 z-50  main-content">
            {predictableToken === PREDICT_TOKENS.BGN && (
                <div className="mt-4">
                    <CapitalProtectedAlert />
                </div>
            )}

            <Content
                inactiveFlag={inactiveFlag}
                childrenContent={childrenContent}
            />

            <OnyxFooter />
            <div className="fixed bottom-0 w-full z-50 mdw:block hidden">
                <TradingViewTicker />
            </div>
        </div>
    );
};

export default OnyxContent;
