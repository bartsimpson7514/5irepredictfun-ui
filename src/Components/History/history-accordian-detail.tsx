/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";

import { INTEGRATIONS, PREDICT_TOKENS, USDC_DECIMAL } from "@Constants";
import { useWeb3React } from "@web3-react/core";
import ReactTooltip from "react-tooltip";
import Lottie from "lottie-react";
import Up from "public/animations/Up.json";
import Down from "public/animations/Down.json";
import InfoIconDark from "public/animations/InfoIconDark.json";
import InfoIconLight from "public/animations/InfoIconLight.json";
import {
    initialPredictableToken,
    priceSource,
    returnTruncatedPrice,
    toDecimals,
} from "@Utils";
import resolveConfig from "tailwindcss/resolveConfig";

// import IconUpSmall from "@Public/assets/svgs/icon-up-small.svg";
// import IconDownSmall from "@Public/assets/svgs/icon-down-small.svg";

import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import { useTranslation } from "react-i18next";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import { getMaticValue } from "@Utils/bhavishPool";
import tailwindConfig from "../../../tailwind.config";

interface IAccordianDetail {
    roundId: number;
    Yourdirection: string;
    Yourposition: number;
    Yourresult: string;
    ClosedPrice: number;
    LockedPrice: number;
    PrizePool: number;
    PayoutUp: number;
    PayoutDOWN: number;

    upPredictAmount: number;
    betTime: number;
    downPredictAmount: number;
    reward: string;
}

