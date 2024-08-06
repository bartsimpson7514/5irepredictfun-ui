import { updateShowAlert } from "@Reducers/trade";
import { upperCase } from "@Utils/common";
import { handleGaEvent } from "@Utils/googleanalytics";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import QuickSwapAlertMessage from "./AlertMessage";

const Alert = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    return (
        <QuickSwapAlertMessage
            className="mt-4"
            close={() => {
                dispatch(updateShowAlert(false));
            }}
        >
            <div className=" sm:text-sm text-xs text-tooltip-text">
                {t("Quickswap_Text")}
                <a
                    href="https://docs.bhavish.fi/bhavish/"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleGaEvent(upperCase("GITBOOK"))}
                >
                    <span className="text-primary-blue font-medium underline underline-offset-4">
                        {t("Gitbook ")}
                    </span>
                </a>
                {t("more_details ")}
                <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleGaEvent(upperCase("terms of use"))}
                >
                    <span className="text-primary-blue font-medium underline underline-offset-4">
                        {t("Terms of Use")}
                    </span>
                </a>
                .
            </div>
        </QuickSwapAlertMessage>
    );
};

export default Alert;
