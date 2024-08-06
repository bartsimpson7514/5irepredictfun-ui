/* eslint-disable import/order */
import React, { useEffect, useState, useRef } from "react";
/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Keyboard, Mousewheel, FreeMode } from "swiper";
import "swiper/css";
import { getCurrentRoundId, getRoundDetails } from "@Utils/rounds";
import { AppState } from "@Redux";
import {
    updateCurrentRoundId,
    updateFlipCalculating,
    updateIsCommitInfoLoading,
    updateIsLoading,
    updateShowCalculating,
} from "@Reducers/trade";
import { useDispatch, useSelector } from "react-redux";
import useSwiper from "./hooks/useSwiper";
import RoundCard from "./round";
import "swiper/css/navigation";
import ArrowLeft from "@Public/svgs/ArrowLeft.svg";
import ArrowRight from "@Public/svgs/ArrowRight.svg";
import { useWeb3React } from "@web3-react/core";
import { RoundProps } from "./consts";
import { StyledSwiper } from "@Styled/Options";
import DummyCards from "./cardLoader";
import { getLastPrice } from "@Utils/priceFeed";
import { isMobile } from "react-device-detect";
import { toDecimals } from "@Utils";

SwiperCore.use([Keyboard, Mousewheel, FreeMode]);

const Position = ({ ...props }) => {
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

    const getCurrentPrice = async selectedasset => {
        try {
            const result: any = await getLastPrice(
                selectedasset,
                selectedChainId,
                library
            );
            // remove this
            setCurrentPrice(toDecimals(result, 6));
        } catch (e) {
            setCurrentPrice(currentPrice);
        }
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

    const setRoundEndTime = async (
        roundDetails: RoundProps[],
        currentRndID: number
    ) => {
        const roundDetail = roundDetails.find(element => {
            return Number(element.roundId) === Number(currentRndID);
        });

        if (roundDetail) {
            await setLiveRoundEndtime(roundDetail.roundEndTimestamp);
            props.onChange(roundDetail.roundEndTimestamp);
        }
    };

    const getRoundDetail = async (roundId: number) => {
        const roundDetails: any = await getRoundDetails(
            roundId,
            selectedAsset,
            selectedChainId,
            library,
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

    const cleanupCache = (id, roundId) => {
        const detailsData = JSON.parse(window.localStorage.getItem(id));
        if (detailsData) {
            const filteredCommitDetailsData = Object.keys(detailsData).reduce(
                (filter, key) => {
                    if (Number(key) > Number(roundId) - 4)
                        // eslint-disable-next-line no-param-reassign
                        filter[key] = detailsData[key];
                    return filter;
                },
                {}
            );
            window.localStorage.setItem(
                id,
                JSON.stringify(filteredCommitDetailsData)
            );
        }
    };

    const fetchRoundIdAndDetails = async () => {
        const roundId = await getRoundId();
        dispatch(updateCurrentRoundId(roundId));

        cleanupCache("commitDetails", roundId);
        cleanupCache("rewardAmount", roundId);

        currentRoundIdRef.current = roundId;
        const details = await getRoundDetail(roundId);
        await setRounds(details);
        await setRoundEndTime(details, roundId);
    };

    useEffect(() => {
        fetchRoundIdAndDetails();
    }, [isPredicted, isRewardCollected, account, selectedChainId]);

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
                    dispatch(updateCurrentRoundId(roundId));
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
    }, [selectedAsset]);

    useEffect(() => {
        if (liveRoundEndtime) {
            reinitiateNextRound();
        }
        return () => {
            clearInterval(getNextRoundDetailInterval);
        };
    }, [liveRoundEndtime, selectedAsset, selectedChainId]);

    useEffect(() => {
        setCurrentPrice(0);
        (async () => {
            fetchCurrentPriceAndRoundDetailsInterval = setInterval(async () => {
                if (selectedAsset) {
                    getCurrentPrice(selectedAsset);
                    if (!showCalculating) {
                        // const roundId = await getRoundId();

                        const details = await getRoundDetail(
                            currentRoundIdRef.current
                        );
                        await setRounds(details);
                    }
                }
                setFetch(prevFetch => !prevFetch);
            }, 5000);
        })();
        return () => {
            clearInterval(fetchCurrentPriceAndRoundDetailsInterval);
        };
    }, [selectedAsset, selectedChainId]);

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
        <div className="items-center relative flex-row px-2 sm:px-10  sm:w-full overflow-hidden">
            <button
                type="button"
                className="absolute left-0 top-2/4 hidden md:block"
                onClick={onSwipeLeft}
            >
                <ArrowLeft className="xxl:hidden stroke-primary-200" />
            </button>
            <StyledSwiper>
                <Swiper
                    initialSlide={3}
                    scrollbar={false}
                    onSwiper={setSwiper}
                    slidesPerView="auto"
                    spaceBetween={isMobile ? 8 : 16}
                    freeMode={{
                        enabled: !isMobile,
                        momentumRatio: 0.25,
                        momentumVelocityRatio: 0.5,
                        momentumBounce: false,
                    }}
                    mousewheel
                    keyboard
                >
                    {!loader &&
                        rounds &&
                        rounds.map(round => (
                            <SwiperSlide key={round.roundId}>
                                <RoundCard
                                    key={round.roundId}
                                    round={round}
                                    asset={selectedAsset}
                                    currentRoundId={round.currentRoundId}
                                    fetch={fetch}
                                    currentPrice={currentPrice}
                                    roundTime={props.roundTime}
                                />
                            </SwiperSlide>
                        ))}
                    {loader && <DummyCards />}
                </Swiper>
            </StyledSwiper>
            <button
                type="button"
                className="absolute right-0 top-2/4 hidden md:block"
                onClick={onSwipeRight}
            >
                <ArrowRight className="xxl:hidden stroke-primary-200" />
            </button>
        </div>
    );
};

export default Position;
