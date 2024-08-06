/* eslint-disable import/order */
import React, { useEffect, useState, useRef } from "react";
/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Keyboard, Mousewheel, FreeMode } from "swiper";
import "swiper/css";
import {
    getCurrentRoundId,
    getMarketActiveTime,
    getRoundDetailsStocks,
} from "@Utils/rounds";
import { AppState } from "@Redux";
import {
    updateFlipCalculating,
    updateIsCommitInfoLoading,
    updateIsLoading,
    updateShowCalculating,
} from "@Reducers/trade";
import { useDispatch, useSelector } from "react-redux";
import useSwiper from "./hooks/useSwiper";
import "swiper/css/navigation";
import ArrowLeft from "@Public/svgs/ArrowLeft.svg";
import ArrowRight from "@Public/svgs/ArrowRight.svg";
import { useWeb3React } from "@web3-react/core";
import { RoundProps } from "./consts";
import { StyledSwiper } from "@Styled/Options";
import DummyCards from "./cardLoader";
import { getLastPrice } from "@Utils/priceFeed";
import { MARKET_STATUS } from "@Components/Constants";
import InfoCard from "./stocks-info-card";
import RoundCardStocks from "./roundStocks";
import { getAssets } from "@Utils/common";
import { ASSET_TYPES_COMMODITY } from "@Constants";

SwiperCore.use([Keyboard, Mousewheel, FreeMode]);

