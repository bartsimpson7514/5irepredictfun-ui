import React, { useCallback, useEffect, useRef, useState } from "react";
import DownArrow from "@Public/svgs/arrow.svg";

const DropDown = ({
    options,
    value,
    onChange,
    variant,
    dropDownStyle,
    dropDownOptionStyle,
    dropDownOptionSelectedStyle,
    dropDownOptionNonSelectedStyle,
}) => {
    const [expanded, setExpanded] = useState(false);
    const [rectStyle, setRectStyle] = useState({});
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

    useEffect(() => {
        if (!buttonRef.current) return;

        setRectStyle({
            width: `${buttonRef.current.clientWidth * 1.2}px`,
        });
    }, [expanded]);

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
                className={`relative outline-none transition-all duration-300  text-left cursor-default focus:outline-none ${variant}`}
                onClick={() => setExpanded(!expanded)}
                ref={buttonRef}
            >
                <span className="flex  items-center justify-start gap-4 flex-row">
                    <span
                        className={`block truncate ${dropDownStyle}`}
                        data-testid="selected-option"
                    >
                        {options[value]}
                    </span>

                    <span className="flex items-center pointer-events-none">
                        <DownArrow className="h-2 w-3 fill-asset-text" />
                    </span>
                </span>
            </button>

            <div
                className={`absolute mt-1 w-full rounded-md  shadow-lg transition-all duration-100 z-50 oddz-select-list  ${
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
                    style={{
                        boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.25)",
                    }}
                    className={`max-h-56  rounded-md py-1  ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none ${dropDownOptionStyle}`}
                >
                    {Object.keys(options).map((key: string) => (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                        <li
                            role="option"
                            key={key}
                            aria-selected="true"
                            className=" cursor-default select-none relative py-2 pl-3 pr-9  transition-all duration-300 li-option dark:hover:bg-gray-300"
                            onClick={() => handleChange(key)}
                        >
                            <div className="flex items-center">
                                <span
                                    className={`ml-3 block font-medium text-sm truncate leading-4 ${
                                        value === key
                                            ? `${dropDownOptionSelectedStyle}`
                                            : `${dropDownOptionNonSelectedStyle}`
                                    }`}
                                    data-testid="select-option"
                                >
                                    {options[key]}
                                </span>
                            </div>

                            {value === key && (
                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 fill-green-300">
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
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DropDown;
