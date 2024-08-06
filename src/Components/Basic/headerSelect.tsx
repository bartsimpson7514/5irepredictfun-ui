/* eslint-disable jsx-a11y/role-has-required-aria-props */
import React, {
    FC,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import DownArrow from "@Public/svgs/arrow.svg";
import { AppState } from "../../Redux";

interface IOptions {
    [key: string]: string | ReactNode;
}

interface IHeaderSelect {
    options: IOptions;
    value?: string;
    label?: string;
    onChange: (value: string) => void;
    variant?: string;
    margin?: boolean;
}

const HeaderSelect: FC<IHeaderSelect> = ({
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
    const { isDarkMode } = useSelector((state: AppState) => state.prediction);

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
            // width: `${rect.width}px`,
            width: `150px`,
        });
    }, [expanded]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", () => setExpanded(false));
        window.addEventListener("scroll", () => setExpanded(false));
    }, [handleClickOutside]);
    const { t } = useTranslation();

    return (
        <div
            className={`${margin ? "mt-4 mb-4" : ""} 
        relative oddz-select`}
        >
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                className={`relative   rounded-md focus:border-primary-150 outline-none transition-all duration-300  text-left cursor-default focus:outline-none sm:text-sm ${variant}`}
                onClick={() => setExpanded(!expanded)}
                ref={buttonRef}
            >
                <span className="flex  items-center justify-start gap-1 flex-row">
                    {options[value] ? (
                        <>
                            <span
                                className=" text-sm font-medium block truncate text-primary-100 dark:text-primary-100"
                                data-testid="selected-option"
                            >
                                {options[value]}
                            </span>
                            <span className="flex items-center pointer-events-none pl-1">
                                <DownArrow className="h-9 w-3 stroke-cards-live-border" />
                            </span>
                        </>
                    ) : (
                        <>
                            <div className="text-primary-200 text-xs font-medium">
                                {t(label)}
                            </div>
                            <span className="flex items-center pointer-events-none pl-1">
                                <DownArrow className="h-9 w-3 stroke-cards-live-border" />
                            </span>
                        </>
                    )}
                </span>
            </button>

            <div
                className={`absolute mt-1 w-full rounded-md  shadow-lg transition-all duration-100 z-50 oddz-select-list ${
                    isDarkMode ? "dark" : ""
                } ${
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
                    style={{ boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.25)" }}
                    className="p-1 relative bg-token-dropdown-section border-[1.5px] shadow-lg border-token-dropdown-border rounded-md  text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                    {Object.keys(options).map((key: string) => (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                        <li
                            role="option"
                            key={key}
                            className="w-full cursor-pointer pr-9 pl-3 py-[9px] rounded-lg text-primary-200 hover:text-primary-100 hover:bg-token-dropdown-selected"
                            onClick={() => handleChange(key)}
                        >
                            <div className="flex items-center">
                                <span
                                    className={`ml-3 block font-medium text-xs truncate  ${
                                        value === key
                                            ? "text-primary "
                                            : "text-primary-100 dark:text-primary-100"
                                    }`}
                                    data-testid="select-option"
                                >
                                    {options[key]}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HeaderSelect;
