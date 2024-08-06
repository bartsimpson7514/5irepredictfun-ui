/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { useTranslation } from "react-i18next";

const HeaderIcon = ({ icon, text }) => {
    const { t } = useTranslation();
    return (
        <div className="flex gap-1 items-center justify-center">
            <div className="stroke-asset-text">{icon}</div>
            <div className="leading-4 text-base font-normal text-asset-text text-highlight uppercase">
                {t(text)}
            </div>
        </div>
    );
};

export default HeaderIcon;
