import React from "react";
import TooltipArrow from "@Public/svgs/tooltipArrow.svg";
import { updateShowAssetToolTip } from "@Reducers/trade";
import CloseIcon from "@Public/svgs/close.svg";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const AssetTooltip = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    return (
        <div className="absolute w-[11.5rem] transform right-0 top-0 translate-x-48">
            <div className="relative w-full">
                <TooltipArrow className="absolute z-10 w-6 h-6 dark:text-gray-100 text-gray-100 left-0 top-0  transform -translate-x-4 translate-y-3 fill-current stroke-current" />
                <div className="flex absolute z-10  p-2 -mt-1 text-sm leading-tight dark:text-primary-100 bg-gray-100 dark:opacity-90 dark:bg-gray-100 rounded-lg shadow-lg">
                    <span
                        style={{
                            boxShadow: "rgba(61, 80, 114, 1)",
                            fontWeight: "normal",
                            fontSize: "12px",
                        }}
                    >
                        {t("View predicting assets here")}
                    </span>
                    <span className="pb-1">
                        <button
                            type="button"
                            className="text-lg outline-none focus:outline-none hover:text-gray-400 transition-all duration-300"
                            onClick={() => {
                                dispatch(updateShowAssetToolTip(false));
                            }}
                        >
                            <CloseIcon className="h-4 w-4" />
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
};
export default AssetTooltip;
