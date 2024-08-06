/* eslint-disable jsx-a11y/role-has-required-aria-props */
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import DropdownArrow from "@Public/svgs/dropdown-arrow.svg";
import { handleGaEvent } from "@Utils/googleanalytics";
import { upperCase } from "@Utils/common";
import { useTranslation } from "react-i18next";

interface ISelect {
    options: any;
    value: string;
    onChange: (value: string) => void;
    allOptions?: any;
    iconRender?: any;
    variant?: string;
    showText?: boolean;
    showBackground?: boolean;
    // margin?: boolean;
    // label?: string;
    style: any;
}

const HeadingSelect: FC<ISelect> = ({
    options,
    value,
    onChange,
    variant,
    allOptions,
    iconRender,
    showText,
    showBackground,
    // label,
    style,
    // margin = true,
}) => {
    const [expanded, setExpanded] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const { t } = useTranslation();

    const handleChange = useCallback(
        (key: string) => {
            onChange(key);
            handleGaEvent(upperCase(`${key} asset selected`));
            setExpanded(false);
        },
        [onChange]
    );

    const handleClickOutside = useCallback(
        (event: any) => {
            if (
                expanded &&
                buttonRef.current &&
                popupRef.current &&
                !buttonRef.current.contains(event.target) &&
                !popupRef.current.contains(event.target)
            ) {
                setExpanded(false);
            }
        },
        [expanded]
    );

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", () => setExpanded(false));
        window.addEventListener("scroll", () => setExpanded(false));
    }, [handleClickOutside]);

    return (
        <>
            <div
                className={`relative cursor-pointer oddz-select bg-asset-dropdown flex items-center justify-between  px-3 py-[6px] gap-2 rounded-[40px] ${
                    showBackground ? "bg-asset-dropdown" : ""
                } `}
            >
                {!!iconRender && iconRender(value, "h-[40px] w-[36px] z-10")}

                <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded="true"
                    aria-labelledby="listbox-label"
                    className={`w-full relative bg-none items-center flex justify-between border-none outline-none gap-2 transition-all duration-300 text-left cursor-pointer focus:outline-none sm:text-sm ${variant}`}
                    style={style}
                    onClick={() => {
                        if (Object.keys(options).length > 1) {
                            setExpanded(!expanded);
                        }
                    }}
                    ref={buttonRef}
                >
                    <span className="flex items-center justify-start cursor-pointer">
                        {isMobile && !showText ? (
                            ""
                        ) : (
                            <div className="flex flex-col justify-between text-sm font-medium gap-[2px]">
                                <span className="flex text-xs text-primary-200 break-normal whitespace-nowrap ">
                                    {t("Asset")}
                                    <span className="sm:block hidden">
                                        {t("Type")}
                                    </span>
                                </span>
                                <div className="relative text-sm font-medium text-asset-text">
                                    {options[value]?.[1]}
                                </div>
                            </div>
                        )}

                        {!!allOptions && (
                            <span
                                className="block truncate text-asset-text"
                                data-testid="selected-option"
                            >
                                {allOptions[value]}
                            </span>
                        )}
                    </span>
                    {Object.keys(options).length > 1 && (
                        <span className=" inset-y-0 mt-1  font-medium flex items-center pointer-events-none">
                            {expanded ? (
                                <DropdownArrow className="rotate-180 stroke-[#C7CAD9]" />
                            ) : (
                                <DropdownArrow className="stroke-[#C7CAD9]" />
                            )}
                        </span>
                    )}
                </button>

                <div
                    className={`absolute rounded-md bg-token-dropdown-section transition-all duration-100 z-50 top-14 ${
                        expanded
                            ? "pointer-events-auto opacity-100"
                            : "opacity-0 pointer-events-none"
                    }
                    `}
                    style={{ zIndex: 100, width: "175px" }}
                    ref={popupRef}
                >
                    <ul
                        tabIndex={-1}
                        role="listbox"
                        aria-labelledby="listbox-label"
                        aria-activedescendant="listbox-item-3"
                        className="max-h-56  rounded-md p-1  bg-token-dropdown-section border-token-dropdown-border border-[1.5px]  w-[200px] text-base text-primary-100 ring-1 ring-black ring-opacity-20  focus:outline-none sm:text-sm"
                    >
                        {React.Children.toArray(
                            Object.keys(options).map((key: string) => (
                                <div>
                                    <li
                                        role="option"
                                        key={key}
                                        className={`cursor-pointer rounded-sm  select-none relative py-2 px-2 transition-all duration-300 li-option ${
                                            Number(key) === 3
                                                ? "border-t-2"
                                                : ""
                                        }
                                    ${
                                        value === key
                                            ? "text-primary-200 bg-token-dropdown-selected"
                                            : "text-primary-200 hover:text-primary-100 hover:bg-token-dropdown-selected"
                                    }
                                    `}
                                        onClick={() => handleChange(key)}
                                    >
                                        <div className="flex items-center">
                                            {!!iconRender &&
                                                iconRender(key, "w-[21px] h-6")}
                                            <span
                                                className="ml-2 block font-normal truncate"
                                                data-testid="select-option"
                                            >
                                                {options[key]?.[1]}
                                            </span>
                                        </div>

                                        {value === key && (
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 fill-primary-200">
                                                <svg
                                                    className="h-5 w-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                        )}
                                    </li>
                                </div>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default HeadingSelect;