const AccordionDetail: React.FC<IAccordianDetail> = ({ ...props }) => {
    const { account, library } = useWeb3React();
    const diff = Number(props.ClosedPrice) - Number(props.LockedPrice);
    const [currentPrice, setCurrentPrice] = useState(0);
    const { selectedAsset, predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    const { isDarkMode } = useSelector((state: AppState) => state.prediction);
    const upReff = useRef(null);
    const upsmallReff = useRef(null);
    const downReff = useRef(null);
    const downsmallReff = useRef(null);
    const infoReff = useRef(null);

    const { t } = useTranslation();
    const getCurrentPrice = async () => {
        const mv = await getMaticValue(library, account);
        if (!mv) return;
        setCurrentPrice(toDecimals(mv, 6));
    };
    const tokenName = initialPredictableToken(selectedChainId);

    useEffect(() => {
        if (selectedAsset) {
            getCurrentPrice();
        }
        return () => {
            setCurrentPrice(0);
        };
    }, []);

    useEffect(() => {
        upsmallReff?.current?.goToAndStop(45, true);
        downsmallReff?.current?.goToAndStop(45, true);
        upReff?.current?.goToAndStop(45, true);
        downReff?.current?.goToAndStop(45, true);
        infoReff?.current?.goToAndStop(24, true);
    }, [isDarkMode]);

    const onMouseEnter = ref => {
        ref && ref?.current?.play();
    };

    const onMouseLeave = (ref, time) => {
        ref && ref?.current?.goToAndStop(time, true);
    };

    const getBackgroundColor = darkMode => {
        return darkMode ? "#222D40" : "#D8E6FB";
    };

    const getTextColor = darkMode => {
        return darkMode ? "text-primary-white" : "text-highlight";
    };

    const fullConfig = resolveConfig(tailwindConfig);

    const ToolTipFundingPoolRender = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
            case INTEGRATIONS.QUICKSWAP:
            case INTEGRATIONS.ONYX:
            case INTEGRATIONS.ZEBEC:
                return (
                    <Lottie
                        animationData={InfoIconLight}
                        lottieRef={infoReff}
                        autoPlay
                        loop
                        onMouseEnter={() => onMouseEnter(infoReff)}
                        onMouseLeave={() => onMouseLeave(infoReff, 24)}
                        style={{
                            width: "12px",
                        }}
                    />
                );
            case INTEGRATIONS.ZEROSWAP:
                return (
                    <Lottie
                        animationData={InfoIconDark}
                        lottieRef={infoReff}
                        autoPlay
                        loop
                        onMouseEnter={() => onMouseEnter(infoReff)}
                        onMouseLeave={() => onMouseLeave(infoReff, 24)}
                        style={{
                            width: "12px",
                        }}
                    />
                );

            default:
                return (
                    <Lottie
                        animationData={InfoIconLight}
                        lottieRef={infoReff}
                        autoPlay
                        loop
                        onMouseEnter={() => onMouseEnter(infoReff)}
                        onMouseLeave={() => onMouseLeave(infoReff, 24)}
                        style={{
                            width: "12px",
                        }}
                    />
                );
        }
    };

    return (
        <div className="accordion-content bg-history-section dark:text-primary-100 text-sm text-primary-100 flex sm:flex-row flex-col gap-4 justify-between w-full sm:mx-6">
            <div className="flex flex-col py-1 pl-2  pt-4 sm:py-4 rounded-lg">
                <div className="text-primary-100 text-sm font-normal mb-4 leading-4">
                    {t("Your History")}
                </div>
                <div className="flex-row justify-between grid grid-cols-2 sm:gap-5  sm:grid-cols-2 md:grid-cols-3">
                    <div className="sm:flex-col flex flex-col-reverse mb-5 sm:mb-0">
                        <p className="text-primary-200 text-sm font-normal mb-2 sm:mt-0 mt-2">
                            {t("Your direction")}
                        </p>
                        <div className="flex space-x-2 ">
                            {Number(props.upPredictAmount) > 0 && (
                                <div className="flex flex-row items-center px-1 w-fit rounded-md bg-up">
                                    <Lottie
                                        animationData={Up}
                                        lottieRef={upReff}
                                        autoPlay
                                        loop
                                        onMouseEnter={() =>
                                            onMouseEnter(upReff)
                                        }
                                        onMouseLeave={() =>
                                            onMouseLeave(upReff, 45)
                                        }
                                        style={{
                                            width: "8px",
                                        }}
                                    />
                                    <span className="font-semibold text-[10px] text-primary-white ml-1">
                                        {t("UP")}
                                    </span>
                                </div>
                            )}
                            {Number(props.downPredictAmount) > 0 && (
                                <div className="flex flex-row items-center px-1 py-1 w-fit rounded-md bg-down">
                                    <Lottie
                                        animationData={Down}
                                        lottieRef={downReff}
                                        autoPlay
                                        loop
                                        onMouseEnter={() =>
                                            onMouseEnter(downReff)
                                        }
                                        onMouseLeave={() =>
                                            onMouseLeave(downReff, 45)
                                        }
                                        style={{
                                            width: "8px",
                                        }}
                                    />
                                    <span className="font-semibold text-[10px] text-primary-white  ml-1">
                                        {t("DOWN")}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="sm:flex-col flex flex-col-reverse sm:row-gap-y-0.5 justify-around">
                        <div className="text-primary-200 text-sm font-normal mb-2">
                            {t("Your Commit Amt")}
                        </div>
                        <div>
                            {Number(props.upPredictAmount) > 0 && (
                                <div className="flex gap-x-1 font-medium text-xs">
                                    <div className="text-up">
                                        {`${t("UP")}: `}
                                    </div>
                                    <div className="text-vault-deposit-strip">
                                        {`${toDecimals(
                                            props.upPredictAmount,
                                            4
                                        )} ${predictableToken}`}
                                    </div>
                                </div>
                            )}
                            {Number(props.downPredictAmount) > 0 && (
                                <div className="flex gap-x-1 font-medium text-xs text-primary-100 ">
                                    <div className="text-down">
                                        {`${t("DOWN")}: `}
                                    </div>
                                    <div className="text-vault-deposit-strip">
                                        {`${toDecimals(
                                            props.downPredictAmount,
                                            4
                                        )}  ${predictableToken}`}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="sm:flex-col sm:mr-8 sm:gap-y-1.5 flex flex-col-reverse sm:mt-0 mt-2">
                        <div className="text-primary-200 text-sm font-normal ">
                            {t("Your Earnings")}
                        </div>
                        <div
                            className={`text-primary-100 font-normal leading-4 sm:text-xs text-sm ${
                                props.Yourresult === "YOU WON" ||
                                props.Yourresult === "DRAW"
                                    ? "text-up"
                                    : "text-down"
                            }`}
                        >
                            {props.Yourresult === "YOU WON" ||
                            props.Yourresult === "DRAW"
                                ? `${toDecimals(Number(props.reward), 6)} `
                                : `-${toDecimals(Number(props.reward), 6)}`}

                            {` ${
                                predictableToken === PREDICT_TOKENS.BGN
                                    ? PREDICT_TOKENS.BRN
                                    : predictableToken
                            }`}
                            {predictableToken === PREDICT_TOKENS.BGN && (
                                <div className="text-sm text-primary-200">
                                    {Number(currentPrice) ? (
                                        `~${currentPrice} ${tokenName}`
                                    ) : (
                                        <div className="h-2 w-10">
                                            <QuickSwapLoader />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* <div className="sm:flex-col sm:mr-8 mt-8 sm:mt-0 hidden flex-col-reverse border-2 border-green-300">
                        <div className="text-primary-200 sm:text-xs text-sm sm:font-normal font-medium  mb-2">
                            {t("Date and Time")}
                        </div>
                        <div className="sm:text-sm text-xs  text-primary-100">
                            {`${new Date(
                                props.betTime * 1000
                            ).toLocaleDateString()} ${new Date(
                                props.betTime * 1000
                            ).toLocaleTimeString()}`}
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="flex flex-col  py-1  sm:py-4  pl-2 rounded-lg grow">
                <div className="text-primary-100 text-sm flex-wrap font-normal  mb-2">
                    {t("Round History")}
                </div>
                <div className="grid grid-cols-2 sm:gap-x-1 sm:grid-cols-2 md:grid-cols-4">
                    <div className="sm:flex sm:flex-col flex flex-col-reverse">
                        <div className="text-primary-200 sm:text-xs text-sm font-normal mb-2 flex items-center">
                            {t("Closed Price")}
                            <div
                                className="pl-1"
                                data-tip={`Closed price from ${priceSource(
                                    selectedChainId,
                                    selectedAsset
                                )}`}
                                data-for="toolTipClosedPrice"
                                data-place="bottom"
                            >
                                {ToolTipFundingPoolRender()}
                            </div>
                            <div>
                                <ReactTooltip
                                    id="toolTipClosedPrice"
                                    effect="solid"
                                    class="text-center w-36 text-sm justify-center absolute z-100"
                                    backgroundColor={
                                        fullConfig.theme.colors[
                                            "tooltip-background"
                                        ]
                                    }
                                    textColor={
                                        fullConfig.theme.colors["tooltip-text"]
                                    }
                                    multiline
                                />
                            </div>
                        </div>
                        <div className="flex">
                            <div
                                className={`text-xs font-normal text-primary-100 ${
                                    diff > 0 ? "text-up" : "text-down"
                                }  leading-4 mr-1`}
                            >
                                {`$${returnTruncatedPrice(props.ClosedPrice)}`}
                            </div>
                            <div className="flex text-xs mr-1">
                                <div
                                    className={` flex flex-row p-1 items-center rounded-sm ${
                                        diff > 0 ? "bg-up" : "bg-down"
                                    }`}
                                >
                                    <div>
                                        {diff > 0 ? (
                                            <Lottie
                                                animationData={Up}
                                                lottieRef={upsmallReff}
                                                autoPlay
                                                loop
                                                onMouseEnter={() =>
                                                    onMouseEnter(upsmallReff)
                                                }
                                                onMouseLeave={() =>
                                                    onMouseLeave(
                                                        upsmallReff,
                                                        45
                                                    )
                                                }
                                                style={{
                                                    width: "6px",
                                                }}
                                            />
                                        ) : (
                                            <Lottie
                                                animationData={Down}
                                                lottieRef={downsmallReff}
                                                autoPlay
                                                loop
                                                onMouseEnter={() =>
                                                    onMouseEnter(downsmallReff)
                                                }
                                                onMouseLeave={() =>
                                                    onMouseLeave(
                                                        downsmallReff,
                                                        45
                                                    )
                                                }
                                                style={{
                                                    width: "6px",
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div
                                        className="pl-0.5 text-entered-text"
                                        style={{
                                            fontSize: "8px",
                                            lineHeight: "8px",
                                        }}
                                    >
                                        {returnTruncatedPrice(Math.abs(diff))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sm:flex sm:flex-col flex flex-col-reverse">
                        <div className="text-primary-200  text-sm font-normal mb-2">
                            {t("Locked Price")}
                        </div>
                        <div className="text-sm font-normal text-primary-100 ">
                            {`$${returnTruncatedPrice(props.LockedPrice)}`}
                        </div>
                    </div>
                    <div
                        className="sm:m-0 sm:flex-col flex flex-col-reverse mt-4"
                        style={{ justifyContent: "start" }}
                    >
                        <div className="text-primary-200  text-sm font-normal mb-2">
                            {t("Prize Pool")}
                        </div>
                        <div className="text-xs text-primary-100 ">
                            {`${toDecimals(
                                props.PrizePool / USDC_DECIMAL
                            )} ${predictableToken}`}
                        </div>
                    </div>
                    <div className="text-xs sm:text-sm font-normal sm:mt-0 sm:flex sm:flex-col flex flex-col-reverse mt-4">
                        <div className="text-primary-200  text-sm font-normal mb-2 ">
                            {t("Payout")}
                        </div>
                        <div className="flex flex-col text-primary-100">
                            <div className="text-up">
                                {`${t("UP")}:  `}
                                {`${props.PayoutUp}x`}
                            </div>
                            <div className="text-down">
                                {`${t("DOWN")}:  `}
                                {`${props.PayoutDOWN}x`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccordionDetail;
