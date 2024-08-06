/* eslint-disable jsx-a11y/role-has-required-aria-props */
/* eslint no-nested-ternary: "error" */
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import DropdownArrow from "@Public/svgs/dropdown-arrow.svg";
import { isMobile } from "react-device-detect";

interface ISelect {
    options: any;
    value: string;
    heading: string;
    onChange: (value: string) => void;
    allOptions?: any;
    iconRender?: any;
    variant?: string;
    label?: string;
    header?: boolean;
    footer?: boolean;
    language: string;
}

const LanguageSelect: FC<ISelect> = ({
    header,
    footer,
    options,
    value,
    onChange,
    variant,
    allOptions,
    iconRender,
    label,
    heading,
    language,
}) => {
    const [expanded, setExpanded] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);

    const handleChange = useCallback(
        (key: string) => {
            onChange(key);
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

    const getStyling = () => {
        let classes = "";
        if (header && isMobile) {
            classes += "w-full ";
        }

        if (footer && isMobile) {
            classes += "bottom-10 ";
        }
        if (footer && !isMobile) {
            classes += "right-5 bottom-10 ";
        }
        return classes;
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", () => setExpanded(false));
        window.addEventListener("scroll", () => setExpanded(false));
    }, [handleClickOutside]);

    return (
        <div className="relative">
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                className={`flex items-center w-full  sm:w-[90%] border border-light border-gray-700 rounded-lg  outline-none  transition-all duration-300 px-3 py-[6px] mr-3 text-left cursor-default focus:outline-none sm:text-sm ${variant}
               
                `}
                onClick={() => {
                    if (Object.keys(options).length > 1) {
                        setExpanded(!expanded);
                    }
                }}
                ref={buttonRef}
            >
                <div className="flex w-full items-center sm:justify-start justify-between">
                    {!!label && (
                        <div className="relative w-full mb-1 ml-3 text-medium font-bold text-xs">
                            {label}
                        </div>
                    )}
                    <div className="flex items-center">
                        {!!iconRender && iconRender(value)}
                        <span
                            className="ml-1 truncate font-medium sm:block text-primary-100 text-sm"
                            data-testid="selected-option"
                        >
                            {allOptions[value]}
                        </span>
                    </div>
                    {!!allOptions && (
                        <>
                            {expanded ? (
                                <DropdownArrow
                                    className={`ml-3 stroke-[#C7CAD9] ${
                                        header ? "rotate-180" : ""
                                    }`}
                                />
                            ) : (
                                <DropdownArrow
                                    className={`ml-3 stroke-[#C7CAD9] ${
                                        !header ? "rotate-180" : ""
                                    }`}
                                />
                            )}
                        </>
                    )}
                </div>
            </button>

            <div
                className={`sm:w-[220px] ${getStyling()}
                absolute mt-1 rounded-lg  bg-gray-100 shadow-lg transition-all duration-100 oddz-select-list style.dropDownWidth ${
                    expanded
                        ? "pointer-events-auto opacity-100"
                        : "opacity-0 pointer-events-none"
                }
            
`}
                style={{ zIndex: 100 }}
                ref={popupRef}
            >
                <ul
                    tabIndex={-1}
                    role="listbox"
                    aria-labelledby="listbox-label"
                    aria-activedescendant="listbox-item-3"
                    className={`relative bg-gray-300 ${
                        footer ? "w-[220px] " : ""
                    } sm:w-[220px]  border-[1.5px] shadow-lg border-primary-300 rounded-lg  text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
                >
                    <li className="w-full bg-gray-400 rounded-t-md font-normal text-base pl-3 text-primary-100 leading-20px h-8 pt-[4px]">
                        {heading}
                    </li>
                    {Object.keys(options).map((key: string) => (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                        <li
                            role="option"
                            key={key}
                            className={`w-[97%] cursor-pointer pl-3 py-[9px] m-1 rounded-lg flex justify-between ${
                                key === language
                                    ? "opacity-50 text-primary-200"
                                    : "text-primary-100 hover:text-primary-100 hover:bg-gray-400 "
                            }`}
                            onClick={() => {
                                handleChange(key);
                            }}
                        >
                            <div className="flex items-center">
                                {!!iconRender && iconRender(key, "h-6 w-6")}
                                <span
                                    className="ml-3 block font-normal truncate "
                                    data-testid="select-option"
                                >
                                    {options[key]}
                                </span>
                            </div>
                            {key === language && (
                                <span className="absolute  text-primary-200 right-1.5">
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
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
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LanguageSelect;
