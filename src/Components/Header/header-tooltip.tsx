import { AppState } from "@Redux";
import { initialPredictableToken } from "@Utils";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const HeaderTooltip = ({ cancelHandler, proceedHandler }) => {
    const { selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    const tokenName = initialPredictableToken(selectedChainId);

    const { t } = useTranslation();
    return (
        <div className="absolute w-[18rem] sm:w-[14.5rem] transform translate-y-3 -translate-x-4">
            <div className="relative">
                <div className="flex flex-col space-y-2 absolute z-50  p-4 -mt-1 text-sm leading-tight dark:text-primary-100  dark:opacity-90 bg-gray-100 dark:bg-gray-100 rounded-lg shadow-lg">
                    <span
                        className="text-sm   dark:text-primary-100"
                        style={{
                            boxShadow: "rgba(61, 80, 114, 1)",
                        }}
                    >
                        {t("How to use Bhavish protocol")}
                    </span>
                    <span className="text-xs   mt-4">
                        {`Getting Started! Deposit ${tokenName} to receive Bhavish Game Chips (BG) Earn 2.5% APY on your deposited ${tokenName} tokens`}
                    </span>
                    <div className="flex flex-ror justify-between mt-2">
                        <button
                            type="button"
                            onClick={cancelHandler}
                            className="text-xs   dark:text-primary-100"
                        >
                            {t("Cancel")}
                        </button>
                        <button
                            type="button"
                            className="text-xs font-md dark:text-primary-100 bg-footer-text px-2 py-1 rounded-md"
                            onClick={proceedHandler}
                        >
                            {t("Deposit")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderTooltip;
