import React from "react";
import CloseIcon from "public/svgs/close.svg";
import TechnicalAnalysisWidget from "@Components/Prediction/TradingChart/technical-analysis-widget";
import { chartParams } from "@Components/Constants";
import { TradingChart } from "@Components/Prediction/TradingChart";

export const QuickSwapChartOnOpen = ({
    showChart,
    setShowCart,
    selectedAsset,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectedChainId,
    timeFrame,
}) => {
    return (
        <div
            className={`bg-gray-200 rounded-2xl  absolute w-full left-0 top-0 z-[1000] transition-all duration-500 ease-in-out  ${
                showChart
                    ? "opacity-100 translate-y-0 h-full"
                    : "opacity-0 pointer-events-none"
            }`}
        >
            <button
                type="button"
                className="text-lg w-full flex items-end  z-50 justify-end dark:text-primary-text text-highlight outline-none focus:outline-none hover:text-gray-500 transition-all duration-300 p-4"
                onClick={() => {
                    setShowCart(false);
                }}
            >
                <CloseIcon className="h-5 w-5 stroke-white" />
            </button>
            <div className="h-full items-center">
                <div className="w-full h-full">
                    <TechnicalAnalysisWidget
                        symbol={chartParams[selectedAsset].symbol}
                        height={220}
                    />
                    <div className="h-full pb-[17.5rem]">
                        <TradingChart
                            symbol={chartParams[selectedAsset].symbol}
                            id={chartParams[selectedAsset].id}
                            timeFrame={timeFrame}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
