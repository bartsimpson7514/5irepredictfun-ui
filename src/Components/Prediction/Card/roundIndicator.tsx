import React from "react";
import { useTranslation } from "react-i18next";

type indicator = "UP" | "DOWN";
interface IRountIndicator {
    indicator: indicator;
    payout?: number;
    option: indicator;
    // setIsFlipped?: any;
}

const RoundIndicator: React.FC<IRountIndicator> = ({ ...props }) => {
    const { t } = useTranslation();
    const backgroundColor = () => {
        if (props.option !== props.indicator) {
            return "bg-primary-card-200 dark:bg-footer-text-blue";
        }
        return props.option === "UP"
            ? "bg-up rounded-t-md"
            : "bg-down rounded-b-md";
    };
    return (
        <div className="flex" style={{ height: "40px" }}>
            <button
                type="button"
                className={`${backgroundColor()} flex w-full py-2 items-center justify-center`}
                // onClick={() => props.setIsFlipped(true)}
            >
                <span className="text-sm leading-4 text-primary-white font-semibold">
                    {props.indicator === "UP" ? "Up" : ""}
                    <span className="text-xs text-primary-200 leading-2 font-semibold mx-2">
                        {props.payout ? `${props.payout}x payout` : ""}
                    </span>

                    {props.indicator === "DOWN" ? t("DOWN") : ""}
                </span>
            </button>
        </div>
    );
};

export default RoundIndicator;
