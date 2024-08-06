/* eslint-disable jsx-a11y/role-has-required-aria-props */
import React from "react";
import NetworkIcon from "@Components/Header/network-icon";
import { NETWORK_NAME } from "@Constants";
import DropdownArrow from "@Public/svgs/dropdown-arrow.svg";
import { handleGaEvent } from "@Utils/googleanalytics";
import { upperCase } from "@Utils/common";

const OnyxNetworkSelect = ({
    margin,
    options,
    expanded,
    buttonRef,
    label,
    setExpanded,
    value,
    rectStyle,
    popupRef,
    handleChange,
    variant,
}) => {
    return (
        <div className={`${margin ? "mt-3" : ""} relative oddz-select`}>
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                className={`flex items-center border border-light w-full border-[#1C1F29] rounded-[12px]  outline-none  transition-all duration-300 px-3 py-[6px] text-left cursor-pointer focus:outline-none sm:text-sm ${variant}`}
                onClick={() => {
                    if (Object.keys(options).length > 1) setExpanded(!expanded);
                }}
                ref={buttonRef}
            >
                {!!label && (
                    <div className="relative w-full mb-1 ml-3 text-medium font-bold text-xs">
                        {label}
                    </div>
                )}
                <NetworkIcon chain={Number(value)} className="w-6 h-6" />
                <span
                    className="ml-1 truncate  font-medium block text-[#FFFFFF] text-sm"
                    data-testid="selected-option"
                >
                    {NETWORK_NAME[value]}
                </span>
                {Object.keys(options).length > 1 && (
                    <DropdownArrow className="ml-3 stroke-[#C7CAD9]" />
                )}
            </button>

            <div
                className={`absolute mt-1 w-full rounded-md  shadow-lg transition-all duration-100 oddz-select-list   ${
                    expanded
                        ? "pointer-events-auto opacity-100"
                        : "opacity-0 pointer-events-none"
                } 
                    `}
                style={rectStyle}
                ref={popupRef}
            >
                <ul
                    tabIndex={-1}
                    role="listbox"
                    aria-labelledby="listbox-label"
                    aria-activedescendant="listbox-item-3"
                    className="p-1 relative bg-gray-300 w-[220px] border-[1.5px] shadow-lg border-gray-400 rounded-md  text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                    {Object.keys(options).map((key: string) => (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                        <li
                            role="option"
                            key={key}
                            className={`w-full cursor-pointer pl-3 py-[9px] rounded-lg flex justify-between ${
                                Number(key) === Number(value)
                                    ? "opacity-30 text-primary-200"
                                    : "text-primary-200 hover:text-primary-100 hover:bg-gray-400 "
                            }`}
                            onClick={() => {
                                handleChange(key);
                                handleGaEvent(
                                    upperCase(`network ${options[key]} clicked`)
                                );
                            }}
                        >
                            <div className="flex items-center">
                                <NetworkIcon
                                    chain={Number(key)}
                                    className="w-6 h-6s"
                                />
                                <span
                                    className="ml-1 block font-normal truncate"
                                    data-testid="select-option"
                                >
                                    {options[key]}
                                </span>
                            </div>
                            {Number(key) === Number(value) && (
                                <span className="flex items-center pr-1 sm:pr-2">
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

export default OnyxNetworkSelect;
