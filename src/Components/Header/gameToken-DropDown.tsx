import { isUserInfoPage } from "@Components/Quests/questhelpers";
import { PREDICT_TOKENS } from "@Constants";
import DropdownArrow from "@Public/svgs/dropdown-arrow.svg";
import { ApplicationModal, updatePredictableToken } from "@Reducers/trade";
import { useBGNUnsupportedModal, useModalOpen } from "@Reducers/trade/hooks";
import { AppState } from "@Redux";
import { TokenSupported, toDecimals } from "@Utils";
import { getChainId } from "@Utils/common";
import { useWeb3React } from "@web3-react/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BGNNotSupportedModal } from "./bgnNotSupportedModal";

const ListItem = ({
    label,
    icon,
    description,
    isNew,
    isComingSoon,
    onSelect,
    returnBalance,
}) => {
    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );
    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li
            className={`w-full cursor-pointer pr-9 pl-3 py-[9px] rounded-lg ${
                description === predictableToken
                    ? "text-primary-200 bg-token-dropdown-selected"
                    : "text-primary-200 hover:text-primary-100 hover:bg-token-dropdown-selected "
            }`}
            onClick={onSelect}
        >
            <div className="flex flex-row justify-between cursor-pointer select-none">
                <div className="flex flex-row items-center justify-between">
                    <img
                        src={`/images/currency/${icon}`}
                        alt={icon}
                        className="h-6 w-6 mr-2"
                    />
                    <div className="flex flex-row items-center">
                        <span className=" font-medium ">{description}</span>
                        {isNew && (
                            <div className="ml-1">
                                <img
                                    src="/images/download.png"
                                    alt={icon}
                                    className="w-[30px] h-[20px]"
                                />
                            </div>
                        )}
                        {isComingSoon && (
                            <div className="ml-1">
                                <img src="/images/coming-soon.png" alt={icon} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-row items-center">
                    {!isComingSoon && (
                        <p className="text-sm leading-[20px] font-medium items-start">
                            {Number(returnBalance(label)).toFixed(2)}
                        </p>
                    )}
                    {description === predictableToken && (
                        <span className="absolute right-2 text-primary-200">
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
                </div>
            </div>
        </li>
    );
};

const GameTokenSelect = () => {
    const dispatch = useDispatch();
    const { account, chainId: chainIDVal } = useWeb3React();
    const {
        predictableToken,
        nativeBalance,
        bgnBalance,
        selectedChainId,
    } = useSelector((state: AppState) => state.prediction);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [expanded, setExpanded] = useState(false);
    const [chainId, setChainId] = useState(0);
    const [Tokens, setTokens] = useState(TokenSupported(chainId));
    const [selectedToken, setSelectedToken] = useState(
        Tokens.filter(token => token.label === predictableToken)
    );
    const toggleUnsupportedModal = useBGNUnsupportedModal();
    const open = useModalOpen(ApplicationModal.BGN_UNSUPPORTED);

    const getChain = async () => {
        const chainIdVal = await getChainId();
        setChainId(chainIdVal);
    };

    useEffect(() => {
        if (!account) {
            getChain();
        } else {
            setChainId(chainIDVal);
        }
    }, []);

    const returnBalance = token => {
        if (token === PREDICT_TOKENS.BGN) return bgnBalance;
        return nativeBalance;
    };
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

    useEffect(() => {
        setTokens(TokenSupported(selectedChainId));
    }, [selectedChainId]);

    useEffect(() => {
        setSelectedToken(
            Tokens.filter(token => token.label === predictableToken)
        );
        setTokens(TokenSupported(selectedChainId));
    }, [Tokens.toString(), predictableToken]);

    return (
        <div className="w-full oddz-select relative asset">
            {selectedToken.length > 0 && (
                <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded="true"
                    aria-labelledby="listbox-label"
                    className={`relative cursor-pointer w-fit sm:px-2 px-[10px] py-[9px] rounded-large border-[1.5px] border-sidebar-border  group bg-token-dropdown  text-sm leading-6 font-normal ${
                        isUserInfoPage() ? "" : ""
                    }`}
                    ref={buttonRef}
                    onClick={() => setExpanded(!expanded)}
                >
                    <span className="flex w-fit items-center justify-left cursor-pointer">
                        <img
                            src={`/images/currency/${selectedToken[0].icon}`}
                            alt={selectedToken[0].label}
                            className="w-6 h-6"
                        />
                        <span
                            className="ml-[4px] flex  flex-row items-center gap-1 mr-2"
                            data-testid="selected-option"
                        >
                            <span className=" text-base font-medium text-asset-text hidden sm:block">
                                {`${predictableToken}`}
                            </span>
                            {!isUserInfoPage() && (
                                <span className="text-xs font-medium text-primary-200 ml-1">
                                    {toDecimals(
                                        Number(
                                            returnBalance(
                                                selectedToken[0].label
                                            )
                                        ),
                                        4
                                    )}
                                </span>
                            )}
                        </span>
                        {Tokens.length > 1 && (
                            <DropdownArrow className="text-gray-200 stroke-[#C7CAD9]" />
                        )}
                    </span>
                </button>
            )}

            {Tokens.length > 1 && (
                <div
                    className={`absolute mt-1 rounded-md s transition-all duration-100  oddz-select-list 
                ${
                    expanded
                        ? "pointer-events-auto opacity-100"
                        : "opacity-0 pointer-events-none"
                }
               right-0
                  `}
                    ref={popupRef}
                    style={{ zIndex: "1000" }}
                >
                    <ul
                        tabIndex={-1}
                        role="listbox"
                        aria-labelledby="listbox-label"
                        aria-activedescendant="listbox-item-3"
                        className="max-h-56 p-1 relative bg-token-dropdown-section w-[230px] border-[1.5px]  border-token-dropdown-border rounded-md  text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                        {React.Children.toArray(
                            Tokens.map(token => (
                                <div>
                                    <ListItem
                                        {...token}
                                        onSelect={() => {
                                            if (token.isComingSoon) {
                                                toggleUnsupportedModal();
                                            } else if (
                                                token.description !==
                                                predictableToken
                                            ) {
                                                dispatch(
                                                    updatePredictableToken(
                                                        token.label
                                                    )
                                                );
                                                setExpanded(false);
                                                // window.location.reload();
                                            }
                                        }}
                                        returnBalance={returnBalance}
                                    />
                                </div>
                            ))
                        )}
                    </ul>
                    <BGNNotSupportedModal
                        open={open}
                        onClose={toggleUnsupportedModal}
                    />
                </div>
            )}
        </div>
    );
};

export default GameTokenSelect;
