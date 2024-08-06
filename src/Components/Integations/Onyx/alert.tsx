import { updateShowAlert } from "@Reducers/trade";
import { upperCase } from "@Utils/common";
import { handleGaEvent } from "@Utils/googleanalytics";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import OnyxAlertMessage from "./AlertMessage";

const Alert = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    return (
        <OnyxAlertMessage
            className="mt-4"
            close={() => {
                dispatch(updateShowAlert(false));
            }}
        >
            <div className=" text-[10px] leading-[18px]  mr-12 sm:mr-0 text-asset-text">
                {t("Quickswap_Text")}
                <a
                    href="https://docs.bhavish.fi/bhavish/"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleGaEvent(upperCase("GITBOOK"))}
                >
                    <span className="text-[#217BF4] font-bold underline underline-offset-2">
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
                    <span className="text-[#217BF4] font-bold underline underline-offset-2">
                        {t("Terms of Use")}
                    </span>
                </a>
                .
            </div>
        </OnyxAlertMessage>
    );
};

export default Alert;
