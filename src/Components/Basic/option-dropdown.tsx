/* eslint-disable jsx-a11y/role-has-required-aria-props */
import React, {
    FC,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { handleGaEvent } from "@Utils/googleanalytics";
import DropdownArrow from "@Public/svgs/dropdown-arrow.svg";
import { upperCase } from "@Utils/common";

interface ISelect {
    options: any;
    value: string | number;
    label?: string;
    onChange: (value: string) => void;
    variant?: string;
    showIcon: boolean;
    iconRender?: (t: string | number) => ReactNode;
}

const DropdownSelect: FC<ISelect> = ({
    options,
    value,
    onChange,
    label,
    variant,
    showIcon,
    iconRender,
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
            zIndex: "1000",
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
                className={`relative w-full  items-center flex justify-between gap-2 outline-none transition-all duration-300 cursor-default focus:outline-none ${variant}`}
                ref={buttonRef}
                onClick={() => setExpanded(!expanded)}
            >
                <span className="flex items-center justify-center gap-2">
                    {!!label && (
                        <div className="relative w-full mb-1 ml-3 text-medium font-bold text-xs">
                            {label}
                        </div>
                    )}
                    {showIcon && iconRender(value)}
                    <span
                        className="truncate text-highlight  flex flex-row items-center"
                        data-testid="selected-option"
                    >
                        <span className="text-sm leading-4 font-medium text-primary-100">
                            {`${options[value]}`}
                        </span>
                    </span>
                </span>
                <span className="absolute right-4 inset-y-0  flex items-center cursor-pointer">
                    <DropdownArrow className="stroke-[#C7CAD9]" />
                </span>
            </button>

            <div
                className={`absolute mt-1 w-full rounded-md shadow-lg transition-all duration-100 ${
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
                    className="max-h-56 bg-gray-300 rounded-md  text-base text-primary-100 py-4 overflow-auto focus:outline-none sm:text-sm"
                >
                    {Object.keys(options).map((key: string) => (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                        <li
                            role="option"
                            key={key}
                            className="text-primary-100  cursor-default select-none relative px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-300 transition-all duration-300 li-option"
                            onClick={() => {
                                handleChange(key);
                                handleGaEvent(upperCase(`${key} clicked`));
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className={`${
                                        showIcon ? "block" : "hidden"
                                    } sm:mr-3`}
                                >
                                    {showIcon && iconRender(key)}
                                </div>
                                <span
                                    className="block font-normal truncate"
                                    data-testid="select-option"
                                >
                                    {`${options[key]}`}
                                </span>
                            </div>
                            {key === value && (
                                <span className="absolute inset-y-0 right-4 flex items-center">
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

export default DropdownSelect;
