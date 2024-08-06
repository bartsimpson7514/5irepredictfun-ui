// import IconDown from "@Public/assets/svgs/icon-down.svg";
// import IconUp from "@Public/assets/svgs/icon-up.svg";
import Lottie from "lottie-react";
import Up from "public/animations/Up.json";
import Down from "public/animations/Down.json";
import { lowerCase } from "lodash";
import React, { ReactElement, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";

interface ICardHeaderProps {
    title?: string;
    icon?: ReactElement;
    indicator?: string;
    setIsFlipped?: any;
    isFlipped?: boolean;
}

const CardBuyHeader: React.FC<ICardHeaderProps> = ({ ...props }) => {
    const upReff = useRef(null);
    const downReff = useRef(null);
    const { isLoading } = useSelector((state: AppState) => state.prediction);
    useEffect(() => {
        upReff?.current?.goToAndStop(45, true);
        downReff?.current?.goToAndStop(45, true);
    }, [props.isFlipped]);

    const onMouseEnter = ref => {
        ref && ref?.current?.play();
    };

    const onMouseLeave = ref => {
        ref && ref?.current?.goToAndStop(45, true);
    };

    return (
        <div className="flex flex-row items-center justify-between px-[18px] mt-6 mb-4">
            <div className="flex flex-start items-center">
                <button
                    type="button"
                    onClick={() => props.setIsFlipped(false)}
                    className={` ${
                        isLoading ? "pointer-events-none opacity-50" : ""
                    }`}
                >
                    {props.icon}
                </button>

                <div className=" text-highlight font-medium text-sm leading-4 ml-2 text-primary-100">
                    {props.title}
                </div>
            </div>
            <div
                className={`bg-${lowerCase(
                    props.indicator
                )} px-2 py-1 rounded-md flex flex-row items-center gap-1`}
            >
                {props.isFlipped &&
                    (props.indicator === "UP" ? (
                        <Lottie
                            animationData={Up}
                            lottieRef={upReff}
                            autoPlay
                            loop
                            onMouseEnter={() => onMouseEnter(upReff)}
                            onMouseLeave={() => onMouseLeave(upReff)}
                            style={{
                                width: "10px",
                            }}
                        />
                    ) : (
                        <Lottie
                            animationData={Down}
                            lottieRef={downReff}
                            autoPlay
                            loop
                            onMouseEnter={() => onMouseEnter(downReff)}
                            onMouseLeave={() => onMouseLeave(downReff)}
                            style={{
                                width: "10px",
                            }}
                        />
                    ))}
                <span className="text-primary-white font-medium leading-4 text-sm">
                    {props.indicator}
                </span>
            </div>
        </div>
    );
};

export default CardBuyHeader;
