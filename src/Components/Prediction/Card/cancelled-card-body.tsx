import { USDC_DECIMAL } from "@Constants";
import { toDecimals } from "@Utils";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";

const CancelledCardbody = ({ upPredictAmount, downPredictAmount }) => {
    const { t } = useTranslation();
    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );

    return (
        <div className="bg-primary-card-200   bg-footer-text-blue p-4">
            <div className="flex flex-row justify-between mb-1.5">
                <div className="flex text-primary-100 items-center    text-sm leading-4">
                    {t("Closed Price")}
                </div>
                <div className="flex flex-row items-center">
                    <span className="text-xl leading-2 font-semibold   text-primary-100">
                        ----
                    </span>
                </div>
            </div>
            <div className="flex justify-end text-sm">
                <div className={` flex flex-row p-1 items-center rounded-sm`}>
                    <div className="pl-0.5 text-primary-white text-xs leading-[14px]">
                        ---
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-between mt-4">
                <div className="text-primary-100 text-sm leading-4">
                    {t("Locked Price")}
                </div>
                <div className="flex flex-row items-center">
                    <span className="  text-primary-100 text-sm leading-4 font-semibold">
                        ---
                    </span>
                </div>
            </div>

            <div className="flex flex-col justify-between mt-4">
                <div className="text-primary-100 text-sm leading-4">
                    {t("Commit Amt")}
                </div>

                <div className="flex flex-row justify-between mt-1">
                    <div className="text-primary-100 text-xs leading-4">
                        {t("Up")}
                    </div>

                    <div className="flex flex-row items-center">
                        <span className="  text-primary-100 text-sm leading-4 font-semibold">
                            {Number(upPredictAmount) > 0
                                ? `
                                ${toDecimals(upPredictAmount / USDC_DECIMAL)} 
                                  ${predictableToken}`
                                : "---"}
                        </span>
                    </div>
                </div>
                <div className="flex flex-row justify-between mt-1">
                    <div className="text-primary-100 text-xs leading-4 text-opacity-72">
                        {t("Down")}
                    </div>

                    <div className="flex flex-row items-center">
                        <span className="  text-primary-100 text-sm leading-4 font-semibold">
                            {Number(downPredictAmount) > 0
                                ? `${toDecimals(
                                      downPredictAmount / USDC_DECIMAL
                                  )} ${predictableToken}`
                                : "---"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between mt-4">
                <div className="text-primary-100 text-sm leading-4 text-opacity-72">
                    <span className="text-sm leading-4 whitespace-nowrap">
                        {t("Funding Pool")}
                    </span>
                </div>
                <div className="flex flex-row items-center">
                    <span className=" text-primary-100 font-semibold text-sm leading-4">
                        ---
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CancelledCardbody;
