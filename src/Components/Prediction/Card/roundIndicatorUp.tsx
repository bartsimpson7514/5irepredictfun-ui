import { toDecimals } from "@Utils";
import React from "react";
import { useTranslation } from "react-i18next";

interface IRountIndicator {
    payout?: number;
    option?: string;
}

const RoundIndicatorUp: React.FC<IRountIndicator> = ({ ...props }) => {
    const { t } = useTranslation();
    return (
        <div className="flex mb-px">
            <div
                className={`${
                    props.option === "UP"
                        ? "bg-up border border-up"
                        : "bg-primary-card-200 border border-card-section-border"
                } flex rounded-t-lg w-full py-3 items-center justify-center cursor-default`}
            >
                <span
                    className={`text-base leading-4 font-semibold
                            ${
                                props.option !== "UP" &&
                                props.option !== "LATER"
                                    ? "text-up"
                                    : ""
                            }
                                ${
                                    props.option === "UP"
                                        ? "text-primary-100"
                                        : ""
                                }
                                ${
                                    props.option === "LATER"
                                        ? "text-primary-200 font-normal text-sm"
                                        : ""
                                }

                       `}
                >
                    {t("UP")}
                </span>
                {props.option !== "LATER" && (
                    <span className="mx-2 leading-4">
                        <span className="text-xs leading-4 text-asset-text font-normal">
                            {t("Payout")}
                        </span>
                        &nbsp;
                        <span className="text-sm leading-4 font-semibold text-asset-text">
                            {`${toDecimals(props.payout, 2)}x `}
                        </span>
                    </span>
                )}
            </div>
        </div>
    );
};

export default RoundIndicatorUp;
