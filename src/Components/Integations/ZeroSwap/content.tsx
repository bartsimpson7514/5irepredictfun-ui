import TradingViewTicker from "@Components/Prediction/TradingChart/trading-view-ticker";
import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import Content from "@Components/Layout/Content";
import Alert from "./alert";
import ZeroSwapFooter from "./footer";

export const ZeroSwapContent = ({ inactiveFlag, childrenContent }) => {
    const { showAlert } = useSelector((state: AppState) => state.prediction);

    return (
        <div className="flex flex-col relative focus:outline-none overflow-x-hidden bg-screen-background min-h-screen lg:pb-10 md:pb-10 z-50  main-content">
            <div className="absolute w-[322px] h-[322px] left-10 top-[607px] bg-[#B5AC49] bg-opacity-30 blur-[400px]" />
            <div className="absolute w-[488px] h-[488px] left-[1182px] top-[470px] bg-[#56B4D3] bg-opacity-50 blur-[400px]" />
            <div className="absolute w-[376px] h-[376px] left-[611px] top-[607px] bg-[470px] bg-opacity-50 blur-[400px]" />

            <div className="z-50   mlgh:box-content w-full mx-auto">
                {showAlert && <Alert />}
            </div>
            <Content
                inactiveFlag={inactiveFlag}
                childrenContent={childrenContent}
            />

            <ZeroSwapFooter />
            <div className="fixed bottom-0 w-full z-50 mdw:block hidden">
                <TradingViewTicker />
            </div>
        </div>
    );
};
