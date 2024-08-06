import React from "react";
import CloseIcon from "public/svgs/close.svg";
// import TechnicalAnalysisWidget from "@Components/Prediction/TradingChart/technical-analysis-widget";
// import { chartParams } from "@Components/Constants";
// import { TradingChart } from "@Components/Prediction/TradingChart";
import ChainLinkChartSection from "@Components/Prediction/ChainLinkChartSection";
import { TradingChart } from "@Components/Prediction/TradingChart";
import { chartParams } from "@Components/Constants";
import { binanceSourceChainId } from "@Constants";

export const OnyxChartOnOpen = ({
    showChart,
    setShowCart,
    selectedAsset,
    selectedChainId,
    timeFrame,
}) => {
    return (
        <div
            className={`rounded-2xl bg-gray-100 fixed left-0 w-full top-0 z-20 transition-all duration-500 ease-in-out ${
                showChart
                    ? "opacity-100 translate-y-0 h-full"
                    : "opacity-0 pointer-events-none translate-y-full"
            }`}
        >
            <button
                type="button"
                className="text-lg w-full flex items-end justify-end dark:text-primary-text text-highlight outline-none focus:outline-none hover:text-gray-500 transition-all duration-300 p-4"
                onClick={() => {
                    setShowCart(false);
                }}
            >
                <CloseIcon className="h-5 w-5 stroke-white" />
            </button>
            <div className="h-full items-center">
                <div className="w-full h-full">
                    {binanceSourceChainId.includes(selectedChainId) ? (
                        <div className="h-full pb-[17.5rem]">
                            <div className="h-full">
                                <TradingChart
                                    symbol={chartParams[selectedAsset].symbol}
                                    id={chartParams[selectedAsset].id}
                                    timeFrame={timeFrame}
                                />
                            </div>
                        </div>
                    ) : (
                        <ChainLinkChartSection selectedAsset={selectedAsset} />
                    )}

                    {/* <TechnicalAnalysisWidget
                        symbol={chartParams[selectedAsset].symbol}
                        height={220}
                    />
                    <div className="h-full pb-[17.5rem]">
                        <TradingChart
                            symbol={chartParams[selectedAsset].symbol}
                            id={chartParams[selectedAsset].id}
                        />
                    </div> */}
                </div>
            </div>
        </div>
    );
};
