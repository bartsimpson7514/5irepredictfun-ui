import { AppState } from "@Redux";
import React from "react";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import UpCard from "public/animations/UpCard.json";
import UpCardLight from "public/animations/UpCardLight.json";

import DownCard from "public/animations/DownCard.json";
import DownCardLight from "public/animations/DownCardLight.json";

import { INDICATOR_STATUS, INTEGRATIONS } from "@Constants";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config";

interface CardProps {
    isLive?: boolean;
    isNext?: boolean;
    isSoon?: boolean;
    isSuccess?: boolean;
    isDisabled?: boolean;
    isExpired?: boolean;
    isCancelled?: boolean;
    ribbion?: React.ReactNode;
    borderColor?: string;
    rewardAmount?: number;
    option?: string;
}

const Card: React.FC<CardProps> = ({ ...props }) => {
    const { flipCalculating } = useSelector(
        (state: AppState) => state.prediction
    );
    const fullConfig = resolveConfig(tailwindConfig);

    const styleGenerator = () => {
        if (props.option === INDICATOR_STATUS.UP && !props.isLive) {
            return {
                background:
                    "linear-gradient(180deg, rgba(105, 204, 141, 0.3) 0%, rgba(51, 52, 55, 0.135) 23.95%, rgba(34, 45, 64, 0.09) 100%)",
            };
        }
        if (props.option === INDICATOR_STATUS.DOWN && !props.isLive) {
            return {
                background:
                    "linear-gradient(360deg, rgba(224, 71, 106, 0.3) 18.35%, rgba(35, 38, 47, 0.09) 40.56%, rgba(35, 38, 47, 0.195) 100%)",
            };
        }
        if (props.option === INDICATOR_STATUS.TIE && !props.isLive) {
            return {
                background: fullConfig.theme.colors.toggle,
            };
        }
    };

    const UPCardRender = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
            case INTEGRATIONS.QUICKSWAP:
            case INTEGRATIONS.ONYX:
            case INTEGRATIONS.ZEBEC:
                return (
                    <Lottie
                        animationData={UpCard}
                        autoPlay
                        loop
                        style={{
                            position: "absolute",
                            top: "5px",
                            right: "-3px",
                            zIndex: "-1",
                            width: "300px",
                        }}
                    />
                );
            case INTEGRATIONS.ZEROSWAP:
                return (
                    <Lottie
                        animationData={UpCardLight}
                        autoPlay
                        loop
                        style={{
                            position: "absolute",
                            top: "5px",
                            right: "-3px",
                            zIndex: "-1",
                            width: "300px",
                        }}
                    />
                );

            default:
                return (
                    <Lottie
                        animationData={UpCard}
                        autoPlay
                        loop
                        style={{
                            position: "absolute",
                            top: "5px",
                            right: "-3px",
                            zIndex: "-1",
                            width: "300px",
                        }}
                    />
                );
        }
    };

    const DownCardRender = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
            case INTEGRATIONS.QUICKSWAP:
            case INTEGRATIONS.ONYX:
            case INTEGRATIONS.ZEBEC:
                return (
                    <Lottie
                        animationData={DownCard}
                        autoPlay
                        loop
                        style={{
                            position: "absolute",
                            top: "5px",
                            right: "-3px",
                            zIndex: "-1",
                            width: "300px",
                        }}
                    />
                );
            case INTEGRATIONS.ZEROSWAP:
                return (
                    <Lottie
                        animationData={DownCardLight}
                        autoPlay
                        loop
                        style={{
                            position: "absolute",
                            top: "5px",
                            right: "-3px",
                            zIndex: "-1",
                            width: "300px",
                        }}
                    />
                );
            default:
                return (
                    <Lottie
                        animationData={DownCard}
                        autoPlay
                        loop
                        style={{
                            position: "absolute",
                            top: "5px",
                            right: "-3px",
                            zIndex: "-1",
                            width: "300px",
                        }}
                    />
                );
        }
    };

    return (
        <div
            style={styleGenerator()}
            className={`
            h-full w-full z-50 py-1
            ${props.option === "UP" && !props.isLive ? " border-up" : ""}
            ${props.option === "DOWN" && !props.isLive ? " border-down" : ""}
                ${props.rewardAmount <= 0 ? "opacity-25" : ""} 
            ${
                props.isExpired && props.option !== "TIE"
                    ? "border-2  bg-gray-100"
                    : ""
            } 

            ${props.option === "TIE" ? " border-2 " : ""}
            ${props.isSoon ? "border-2 border-cards-border bg-card-info" : ""}
            ${props.isCancelled ? "border-2 border-primary-400 " : ""}
            primary-300
            ${
                flipCalculating
                    ? "border-cards-border border-2  bg-card-info dark:border-primary-card-200"
                    : ""
            }
            ${
                props.isNext
                    ? "border-live-card-border border-2 bg-card-info"
                    : ""
            }
            ${!props.isLive ? " max-w-sm bg-card-info" : ""}  rounded-xl`}
        >
            {props.option === "UP" && props.isLive && UPCardRender()}
            {props.option === "DOWN" && props.isLive && DownCardRender()}
            {props.children}
        </div>
    );
};

export default Card;
