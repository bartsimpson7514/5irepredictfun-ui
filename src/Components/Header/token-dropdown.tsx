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
import { isMobile } from "react-device-detect";
import { AppState } from "@Redux";
import DropdownArrow from "@Public/svgs/dropdown-arrow.svg";
// import HeaderTooltip from "@Components/Header/header-tooltip";

interface IOptions {
    [key: string]: string | ReactNode;
}

interface ISelect {
    BGNBalance?: number;
    BRBalance?: number;
    // onChange: (value: string) => void;
    variant?: string;
    margin?: boolean;
    nativeBalance?: number;
    selectedTokenBalance?: (balance: number) => void;
    selectedGameToken?: (token: string) => void;
    Tokens: any;
}

const ListItem = ({ icon, description, onSelect }) => {
    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li
            className="flex flex-col hover:dark:bg-sidebar-dark-active cursor-pointer justify-center"
            onClick={onSelect}
        >
            <div className="flex flex-row cursor-pointer text-primary-100 select-none relative sm:py-2 py-1 sm:px-3 px-2 hover:bg-gray-100 dark:hover:bg-gray-300">
                <div className="flex items-center">
                    <img
                        src={`/images/currency/${icon}`}
                        alt={icon}
                        className="h-6 w-6 mr-1"
                    />
                    <span className="ml-1 text-sm dark:text-primary-100">
                        <span>{description}</span>
                    </span>
                </div>
            </div>
        </li>
    );
};

const TokenSelect: FC<ISelect> = ({
    // onChange,
    BGNBalance,
    BRBalance,
    variant,
    margin = true,
    nativeBalance,
    selectedTokenBalance,
    selectedGameToken,
    Tokens,
}) => {
    const balances = {
        BGN: BGNBalance,
        BGR: BRBalance,
        MATIC: nativeBalance,
        BNB: nativeBalance,
        ETH: nativeBalance,
        MNT: nativeBalance,
        tcBNB: nativeBalance,
        tZBC: nativeBalance,
        ZBC: nativeBalance,
        TLOS: nativeBalance,
        SYS: nativeBalance,
    };
    const [expanded, setExpanded] = useState(false);
    const [rectStyle, setRectStyle] = useState({});
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const { isDarkMode, predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );
    const [selectedToken, setSelectedToken] = useState(
        // eslint-disable-next-line array-callback-return
        Tokens.filter(val => {
            if (val.label === String(predictableToken)) return val;
        })[0]
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
        // const rect = buttonRef.current.getBoundingClientRect();

        setRectStyle({
            width: isMobile ? `180px` : `180px`,
            zIndex: "1000",
        });
    }, [expanded]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", () => setExpanded(false));
        window.addEventListener("scroll", () => setExpanded(false));
    }, [handleClickOutside]);

    return (
        <div className={`${margin ? "mt-3" : ""} relative oddz-select w-full`}>
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                className={`w-full cursor-pointer bg-gray-400  items-center flex flex-row gap-2  rounded-xl border-none outline-none transition-all duration-300 h-8 sm:text-sm${variant}`}
                ref={buttonRef}
                onClick={() => setExpanded(!expanded)}
            >
                <span className="flex items-center justify-center cursor-pointer">
                    <img
                        src={`/images/currency/${selectedToken.icon}`}
                        alt={selectedToken.label}
                        className="h-6 w-6"
                    />
                    <span
                        className="sm:ml-1 truncate flex  flex-row items-center gap-1"
                        data-testid="selected-option"
                    >
                        <span className="text-sm leading-4 font-medium text-primary-white ml-1">
                            {`${selectedToken.label}`}
                        </span>
                        {/* <span className="text-xs leading-3 text-primary-100 w-10 overflow-hidden ">
                                {isLoading ? (
                                    <div className="w-40 h-2">
                                        <QuickSwapLoader />
                                    </div>
                                ) : (
                                    Number(balance).toFixed(4)
                                )}
                            </span> */}

                        <DropdownArrow className="absolute right-0 stroke-[#C7CAD9]" />
                    </span>
                </span>
            </button>

            <div
                className={`absolute mt-1 w-full rounded-md  shadow-lg transition-all duration-100  oddz-select-list  ${
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
                    className="max-h-56 bg-gray-100 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                >
                    {React.Children.toArray(
                        Tokens.map(token => (
                            <ListItem
                                {...token}
                                onSelect={() => {
                                    setSelectedToken(token);
                                    selectedTokenBalance(balances[token.label]);
                                    selectedGameToken(token.label);

                                    setExpanded(false);
                                }}
                            />
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TokenSelect;
