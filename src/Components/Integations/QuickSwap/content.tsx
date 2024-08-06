/* eslint-disable react/jsx-curly-brace-presence */
import TradingViewTicker from "@Components/Prediction/TradingChart/trading-view-ticker";
import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import Content from "@Components/Layout/Content";
import QuickSwapFooter from "./footer";
import Alert from "./alert";

const Background = () => {
    return (
        <div className="absolute top-0 left-0 z-0 w-full overflow-hidden -translate-y-[88px]">
            <img
                src="svgs/QuickSwap/Backgroung.svg"
                alt="background-hero"
                className="w-full min-w-[1200px]"
            />
        </div>
    );
};

export const QuickSwapContent = ({ inactiveFlag, childrenContent }) => {
    const { showAlert } = useSelector((state: AppState) => state.prediction);

    return (
        <div className="flex flex-col relative focus:outline-none overflow-x-hidden bg-screen-background min-h-screen lg:pb-10 md:pb-10 z-50  main-content">
            <div className="z-50  max-w-[1376px] mlgh:box-content w-full mx-auto">
                {showAlert && <Alert />}
            </div>
            <Background />
            <Content
                inactiveFlag={inactiveFlag}
                childrenContent={childrenContent}
            />

            <QuickSwapFooter />
            <div className="fixed bottom-0 w-full z-50 mdw:block hidden">
                <TradingViewTicker />
            </div>
        </div>
    );
};
