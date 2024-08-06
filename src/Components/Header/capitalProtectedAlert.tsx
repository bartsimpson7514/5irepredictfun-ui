import InfoMessage from "@Basic/InfoMessage";
import React from "react";
import { useTranslation } from "react-i18next";

const CapitalProtectedAlert = () => {
    const { t } = useTranslation();
    return (
        <InfoMessage>
            <div className="text-sm text-primary-100">
                {t("CapitalProtectionWithBnb ")}
                <a
                    href="https://medium.com/bhavish-finance/bhavish-capital-protected-lossless-predictions-user-guide-78ae99f198f8"
                    target="_blank"
                    className=" text-sm text-primary-white underline"
                    rel="noreferrer"
                >
                    {t("Click here")}
                </a>
                .
            </div>
        </InfoMessage>
    );
};

export default CapitalProtectedAlert;