const PositionStocks = ({ ...props }) => {
    const { setSwiper, swiper } = useSwiper();
    const {
        selectedAsset,
        isPredicted,
        selectedChainId,
        isRewardCollected,
        showCalculating,
        predictableToken,
    } = useSelector((state: AppState) => state.prediction);
    const { account, library } = useWeb3React();
    const [rounds, setRounds] = useState([] as any);
    const [liveRoundEndtime, setLiveRoundEndtime] = useState(0);
    const [fetch, setFetch] = useState(true);
    const [loader, setLoader] = useState(false);
    const [currentPrice, setCurrentPrice] = useState(0);
    const dispatch = useDispatch();
    const freezeBeforeSeconds: number = 15;
    const currentRoundIdRef = useRef();
    let fetchCurrentPriceAndRoundDetailsInterval;
    let getNextRoundDetailInterval;
    const assetData = getAssets(
        ASSET_TYPES_COMMODITY,
        predictableToken,
        selectedChainId
    );

    const getCurrentPrice = async selectedasset => {
        const result: any = await getLastPrice(
            selectedasset,
            selectedChainId,
            library
        );
        setCurrentPrice(result.toFixed(4));
    };

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

    const getRoundId = async () => {
        const currentRound = await getCurrentRoundId(
            selectedAsset,
            selectedChainId,
            library,
            predictableToken
        );
        return currentRound;
    };

    const getRoundEndTimeLive = async (roundDetails, currentRoundId) => {
        const roundDetail = roundDetails.find(element => {
            return Number(element.roundId) === Number(currentRoundId);
        });

        if (roundDetail) {
            await setLiveRoundEndtime(roundDetail.roundEndTimestamp);
            props.onChange(roundDetail.roundEndTimestamp);
        }
    };

    const getRoundEndTimeActive = async (roundDetails, currentRoundId) => {
        const roundDetailForTimer = roundDetails.find(element => {
            return Number(Number(element.roundId)) === Number(currentRoundId);
        });
        if (roundDetailForTimer) {
            await setLiveRoundEndtime(roundDetailForTimer.roundStartTimestamp);
            props.onChange(roundDetailForTimer.roundStartTimestamp);
        }
    };

    const setRoundEndTime = async (
        roundDetails: RoundProps[],
        currentRoundId: number
    ) => {
        if (props.marketState === MARKET_STATUS.LIVE) {
            getRoundEndTimeLive(roundDetails, currentRoundId);
        } else if (props.marketState === MARKET_STATUS.ACTIVE) {
            getRoundEndTimeActive(roundDetails, Number(currentRoundId));
        }
    };

    const getRoundDetail = async (roundId: number) => {
        const defaultAsset = Object.keys(assetData)[0];
        const currentMarketTime = await getMarketState(defaultAsset);
        const roundDetails: any = await getRoundDetailsStocks(
            roundId,
            selectedAsset,
            selectedChainId,
            library,
            props.marketState,
            currentMarketTime.endTimestamp,
            Number(props.roundTime),
            predictableToken
        );
        return roundDetails;
    };

    const fetchNewRoundDetails = async roundId => {
        currentRoundIdRef.current = roundId;
        const details = await getRoundDetail(roundId);
        await setRounds(details);
        await setRoundEndTime(details, roundId);
    };

    const fetchRoundIdAndDetails = async () => {
        const roundId = await getRoundId();
        currentRoundIdRef.current = roundId;
        const details = await getRoundDetail(roundId);
        await setRounds(details);
        await setRoundEndTime(details, roundId);
    };

    useEffect(() => {
        fetchRoundIdAndDetails();
    }, [isPredicted, isRewardCollected, account]);

    useEffect(() => {
        if (liveRoundEndtime) {
            const timer = [];
            const currentTimestamp: number = Math.floor(Date.now() / 1000);
            const timer1 = setTimeout(() => {
                dispatch(updateFlipCalculating(true));
            }, (Number(liveRoundEndtime) - currentTimestamp) * 1000);
            timer.push(timer1);
            const timer2 = setTimeout(() => {
                dispatch(updateShowCalculating(true));
            }, (Number(liveRoundEndtime) - currentTimestamp - freezeBeforeSeconds) * 1000);
            timer.push(timer2);
            return () => {
                timer.map(timerInterval => clearTimeout(timerInterval));
            };
        }
    }, [liveRoundEndtime]);

    const reinitiateNextRound = () => {
        getNextRoundDetailInterval = setInterval(async () => {
            const currentTimestamp: number = Math.floor(Date.now() / 1000);
            if (Number(currentTimestamp) >= Number(liveRoundEndtime)) {
                const roundId = await getRoundId();
                if (roundId > Number(currentRoundIdRef.current)) {
                    await fetchNewRoundDetails(roundId);
                    dispatch(updateShowCalculating(false));
                    dispatch(updateFlipCalculating(false));
                    dispatch(updateIsLoading(false));
                    clearInterval(getNextRoundDetailInterval);
                }
            }
        }, 5000);
    };

    useEffect(() => {
        (async () => {
            setLoader(true);
            setLiveRoundEndtime(0);
            dispatch(updateFlipCalculating(false));
            dispatch(updateShowCalculating(false));
            dispatch(updateIsLoading(false));
            dispatch(updateIsCommitInfoLoading(false));
            await fetchRoundIdAndDetails();
            setLoader(false);
        })();
    }, [selectedAsset, props.marketState]);

    useEffect(() => {
        if (liveRoundEndtime) {
            reinitiateNextRound();
        }
        return () => {
            clearInterval(getNextRoundDetailInterval);
        };
    }, [liveRoundEndtime, selectedAsset, props.marketState]);

    useEffect(() => {
        setCurrentPrice(0);
        (async () => {
            fetchCurrentPriceAndRoundDetailsInterval = setInterval(async () => {
                if (selectedAsset) {
                    getCurrentPrice(selectedAsset);
                    props.marketStateUpdate(selectedAsset);
                    if (!showCalculating) {
                        const roundId = await getRoundId();
                        const details = await getRoundDetail(roundId);
                        await setRounds(details);
                    }
                }
                setFetch(prevFetch => !prevFetch);
            }, 10000);
        })();
        return () => {
            clearInterval(fetchCurrentPriceAndRoundDetailsInterval);
        };
    }, [selectedAsset, props.marketState]);

    const onSwipeLeft = () => {
        swiper.slidePrev();
    };

    const onSwipeRight = () => {
        swiper.slideNext();
    };

    useEffect(() => {
        if (swiper) {
            swiper.slideTo(4, 0.5);
        }
    }, [loader]);

    return (
        <div className="items-center relative flex-row  sm:px-6 pb-6 sm:w-full overflow-hidden">
            <button
                type="button"
                className="absolute left-0 top-2/4 pl-1 hidden md:block"
                onClick={onSwipeLeft}
            >
                <ArrowLeft className="fill-primary dark:fill-asset-text xxl:hidden" />
            </button>
            <StyledSwiper>
                <Swiper
                    initialSlide={3}
                    scrollbar={false}
                    onSwiper={setSwiper}
                    slidesPerView="auto"
                    spaceBetween={16}
                    freeMode={{
                        enabled: true,
                        momentumRatio: 0.25,
                        momentumVelocityRatio: 0.5,
                        momentumBounce: false,
                    }}
                    mousewheel
                    keyboard
                >
                    {!loader &&
                        rounds &&
                        rounds.map((round, index) => (
                            <>
                                {Number(round.roundId) !== 0 ? (
                                    <>
                                        <SwiperSlide key={round.roundId}>
                                            <RoundCardStocks
                                                key={round.roundId}
                                                round={round}
                                                asset={selectedAsset}
                                                currentRoundId={
                                                    round.currentRoundId
                                                }
                                                fetch={fetch}
                                                currentPrice={currentPrice}
                                                roundTime={props.roundTime}
                                                marketState={props.marketState}
                                            />
                                        </SwiperSlide>
                                    </>
                                ) : (
                                    <SwiperSlide key={round.roundId}>
                                        <InfoCard
                                            key={round.roundId}
                                            round={rounds[index]}
                                            roundTime={props.roundTime}
                                        />
                                    </SwiperSlide>
                                )}
                            </>
                        ))}
                    {loader && <DummyCards />}
                </Swiper>
            </StyledSwiper>
            <button
                type="button"
                className="absolute right-0 top-2/4 pr-1 hidden md:block"
                onClick={onSwipeRight}
            >
                <ArrowRight className="fill-primary dark:fill-asset-text xxl:hidden" />
            </button>
        </div>
    );
};

export default PositionStocks;
