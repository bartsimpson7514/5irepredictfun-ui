import React from "react";
import { useTranslation } from "react-i18next";

const InputPercentage = ({
    inputRef,
    val,
    setValue,
    parentStyle,
    inputStyle,
    placeholderText,
    percentageStyle,
}) => {
    const { t } = useTranslation();
    return (
        <>
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
                <div
                    className={`${percentageStyle} absolute top-0 bottom-0 h-fit my-auto  right-2 `}
                >
                    %
                </div>
                {val > 100 && (
                    <span className="absolute top-[3rem] w-full left-2 text-down text-xs">
                        {t("Please enter correct percentage")}
                    </span>
                )}
            </div>
        </>
    );
};

export default InputPercentage;
