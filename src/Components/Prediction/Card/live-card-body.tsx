import { INTEGRATIONS, USDC_DECIMAL } from "@Constants";
import React, { useEffect, useRef, useState } from "react";
import ReactTooltip from "react-tooltip";
import Lottie from "lottie-react";
import Up from "public/animations/Up.json";
import Down from "public/animations/Down.json";
import InfoIconDark from "public/animations/InfoIconDark.json";
import InfoIconLight from "public/animations/InfoIconLight.json";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import IconTieSmall from "@Public/assets/svgs/icon-tie-small.svg";
import { useTranslation } from "react-i18next";
import { priceSource, returnTruncatedPrice, toDecimals } from "@Utils";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import ReactDOMServer from "react-dom/server";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config";

interface ILiveCardBodyPros {
    closedPrice: number;
    startPrice: number;
    prizePool: number;
    currentPrice: number;
    upPredictAmount: number;
    downPredictAmount: number;
    totalUpPredictAmount: number;
    totalDownPredictAmount: number;
}

const LiveCardbody: React.FC<ILiveCardBodyPros> = ({ ...props }) => {
    const dollar = "$";
    const [differenceLive, setDifferenceLive] = useState(0);
    const { selectedAsset, predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    const { isDarkMode } = useSelector((state: AppState) => state.prediction);
    const fullConfig = resolveConfig(tailwindConfig);

    const upsmallReff = useRef(null);
    const downsmallReff = useRef(null);
    const infoReff = useRef(null);
    const infoReffLive = useRef(null);

    useEffect(() => {
        const result = Number(props.currentPrice) - Number(props.startPrice);
        const roundedResult = result.toFixed(6);
        setDifferenceLive(Number(roundedResult));
    }, [
        props.closedPrice,
        props.startPrice,
        props.currentPrice,
        selectedAsset,
    ]);
    useEffect(() => {
        upsmallReff?.current?.goToAndStop(45, true);
        downsmallReff?.current?.goToAndStop(45, true);
        infoReff?.current?.goToAndStop(24, true);
        infoReffLive?.current?.goToAndStop(24, true);
    }, [isDarkMode]);

    const onMouseEnter = ref => {
        ref && ref?.current?.play();
    };

    const onMouseLeave = (ref, time) => {
        ref && ref?.current?.goToAndStop(time, true);
    };

    const { t } = useTranslation();
    const option = price => {
        if (price > props.startPrice) {
            return "text-up";
        }
        if (price === props.startPrice) {
            return "dark:text-primary-100 text-secondaryText";
        }
        return "text-down";
    };

    const backgroundColor = diff => {
        if (Number(diff) > 0) {
            return "bg-up";
        }
        if (diff === 0) {
            return "bg-tie";
        }
        return "bg-down";
    };

    const icon = diff => {
        if (Number(diff) > 0) {
            return (
                <Lottie
                    animationData={Up}
                    lottieRef={upsmallReff}
                    autoPlay
                    loop
                    onMouseEnter={() => onMouseEnter(upsmallReff)}
                    onMouseLeave={() => onMouseLeave(upsmallReff, 45)}
                    style={{
                        width: "8px",
                    }}
                />
            );
        }
        if (diff === 0) {
            return <IconTieSmall />;
        }
        return (
            <Lottie
                animationData={Down}
                lottieRef={downsmallReff}
                autoPlay
                loop
                onMouseEnter={() => onMouseEnter(downsmallReff)}
                onMouseLeave={() => onMouseLeave(downsmallReff, 45)}
                style={{
                    width: "8px",
                }}
            />
        );
    };

    const ToolTipRender = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
            case INTEGRATIONS.QUICKSWAP:
            case INTEGRATIONS.ONYX:
            case INTEGRATIONS.ZEBEC:
                return (
                    <Lottie
                        animationData={InfoIconLight}
                        lottieRef={infoReffLive}
                        autoPlay
                        loop
                        onMouseEnter={() => onMouseEnter(infoReffLive)}
                        onMouseLeave={() => onMouseLeave(infoReffLive, 24)}
                        style={{
                            width: "12px",
                            marginLeft: "3px",
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
                        onMouseEnter={() => onMouseEnter(infoReffLive)}
                        onMouseLeave={() => onMouseLeave(infoReffLive, 24)}
                        style={{
                            width: "12px",
                            marginLeft: "3px",
                        }}
                    />
                );

            default:
                return (
                    <Lottie
                        animationData={InfoIconLight}
                        lottieRef={infoReffLive}
                        autoPlay
                        loop
                        onMouseEnter={() => onMouseEnter(infoReffLive)}
                        onMouseLeave={() => onMouseLeave(infoReffLive, 24)}
                        style={{
                            width: "12px",
                            marginLeft: "3px",
                        }}
                    />
                );
        }
    };

    const ToolTipFundingPoolRender = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
            case INTEGRATIONS.QUICKSWAP:
            case INTEGRATIONS.ONYX:
            case INTEGRATIONS.ZEBEC:
                return (
                    <Lottie
                        animationData={InfoIconLight}
                        autoPlay
                        loop
                        style={{
                            width: "12px",
                            marginLeft: "3px",
                        }}
                    />
                );
            case INTEGRATIONS.ZEROSWAP:
                return (
                    <Lottie
                        animationData={InfoIconDark}
                        autoPlay
                        loop
                        style={{
                            width: "12px",
                            marginLeft: "3px",
                        }}
                    />
                );

            default:
                return (
                    <Lottie
                        animationData={InfoIconLight}
                        autoPlay
                        loop
                        style={{
                            width: "12px",
                            marginLeft: "3px",
                        }}
                    />
                );
        }
    };

    const borderRender = diff => {
        if (Number(diff) > 0) {
            return "border border-up";
        }
        if (Number(diff) === 0) {
            return "border border-card-section-border";
        }
        return "border border-down";
    };

    return (
        <div
            className={`bg-primary-card-200 dark:bg-footer-text-blue p-4 ${borderRender(
                differenceLive
            )}`}
        >
            <div className="flex flex-row justify-between mb-1.5">
                <div className="flex text-primary-200 items-center text-sm leading-4 font-normal">
                    {t("Last Price")}
                    <div
                        data-html
                        className="cursor-pointer"
                        data-tip={ReactDOMServer.renderToString(
                            <div className="text-primary-100">
                                {`Last price from ${priceSource(
                                    selectedChainId,
                                    selectedAsset
                                )}`}
                            </div>
                        )}
                        data-for="toolTipcurrentPrice"
                        data-place="bottom"
                    >
                        {ToolTipRender()}
                    </div>
                    <div>
                        <ReactTooltip
                            id="toolTipcurrentPrice"
                            effect="solid"
                            className="text-center w-40 text-sm justify-center absolute z-100 rounded-md"
                            backgroundColor={
                                fullConfig.theme.colors["tooltip-background"]
                            }
                            textColor={fullConfig.theme.colors["tooltip-text"]}
                            multiline
                        />
                    </div>
                </div>

                <div className="flex flex-row items-center">
                    <span
                        className={`text-base leading-4 font-semibold text-primary-100 ${option(
                            Number(props.currentPrice)
                        )}`}
                    >
                        {Number(props.currentPrice) > 0 ? (
                            dollar.concat(
                                String(returnTruncatedPrice(props.currentPrice))
                            )
                        ) : (
                            <div className="h-2 w-12">
                                <QuickSwapLoader />
                            </div>
                        )}
                    </span>
                </div>
            </div>
            <div className="flex justify-end text-sm">
                <div
                    className={` flex flex-row p-1 items-center rounded-sm ${backgroundColor(
                        differenceLive
                    )}
                                    `}
                >
                    <div>{icon(differenceLive)}</div>
                    <div className="pl-0.5 text-primary-white text-xs leading-[12px]">
                        {returnTruncatedPrice(Math.abs(differenceLive))}
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-between mt-4">
                <div className="text-primary-200 text-sm leading-4 font-normal">
                    {t("Locked Price")}
                </div>

                <div className="flex flex-row items-center">
                    <span className="text-primary-100 text-sm leading-4">
                        {dollar.concat(
                            String(returnTruncatedPrice(props.startPrice))
                        )}
                    </span>
                </div>
            </div>
            <div className="flex flex-col justify-between mt-4">
                <div className="text-primary-200 text-sm leading-4 font-normal">
                    {t("Your Commit Amt")}
                </div>

                <div className="flex flex-row justify-between mt-1">
                    <div className="text-primary-200 text-xs leading-4 font-normal">
                        {t("Up")}
                    </div>

                    <div className="flex flex-row items-center">
                        <span
                            className={`${
                                Number(props.upPredictAmount)
                                    ? "text-up"
                                    : "text-primary-100"
                            }   font-semibold  text-sm leading-4 `}
                        >
                            {Number(props.upPredictAmount)
                                ? ` ${toDecimals(
                                      props.upPredictAmount / USDC_DECIMAL
                                  )} ${
                                      //   NETWORK_ASSET[selectedChainId]
                                      //       ? NETWORK_ASSET[selectedChainId]
                                      //       : ""
                                      predictableToken
                                  }`
                                : "---"}
                        </span>
                    </div>
                </div>
                <div className="flex flex-row justify-between mt-1">
                    <div className="text-primary-200 text-xs leading-4 font-normal">
                        {t("Down")}
                    </div>

                    <div className="flex flex-row items-center">
                        <span
                            className={`${
                                Number(props.downPredictAmount)
                                    ? "text-down"
                                    : "text-primary-100"
                            }  font-semibold  text-sm leading-4 `}
                        >
                            {Number(props.downPredictAmount)
                                ? `${toDecimals(
                                      props.downPredictAmount / USDC_DECIMAL
                                  )} ${
                                      //   NETWORK_ASSET[selectedChainId]
                                      //       ? NETWORK_ASSET[selectedChainId]
                                      //       : ""
                                      predictableToken
                                  }`
                                : "---"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between mt-4">
                <div className="  text-sm leading-4 text-primary-200 font-normal flex items-center gap-1">
                    <span className="text-sm leading-4 flex items-center gap-1 whitespace-nowrap">
                        {t("Funding Pool")}
                        <div
                            data-html
                            data-tip={ReactDOMServer.renderToString(
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center gap-1  text-xs leading-4">
                                        <p className="text-primary-100 text-xs leading-4">
                                            {t("Up")}
                                        </p>
                                        <p className="text-primary-success font-medium whitespace-nowrap">
                                            {Number(props.totalUpPredictAmount)
                                                ? `${toDecimals(
                                                      props.totalUpPredictAmount /
                                                          USDC_DECIMAL,
                                                      3
                                                  )} ${predictableToken}`
                                                : "---"}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center gap-1  text-xs leading-4">
                                        <p className="text-primary-100 text-xs leading-4">
                                            {t("Down")}
                                        </p>
                                        <p className="text-primary-error font-medium whitespace-nowrap">
                                            {Number(
                                                props.totalDownPredictAmount
                                            )
                                                ? `${toDecimals(
                                                      props.totalDownPredictAmount /
                                                          USDC_DECIMAL,
                                                      3
                                                  )} ${predictableToken}`
                                                : "---"}
                                        </p>
                                    </div>
                                </div>
                            )}
                            className="cursor-pointer"
                            data-for="toolTipDown"
                            data-place="bottom"
                        >
                            {ToolTipFundingPoolRender()}
                        </div>
                        <div>
                            <ReactTooltip
                                id="toolTipDown"
                                effect="solid"
                                className="text-center w-[160px] text-sm justify-center absolute z-100 rounded-md"
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
                    </span>
                </div>
                <div className="flex flex-row items-center">
                    <span className="text-primary-100 text-sm leading-4 font-normal whitespace-nowrap">
                        {`${toDecimals(props.prizePool / USDC_DECIMAL)} ${
                            // NETWORK_ASSET[selectedChainId]
                            //     ? NETWORK_ASSET[selectedChainId]
                            //     : ""
                            predictableToken
                        }`}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LiveCardbody;
