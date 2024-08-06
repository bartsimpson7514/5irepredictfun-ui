/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import NoPredicition from "@Public/svgs/QuickSwap/NoPredicition";
import { Trans, useTranslation } from "react-i18next";

const HistoryNotFound = () => {
    const { t } = useTranslation();
    return (
        <>
            <div
                className="w-full flex items-center justify-center flex-col"
                style={{ height: "360px" }}
            >
                <NoPredicition />

                <Trans i18nKey="no-history">
                    <span className="text-primary-200 mt-6 text-sm text-center">
                        {t("You havenot predicted anything yet")}
                    </span>
                    <span className="text-primary-200 text-sm text-center">
                        <br />
                        {t(
                            "Start to Predict and you can see your history information here"
                        )}
                    </span>
                </Trans>
            </div>
        </>
    );
};

export default HistoryNotFound;
