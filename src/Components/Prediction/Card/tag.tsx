/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { useTranslation } from "react-i18next";

const Tag = ({ icon, cssstyle, text }) => {
    const { t } = useTranslation();
    return (
        <div
            className={`${cssstyle} px-2 flex items-center justify-center gap-0.5`}
            style={{
                borderRadius: "0px 0px 10px 10px",
                paddingTop: "5px",
                paddingBottom: "5px",
            }}
        >
            <div>{icon}</div>
            <div className="text-sm leading-4 font-normal">{t(text)}</div>
        </div>
    );
};

export default Tag;
