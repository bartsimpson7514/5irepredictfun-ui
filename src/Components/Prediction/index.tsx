import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { handleGaEvent } from "@Utils/googleanalytics";
import { getAssets } from "@Utils/common";
import Timer from "@Components/Prediction/Timer";
import AssetsDropdown from "@Components/Prediction/AssetsDropdown";
import { AppState } from "@Redux";
import Position from "@Components/Prediction/Card/Positions";
import { MARKET_STATUS, chartParams } from "@Components/Constants";
import { updateSelectedAsset } from "@Reducers/trade";
import { getMarketActiveTime, getRoundInterval } from "@Utils/rounds";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import ChartSlideBar from "@Components/ChartSlideBar";
import ChartSwitch from "@Components/ChartSlideBar/chartIcon";
// import { INTEGRATIONS, NETWORK_NAME } from "@Constants";
import { ODDZ_NETWORK, PREDICT_TOKENS, binanceSourceChainId } from "@Constants";
import PositionStocks from "./Card/PositionsStocks";
import MarketClosed from "./MarketClosed";
import ChainLinkChartSection from "./ChainLinkChartSection";
import { TradingChart } from "./TradingChart";
// import { TradingChart } from "./TradingChart";
// import TechnicalAnalysisWidget from "./TradingChart/technical-analysis-widget";

const TopBar = ({
    selectedAsset,
    assetData,
    assetsIconRender,
    roundEndTime,
    marketState,
    roundTime,
}) => {
    const dispatch = useDispatch();

    return (
        <div className="flex flex-row items-center justify-between">
            <div className="cursor-pointer flex flex-row items-center justify-center md:justify-start relative">
                <AssetsDropdown
                    value={selectedAsset}
                    options={assetData}
                    onChange={(val: string) => {
                        handleGaEvent(`${val} clicked`);
                        dispatch(updateSelectedAsset(val));
                    }}
                    iconRender={assetsIconRender}
                />
            </div>
            <Timer
                roundEndTime={roundEndTime}
                marketState={marketState}
                roundTime={roundTime}
            />

            <div className="hidden sm:flex">
                <ChartSwitch />
            </div>
        </div>
    );
};

// const ChartSection = ({
//     selectedAsset,
//     chartLoading,
//     selectedChainId,
//     title,
// }) => {
//     const returnTitle = () => {
//         switch (title) {
//             case "Commodities":
//                 return "commodities";
//             case "Crypto currencies":
//                 return "crypto-usd";
//             case "Stocks":
//                 return "stocks";
//             default:
//                 return "crypto-usd";
//         }
//     };
//     return (
//         <>
//             <div className="flex">
//                 <div className="dark:bg-chart-dark p-2 rounded-xl w-9/12">
//                     <div style={{ height: "250px" }}>
//                         {chartLoading ? (
//                             <QuickSwapLoader />
//                         ) : (
//                             <TradingChart
//                                 symbol={chartParams[selectedAsset].symbol}
//                                 id={chartParams[selectedAsset].id}
//                             />
//                         )}
//                     </div>
//                 </div>
//                 {chartLoading ? (
//                     <div className="w-3/12">
//                         <QuickSwapLoader />
//                     </div>
//                 ) : (
//                     <div className="dark:bg-chart-dark p-2 rounded-xl w-3/12 overflow-hidden">
//                         <TechnicalAnalysisWidget
//                             symbol={chartParams[selectedAsset].symbol}
//                         />
//                     </div>
//                 )}
//             </div>
//             <span className="text-xs leading-5 font-medium italic text-primary-200">
//                 {`Note: The above TradingView chart is only for reference purposes
//                 only. The last round price is derived from `}
//                 <a
//                     href={`https://data.chain.link/${NETWORK_NAME[
//                         selectedChainId
//                     ]?.toLowerCase()}/mainnet/${returnTitle()}/${selectedAsset?.toLowerCase()}-usd`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="gradient-text bg-footer-text"
//                 >
//                     Chainlink
//                 </a>
//                 {` and differs slightly from the TradingView chart price.`}
//             </span>
//         </>
//     );
// };

const CardSection = ({
    loaded,
    title,
    onChange,
    roundTime,
    marketState,
    getMarketState,
    updateMarketState,
}) => {
    return (
        <>
            {!loaded && (
                <div className="w-full h-40 px-4 sm:py-10 py-4">
                    <QuickSwapLoader />
                </div>
            )}
            {loaded && (
                <>
                    {title === "Stocks" ? (
                        <>
                            {marketState === MARKET_STATUS.PAUSED ? (
                                <MarketClosed />
                            ) : (
                                <PositionStocks
                                    onChange={onChange}
                                    roundTime={roundTime}
                                    marketState={marketState}
                                    marketStateUpdate={async asset => {
                                        const currentMarketState = await getMarketState(
                                            asset
                                        );
                                        updateMarketState(currentMarketState);
                                    }}
                                />
                            )}
                        </>
                    ) : (
                        <Position onChange={onChange} roundTime={roundTime} />
                    )}
                </>
            )}
        </>
    );
};

