import React from "react";
import { useTranslation } from "react-i18next";

const InputWithMax = ({
    inputRef,
    val,
    setValue,
    maxVal,
    parentStyle,
    inputStyle,
    maxButtonStyle,
    placeholderText,
}) => {
    const { t } = useTranslation();
    return (
        <div className={`${parentStyle}`}>
            <input
                className={`${inputStyle}`}
                type="text"
                ref={inputRef}
                onKeyPress={event => {
                    if (!/[0-9.]/.test(event.key)) {
                        event.preventDefault();
                    }
                }}
                value={val}
                placeholder={placeholderText}
                onChange={(ev: any) => {
                    setValue(ev.target.value);
                    // getNetworkFees();
                }}
            />
            <button
                type="button"
                className={`${maxButtonStyle} focus:outline-none  outline-none items-center justify-center transition-all duration-300 absolute flex top-0 bottom-0 h-fit my-auto right-2 `}
                onClick={() => {
                    setValue(Number(maxVal));
                }}
            >
                {t("Max")}
            </button>
        </div>
    );
};

export default InputWithMax;
