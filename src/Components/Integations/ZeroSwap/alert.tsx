import { updateShowAlert } from "@Reducers/trade";
import { upperCase } from "@Utils/common";
import { handleGaEvent } from "@Utils/googleanalytics";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import ZeroSwapAlertMessage from "./AlertMessage";

const Alert = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    return (
        <ZeroSwapAlertMessage
            className="mt-4"
            close={() => {
                dispatch(updateShowAlert(false));
            }}
        >
            <div className=" sm:text-sm text-xs mr-12 sm:mr-0 text-asset-text">
                {t("Quickswap_Text")}
                <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleGaEvent(upperCase("GITBOOK"))}
                >
                    <span className="text-asset-text font-bold underline underline-offset-4">
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
                    <span className="text-asset-text font-bold underline underline-offset-4">
                        {t("Terms of Use")}
                    </span>
                </a>
                .
            </div>
        </ZeroSwapAlertMessage>
    );
};

export default Alert;
