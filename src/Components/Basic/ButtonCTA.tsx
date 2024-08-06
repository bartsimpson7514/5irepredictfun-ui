import React from "react";
import { useTranslation } from "react-i18next";

const ButtonCTA = ({ buttonFunction, variant, text, isDisable = false }) => {
    const { t } = useTranslation();
    return (
        <button
            type="button"
            className={` items-center flex  justify-center ${variant}`}
            onClick={() => {
                buttonFunction();
            }}
            disabled={isDisable}
        >
            {t(text)}
        </button>
    );
};

export default ButtonCTA;
