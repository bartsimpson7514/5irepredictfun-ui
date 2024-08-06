import React from "react";
import NoPredicition from "@Public/svgs/QuickSwap/NoPredicition";
import { useTranslation } from "react-i18next";

const ProfileNotFound = () => {
    const { t } = useTranslation();
    return (
        <>
            <div
                className="w-full flex items-center justify-center flex-col"
                style={{ height: "360px" }}
            >
                <NoPredicition />
                <span className="text-primary-200 mt-6 text-sm text-center">
                    {t("You havenot predicted anything yet")}
                    <br />
                    {t(
                        "Start to Predict and you can see your history information here"
                    )}
                </span>
            </div>
        </>
    );
};

export default ProfileNotFound;
