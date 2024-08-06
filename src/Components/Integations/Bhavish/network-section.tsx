/* eslint-disable jsx-a11y/role-has-required-aria-props */
import React, {
    FC,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import NetworkIcon from "@Components/Header/network-icon";
import { NETWORK_NAME } from "@Constants";

interface IOptions {
    [key: string]: string | ReactNode;
}

interface ISelect {
    options: IOptions;
    value: string;
    label?: string;
    onChange: (value: string) => void;
    variant?: string;
    margin?: boolean;
}

const NetworkSelect: FC<ISelect> = ({
    options,
    value,
    onChange,
    label,
    variant,
    margin = true,
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
        const rect = buttonRef.current.getBoundingClientRect();

        setRectStyle({
            width: `${rect.width}px`,
        });
    }, [expanded]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", () => setExpanded(false));
        window.addEventListener("scroll", () => setExpanded(false));
    }, [handleClickOutside]);

    return (
        <div className={`${margin ? "mt-3" : ""} relative oddz-select`}>
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                className={`relative w-full bg-white dark:bg-primary-dark border border-light dark:border-gray-700 focus:bg-chosen rounded-lg focus:border-primary-150 outline-none h-10 transition-all duration-300 pl-2 pr-8 sm:pr-10 py-2 text-left cursor-default focus:outline-none sm:text-sm ${variant}`}
                onClick={() => setExpanded(!expanded)}
                ref={buttonRef}
            >
                <span className="flex items-center justify-center">
                    {!!label && (
                        <div className="relative w-full mb-1 ml-3 text-medium font-bold text-xs">
                            {label}
                        </div>
                    )}
                    <NetworkIcon chain={Number(value)} className="w-6 h-6" />
                    <span
                        className="ml-3 block truncate hidden sm:block dark:text-tooltip-text"
                        data-testid="selected-option"
                    >
                        {NETWORK_NAME[value]}
                    </span>
                </span>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
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
                    className="max-h-56 bg-white dark:bg-dark-chosen rounded-md py-1 text-base dark:text-tooltip-text ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm z-[1000]"
                >
                    {Object.keys(options).map((key: string) => (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                        <li
                            role="option"
                            key={key}
                            className={`text-gray-900 dark:text-tooltip-text cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 dark:hover:bg-primary-dark transition-all duration-300 li-option ${
                                Number(key) === 3 ? "border-t-2" : ""
                            }`}
                            onClick={() => handleChange(key)}
                        >
                            <div className="flex items-center">
                                <NetworkIcon
                                    chain={Number(key)}
                                    className="w-6 h-6"
                                />
                                <span
                                    className="ml-3 block font-normal truncate"
                                    data-testid="select-option"
                                >
                                    {options[key]}
                                </span>
                            </div>
                            {Number(key) === Number(value) && (
                                <span className="absolute inset-y-0 right-0 flex items-center pr-1 sm:pr-4">
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

export default NetworkSelect;
