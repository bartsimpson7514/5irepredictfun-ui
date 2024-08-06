import { INTEGRATIONS, USDC_DECIMAL } from "@Constants";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import { useTranslation } from "react-i18next";
import { priceSource, returnTruncatedPrice, toDecimals } from "@Utils";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import InfoIconLight from "public/animations/InfoIconLight.json";
import ReactTooltip from "react-tooltip";
import Lottie from "lottie-react";
import ReactDOMServer from "react-dom/server";
import InfoIconDark from "public/animations/InfoIconDark.json";
import resolveConfig from "tailwindcss/resolveConfig";
import { Status } from "./consts";
import CardFlipButton from "./card-flip-button";
import tailwindConfig from "../../../../tailwind.config";

interface IUpcomingCardBodyPros {
    status: Status;
    asset: string;
    prizePool: number;
    handleFlip: any;
    totalUpPredictAmount: number;
    totalDownPredictAmount: number;
    upPredictAmount: number;
    downPredictAmount: number;
    isNextCardActive: boolean;
    currentPrice: number;
}

const UpcomingCardbody: React.FC<IUpcomingCardBodyPros> = ({ ...props }) => {
    // const { chainId } = useWeb3React();
    const {
        isCommitInfoLoading,
        predictableToken,
        selectedChainId,
        selectedAsset,
    } = useSelector((state: AppState) => state.prediction);
    const dollar = "$";
    const fullConfig = resolveConfig(tailwindConfig);
    const infoReffLive = useRef(null);
    const infoReff = useRef(null);

    const { t } = useTranslation();

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

    const onMouseEnter = ref => {
        ref && ref?.current?.play();
    };

    const onMouseLeave = (ref, time) => {
        ref && ref?.current?.goToAndStop(time, true);
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

    return (
        <div className="bg-primary-card-200 border border-card-section-border dark:bg-footer-text-blue p-4">
            <div className="flex flex-col justify-between">
                <div className="flex flex-row justify-between mb-3">
                    <div className="flex text-primary-200 items-center text-sm leading-4 font-normal">
                        {t("Current Price")}
                        <div
                            data-html
                            className="cursor-pointer"
                            data-tip={ReactDOMServer.renderToString(
                                <div className="text-primary-100">
                                    {`Current price from ${priceSource(
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

                    <div className="flex flex-row items-center">
                        <span className="text-base leading-4 font-semibold text-primary-100">
                            {Number(props.currentPrice) > 0 ? (
                                dollar.concat(
                                    String(
                                        returnTruncatedPrice(props.currentPrice)
                                    )
                                )
                            ) : (
                                <div className="h-2 w-12">
                                    <QuickSwapLoader />
                                </div>
                            )}
                        </span>
                    </div>
                </div>
                <div className="text-primary-200 font-normal text-sm leading-4">
                    {t("Your commit amount")}
                </div>

                <div className="flex flex-row justify-between mt-1">
                    <div
                        className={`${
                            Number(props.upPredictAmount)
                                ? "text-asset-text"
                                : "text-primary-200"
                        }  font-normal text-sm leading-4 `}
                    >
                        {t("Up")}
                    </div>

                    <div className="flex flex-row items-center">
                        {props.status === "cancelled" ? (
                            <span className="text-primary-100 text-highlight text-xs leading-4 font-semibold">
                                ---
                            </span>
                        ) : (
                            <>
                                {isCommitInfoLoading ? (
                                    <div className="w-40 h-2">
                                        <QuickSwapLoader />
                                    </div>
                                ) : (
                                    <span
                                        className={`${
                                            Number(props.upPredictAmount)
                                                ? "text-up"
                                                : "text-primary-100"
                                        }   font-semibold  text-sm leading-4 `}
                                    >
                                        {Number(props.upPredictAmount)
                                            ? `
                                            ${toDecimals(
                                                props.upPredictAmount /
                                                    USDC_DECIMAL
                                            )} 
                                              ${predictableToken}`
                                            : "---"}
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div className="flex flex-row justify-between mt-1">
                    <div
                        className={`${
                            Number(props.downPredictAmount)
                                ? "text-asset-text"
                                : "text-primary-200"
                        } font-normal  text-sm leading-4 `}
                    >
                        {t("Down")}
                    </div>

                    <div className="flex flex-row items-center">
                        {props.status === "cancelled" ? (
                            <span className="text-primary-100 text-highlight text-xs leading-4 font-semibold">
                                ---
                            </span>
                        ) : (
                            <>
                                {isCommitInfoLoading ? (
                                    <div className="w-40 h-2">
                                        <QuickSwapLoader />
                                    </div>
                                ) : (
                                    <span
                                        className={`${
                                            Number(props.downPredictAmount)
                                                ? "text-down"
                                                : "text-primary-100"
                                        }  font-semibold  text-sm leading-4 `}
                                    >
                                        {Number(props.downPredictAmount)
                                            ? `${toDecimals(
                                                  props.downPredictAmount /
                                                      USDC_DECIMAL
                                              )} ${predictableToken}`
                                            : "---"}
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-between mt-3 mb-6">
                <div className="text-primary-200 text-sm leading-4">
                    <span className="text-sm leading-4 font-normal flex items-center gap-1 whitespace-nowrap">
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
                                                      4
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
                                                      4
                                                  )} ${predictableToken}`
                                                : "---"}
                                        </p>
                                    </div>
                                </div>
                            )}
                            className="cursor-pointer"
                            data-for="toolTipFundingPool"
                            data-place="bottom"
                        >
                            {ToolTipFundingPoolRender()}
                        </div>
                        <div>
                            <ReactTooltip
                                id="toolTipFundingPool"
                                effect="solid"
                                className="text-center w-40 text-sm justify-center absolute z-100 rounded-md"
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
                    {/* <span className="text-xs leading-4">
                        {`${
                            NETWORK_ASSET[selectedChainId]
                                ? NETWORK_ASSET[selectedChainId]
                                : ""
                        }`}
                    </span> */}
                </div>

                <div className="flex flex-row items-center">
                    <span className="text-highlight whitespace-nowrap text-primary-100 text-sm leading-4">
                        {`${toDecimals(props.prizePool / USDC_DECIMAL)}
                                  ${predictableToken}`}
                    </span>
                </div>
            </div>
            {props.isNextCardActive && (
                <>
                    <div className="mb-4">
                        <CardFlipButton
                            indicator="UP"
                            payout={1.2}
                            onePlusCardActive={props.isNextCardActive}
                            setIsFlipped={() => {
                                props.handleFlip("UP");
                            }}
                            selectedAsset={props.asset}
                        />
                    </div>
                    <CardFlipButton
                        indicator="DOWN"
                        payout={1.2}
                        onePlusCardActive={props.isNextCardActive}
                        setIsFlipped={() => {
                            props.handleFlip("DOWN");
                        }}
                        selectedAsset={props.asset}
                    />
                </>
            )}

            {/* {props.isCalculating && (
                <>
                    {props.upPredictAmount > 0 && (
                        <button
                            type="button"
                            className="flex bg-gray-400 w-full py-3 justify-center rounded-md"
                            onClick={() => {}}
                        >
                            <span className="text-sm leading-4 text-primary-white font-semibold">
                                Up Entered
                            </span>
                        </button>
                    )}
                    {props.downPredictAmount > 0 && (
                        <button
                            type="button"
                            className="flex bg-gray-400 w-full py-3 justify-center rounded-md"
                            onClick={() => {}}
                        >
                            <span className="text-sm leading-4 text-primary-white font-semibold">
                                Down Entered
                            </span>
                        </button>
                    )}
                </>
            )} */}
        </div>
    );
};

export default UpcomingCardbody;
