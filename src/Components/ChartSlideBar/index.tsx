import React, { useEffect } from "react";
import ChartIcon from "@Public/svgs/chart-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@Redux";
import { updateShowChart } from "@Reducers/trade";
import { INTEGRATIONS } from "@Constants";
import { BhavishChartOnOpen } from "@Components/Integations/Bhavish/chartOnOpen";
import { QuickSwapChartOnOpen } from "@Components/Integations/QuickSwap/chartOnOpen";
import { ZeroSwapChartOnOpen } from "@Components/Integations/ZeroSwap/chartOnOpen";
import { OnyxChartOnOpen } from "@Components/Integations/Onyx/chartOnOpen";

const ChartSlideBar = ({ showChart, setShowCart, timeFrame }) => {
    const { selectedAsset, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.innerWidth <= 768) {
            dispatch(updateShowChart(false));
        }
        window.onresize = () => {
            if (window.innerWidth <= 768) {
                dispatch(updateShowChart(false));
            }
        };
    }, []);

    const ChartRender = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
                return (
                    <BhavishChartOnOpen
                        showChart={showChart}
                        setShowCart={setShowCart}
                        selectedAsset={selectedAsset}
                        selectedChainId={selectedChainId}
                        timeFrame={timeFrame}
                    />
                );
            case INTEGRATIONS.QUICKSWAP:
                return (
                    <QuickSwapChartOnOpen
                        showChart={showChart}
                        setShowCart={setShowCart}
                        selectedAsset={selectedAsset}
                        selectedChainId={selectedChainId}
                        timeFrame={timeFrame}
                    />
                );
            case INTEGRATIONS.ZEROSWAP:
                return (
                    <ZeroSwapChartOnOpen
                        showChart={showChart}
                        setShowCart={setShowCart}
                        selectedAsset={selectedAsset}
                        selectedChainId={selectedChainId}
                        timeFrame={timeFrame}
                    />
                );
            case INTEGRATIONS.ONYX:
                return (
                    <OnyxChartOnOpen
                        showChart={showChart}
                        setShowCart={setShowCart}
                        selectedAsset={selectedAsset}
                        selectedChainId={selectedChainId}
                        timeFrame={timeFrame}
                    />
                );
            default:
                return (
                    <BhavishChartOnOpen
                        showChart={showChart}
                        setShowCart={setShowCart}
                        selectedAsset={selectedAsset}
                        selectedChainId={selectedChainId}
                        timeFrame={timeFrame}
                    />
                );
        }
    };

    const ConfirmButton = ({ onClick, content }) => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
            case INTEGRATIONS.QUICKSWAP:
            case INTEGRATIONS.ZEROSWAP:
            case INTEGRATIONS.ONYX:
                return (
                    <button
                        type="button"
                        className="bg-footer-text py-2 px-3 flex gap-1 items-center fixed  right-6 z-10 text-sm rounded-[4px] text-primary-white"
                        onClick={onClick}
                        style={{ top: window.innerHeight - 50 }}
                    >
                        {content()}
                    </button>
                );
            case INTEGRATIONS.ZEBEC:
                return (
                    <div
                        style={{
                            top: window.innerHeight - 50,
                        }}
                        className="p-[1px]  bg-gradient-to-r from-[#08E0A3] w-fit to-[#E0AE1F] rounded-[6px] flex gap-1 items-center fixed  right-6 z-10 text-sm  text-primary-white"
                    >
                        <button
                            type="button"
                            className=" sm:py-[5px] sm:relative sm:px-3 px-2 py-2 hover:bg-opacity-70 flex gap-1 items-center rounded-md bg-[#1A1B1F]"
                            onClick={onClick}
                        >
                            {content()}
                        </button>
                    </div>
                );
            default:
                return (
                    <button
                        type="button"
                        className="bg-footer-text py-2 px-3 flex gap-1 items-center fixed  right-6 z-10 text-sm rounded-[4px] text-primary-white"
                        onClick={onClick}
                        style={{ top: window.innerHeight - 50 }}
                    >
                        {content()}
                    </button>
                );
        }
    };

    return (
        <>
            {ChartRender()}
            {!showChart && (
                <ConfirmButton
                    onClick={() => {
                        setShowCart(true);
                    }}
                    content={() => (
                        <>
                            <ChartIcon className="fill-white h-4 w-4" />
                            <span className="leading-4">Show Chart</span>
                        </>
                    )}
                />
            )}
        </>
    );
};

export default ChartSlideBar;
