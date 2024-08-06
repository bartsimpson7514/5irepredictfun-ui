import { toDecimals } from "@Utils";
import React from "react";
import { useTranslation } from "react-i18next";

interface IRountIndicator {
    payout?: number;
    option?: string;
}
const RoundIndicatorDown: React.FC<IRountIndicator> = ({ ...props }) => {
    const { t } = useTranslation();
    return (
        <div className="flex mt-px">
            <div
                className={`${
                    props.option === "DOWN"
                        ? "bg-down border border-down"
                        : "bg-primary-card-200 border border-card-section-border"
                }  flex rounded-b-lg w-full   py-3 items-center justify-center cursor-default`}
            >
                <span
                    className={`text-base leading-4 font-semibold
                    ${
                        props.option !== "DOWN" && props.option !== "LATER"
                            ? "text-down"
                            : ""
                    }
                        ${props.option === "DOWN" ? "text-primary-100" : ""}
                        ${
                            props.option === "LATER"
                                ? "text-primary-200 font-normal text-sm"
                                : ""
                        }

               `}
                >
                    {t("DOWN")}
                </span>
                {props.option !== "LATER" && (
                    <span className="text-sm leading-4 text-asset-text text-highlight mx-2">
                        <span className="text-xs leading-4">
                            {" "}
                            {t("Payout")}
                        </span>
                        &nbsp;
                        <span className="text-sm leading-4 font-semibold">
                            {`${toDecimals(props.payout, 2)}x `}
                        </span>
                    </span>
                )}
            </div>
        </div>
    );
};

export default RoundIndicatorDown;