const PredictionSkeleton = ({ title, assetsIconRender, assets }) => {
    const {
        showChart,
        selectedAsset,
        selectedChainId,
        predictableToken,
    } = useSelector((state: AppState) => state.prediction);
    const { account, library } = useWeb3React();
    const dispatch = useDispatch();
    const [roundTime, setRoundtime] = useState(0);
    const [showMwebChart, setShowMwebChart] = useState(false);
    const [roundEndTime, setRoundEndTime] = useState(0);
    const [marketState, setMarketState] = useState("");
    const [loaded, setLoaded] = useState(false);
    // const [chartLoading, setChartLoading] = useState(true);
    const [assetData, setAssetData] = useState(
        getAssets(assets, predictableToken, selectedChainId)
    );

    useEffect(() => {
        setAssetData(getAssets(assets, predictableToken, selectedChainId));
    }, [predictableToken, selectedChainId]);

    const getMarketState = async (asset: string) => {
        const currentTimestamp: number = Math.floor(Date.now() / 1000);

        const marketTime: any = await getMarketActiveTime(
            asset,
            selectedChainId,
            library,
            currentTimestamp
        );
        return marketTime;
    };

    const getRoundtime = async () => {
        const result: any = await getRoundInterval(
            selectedAsset,
            selectedChainId,
            library,
            predictableToken
        );
        return result;
    };

    const updateMarketState = async currentMarketTime => {
        const currentTimestamp: number = Math.floor(Date.now() / 1000);
        const rountTime = await getRoundtime();
        const buffer = 2 * rountTime;
        if (
            Number(currentMarketTime.endTimestamp) < currentTimestamp ||
            Number(currentMarketTime.startTimestamp) - buffer > currentTimestamp
        ) {
            setMarketState(MARKET_STATUS.PAUSED);
        } else if (
            Number(currentMarketTime.startTimestamp) - buffer <
                currentTimestamp &&
            Number(currentMarketTime.startTimestamp) > currentTimestamp
        ) {
            setMarketState(MARKET_STATUS.ACTIVE);
        } else {
            setMarketState(MARKET_STATUS.LIVE);
        }
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         setChartLoading(false);
    //     }, 1000);
    // }, []);

    const getAndUpdateMarketState = async asset => {
        if (title === "Stocks") {
            const currentMarketTime = await getMarketState(asset);
            await updateMarketState(currentMarketTime);
        } else {
            setMarketState(MARKET_STATUS.LIVE);
        }
    };

    useEffect(() => {
        (async () => {
            if (assetData && !assetData[selectedAsset]) {
                const defaultAsset = Object.keys(assetData)[0];
                dispatch(updateSelectedAsset(defaultAsset));
                getAndUpdateMarketState(defaultAsset);
            } else {
                getAndUpdateMarketState(selectedAsset);
            }
            setLoaded(true);
        })();
    }, [assetData, account]);

    useEffect(() => {
        if (selectedAsset) {
            (async () => {
                const rountTime = await getRoundtime();
                setRoundtime(rountTime);
            })();
        }
        return () => {
            setRoundtime(0);
        };
    }, [account, selectedAsset, selectedChainId]);

    const onChange = (liveRoundEndTime: number) => {
        setRoundEndTime(Number(liveRoundEndTime) * 1000);
    };

    return (
        <>
            <div className="sm:p-0  px-2 pt-2">
                <TopBar
                    selectedAsset={selectedAsset}
                    assetData={assetData}
                    assetsIconRender={assetsIconRender}
                    roundEndTime={roundEndTime}
                    marketState={marketState}
                    roundTime={roundTime}
                />

                {showChart && selectedAsset && (
                    <>
                        {binanceSourceChainId.includes(selectedChainId) ? (
                            <div className="h-[300px] py-4">
                                <TradingChart
                                    symbol={
                                        selectedChainId ===
                                            ODDZ_NETWORK.MANTA_MAINNET &&
                                        selectedAsset === PREDICT_TOKENS.ETH
                                            ? "OKX:ETHUSDT"
                                            : chartParams[selectedAsset].symbol
                                    }
                                    id={chartParams[selectedAsset].id}
                                    timeFrame={roundTime}
                                />
                            </div>
                        ) : (
                            <ChainLinkChartSection
                                selectedAsset={selectedAsset}
                            />
                        )}
                    </>
                )}
            </div>
            <div className="items-center flex flex-row w-full mt-6">
                <CardSection
                    loaded={loaded}
                    title={title}
                    onChange={onChange}
                    roundTime={roundTime}
                    marketState={marketState}
                    getMarketState={getMarketState}
                    updateMarketState={updateMarketState}
                />
            </div>

            <div className="sm:hidden fixed bottom-0 right-0 z-50">
                <ChartSlideBar
                    showChart={showMwebChart}
                    setShowCart={setShowMwebChart}
                    timeFrame={roundTime}
                />
            </div>
        </>
    );
};

export default PredictionSkeleton;
