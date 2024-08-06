import { handleGaEvent } from "@Utils/googleanalytics";
import { upperCase } from "@Utils/common";
import React from "react";
import { t } from "i18next";

type indicator = "UP" | "DOWN";
interface IRountIndicator {
    indicator: indicator;
    payout?: number;
    setIsFlipped?: any;
    onePlusCardActive?: any;
    selectedAsset?: string;
}

const CardFlipButton: React.FC<IRountIndicator> = ({ ...props }) => {
    const isActive = !props.onePlusCardActive;

    return (
        <>
            <div className="flex" style={{ height: "40px" }}>
                <button
                    type="button"
                    className={`${
                        props.indicator === "UP" ? "bg-up" : "bg-down"
                    } ${
                        isActive ? "opacity-30" : ""
                    } flex w-full py-3 justify-center rounded-[6px]`}
                    onClick={() => {
                        handleGaEvent(
                            upperCase(
                                `${props.selectedAsset} going ${props.indicator} clicked`
                            )
                        );
                        props.setIsFlipped(true);
                    }}
                    disabled={isActive}
                >
                    <span className="text-sm leading-4 text-primary-white font-semibold">
                        {props.indicator === "UP" ? t("Going Up") : ""}
                        {props.indicator === "DOWN" ? t("Going Down") : ""}
                    </span>
                </button>
            </div>
        </>
    );
};

export default CardFlipButton;
