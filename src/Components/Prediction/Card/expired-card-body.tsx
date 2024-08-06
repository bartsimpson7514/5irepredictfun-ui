import { INTEGRATIONS, USDC_DECIMAL } from "@Constants";
import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import Up from "public/animations/Up.json";
import Down from "public/animations/Down.json";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import IconTieSmall from "@Public/assets/svgs/icon-tie-small.svg";
import { useTranslation } from "react-i18next";
import { returnTruncatedPrice, toDecimals } from "@Utils";
import InfoIconLight from "public/animations/InfoIconLight.json";
import ReactTooltip from "react-tooltip";
import ReactDOMServer from "react-dom/server";
import InfoIconDark from "public/animations/InfoIconDark.json";
import resolveConfig from "tailwindcss/resolveConfig";
import { Status } from "./consts";
import tailwindConfig from "../../../../tailwind.config";

interface IExpiredCardBodyPros {
    status?: Status;
    closedPrice?: number;
    startPrice?: number;
    prizePool?: number;
    currentPrice?: number;
    endTime?: number;
    totalUpPredictAmount: number;
    totalDownPredictAmount: number;
    upPredictAmount?: number;
    downPredictAmount?: number;
}

const ExpiredCardbody: React.FC<IExpiredCardBodyPros> = ({ ...props }) => {
    const { t } = useTranslation();
    const dollar = "$";
    const [difference, setDifference] = useState(0);
    const { selectedAsset, predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );
    const { isDarkMode } = useSelector((state: AppState) => state.prediction);

    const upsmallReff = useRef(null);
    const downsmallReff = useRef(null);

    const fullConfig = resolveConfig(tailwindConfig);

    useEffect(() => {
        setDifference(Number(props.closedPrice) - Number(props.startPrice));
    }, [
        props.closedPrice,
        props.startPrice,
        props.currentPrice,
        props.endTime,
        selectedAsset,
    ]);
    useEffect(() => {
        upsmallReff?.current?.goToAndStop(45, true);
        downsmallReff?.current?.goToAndStop(45, true);
    }, [isDarkMode]);

    const onMouseEnter = ref => {
        ref && ref?.current?.play();
    };

    const onMouseLeave = (ref, time) => {
        ref && ref?.current?.goToAndStop(time, true);
    };

    const option = price => {
        if (price > props.startPrice) {
            return "text-up";
        }
        if (price === props.startPrice) {
            return "text-primary-100";
        }
        return "text-down";
    };

    const backgroundColor = diff => {
        if (Number(diff) > 0) {
            return "bg-up";
        }
        if (diff === 0) {
            return "bg-gray-300";
        }
        return "bg-down";
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

    return (
        <div
            className={`bg-primary-card-200 dark:bg-footer-text-blue p-4 ${borderRender(
                difference
            )}`}
        >
            <div className="flex flex-row justify-between mb-1.5">
                <div className="flex items-center text-primary-200 text-sm leading-4 ">
                    {t("Closed Price")}
                </div>
                <div className="flex flex-row items-center">
                    <span
                        className={`text-base leading-4 font-semibold text-primary-100 ${option(
                            props.closedPrice
                        )}`}
                    >
                        {dollar.concat(
                            String(returnTruncatedPrice(props.closedPrice))
                        )}
                    </span>
                </div>
            </div>
            <div className="flex justify-end text-sm">
                <div
                    className={` flex flex-row p-1 items-center rounded-sm ${backgroundColor(
                        difference
                    )}`}
                >
                    <div>{icon(difference)}</div>
                    <div className="pl-0.5 text-primary-white text-xs leading-[12px]">
                        {returnTruncatedPrice(Math.abs(difference))}
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between mt-4">
                <div className="text-primary-200 text-sm leading-4">
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
                <div className="text-primary-200 text-sm leading-4">
                    {t("Total Commit Amt")}
                </div>

                <div className="flex flex-row justify-between mt-1">
                    <div className="text-primary-200 text-xs leading-4">
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
                                  )} ${predictableToken}`
                                : "---"}
                        </span>
                    </div>
                </div>
                <div className="flex flex-row justify-between mt-1">
                    <div className="text-primary-200 text-xs leading-4 text-opacity-72">
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
                <div className="text-primary-200 text-sm leading-4 flex items-center gap-1">
                    <span className="text-sm leading-4 whitespace-nowrap">
                        {t("Funding Pool")}
                    </span>
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
                                        {Number(props.totalDownPredictAmount)
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
                        data-for="toolTipFunding"
                        data-place="bottom"
                    >
                        {ToolTipFundingPoolRender()}
                    </div>
                    <div>
                        <ReactTooltip
                            id="toolTipFunding"
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
                <div className="flex flex-row items-center whitespace-nowrap">
                    <span className="text-primary-100 text-sm leading-4 ">
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

export default ExpiredCardbody;
