import { updateShowAlert } from "@Reducers/trade";
import { upperCase } from "@Utils/common";
import { handleGaEvent } from "@Utils/googleanalytics";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import ZebecAlertMessage from "./AlertMessage";

const Alert = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    return (
        <ZebecAlertMessage
            className="mt-4"
            close={() => {
                dispatch(updateShowAlert(false));
            }}
        >
            <div className="text-[8px] leading-4 mr-12 sm:mr-0 text-asset-text">
                {t("Quickswap_Text")}
                <a
                    href="https://docs.bhavish.fi/bhavish/"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleGaEvent(upperCase("GITBOOK"))}
                >
                    <span className="text-[#E0AE1F] font-bold underline underline-offset-4">
                        {t("Gitbook ")}
                    </span>
                </a>
                {t("more_details ")}
                <span
                    role="link"
                    tabIndex={0}
                    onClick={() => handleGaEvent(upperCase("terms of use"))}
                >
                    <span className="text-[#E0AE1F] font-bold underline underline-offset-4">
                        {t("Terms of Use")}
                    </span>
                </span>
                .
            </div>
        </ZebecAlertMessage>
    );
};

export default Alert;
