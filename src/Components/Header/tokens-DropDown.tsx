import DropdownArrow from "@Public/svgs/dropdown-arrow.svg";
import { ApplicationModal, updatePredictableToken } from "@Reducers/trade";
import { useBGNUnsupportedModal, useModalOpen } from "@Reducers/trade/hooks";
import { AppState } from "@Redux";
import { TokenSupported } from "@Utils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BGNNotSupportedModal } from "./bgnNotSupportedModal";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ListItem = ({ icon, description, onSelect, isNew, isComingSoon }) => {
    const { predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li
            className={`w-full cursor-pointer pr-10 pl-3 py-[9px] rounded-lg ${
                description === predictableToken
                    ? "bg-token-dropdown-selected text-primary-200"
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
                        {/* {isNew && (
                            <div className="ml-1">
                                <img
                                    src="/images/download.png"
                                    alt={icon}
                                    className=" h-[20px]"
                                />
                            </div>
                        )} */}
                        {isComingSoon && (
                            <div className="ml-1">
                                <img src="/images/coming-soon.png" alt={icon} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-row items-center">
                    {/* <p className="text-sm leading-[20px] font-medium items-start">
                        {Number(returnBalance(label)).toFixed(2)}
                    </p> */}
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

const GTokenSelect = () => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch();
    const { predictableToken, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    const toggleUnsupportedModal = useBGNUnsupportedModal();
    const open = useModalOpen(ApplicationModal.BGN_UNSUPPORTED);

    const Tokens = TokenSupported(selectedChainId);

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

    const [selectedToken, setSelectedToken] = useState(
        Tokens.filter(token => token.label === predictableToken)
    );
    useEffect(() => {
        setSelectedToken(
            Tokens.filter(token => token.label === predictableToken)
        );
    }, [predictableToken]);

    return (
        <div className="w-full oddz-select relative asset">
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                className={`relative cursor-pointer sm:px-2 px-[10px] py-1 rounded-md border-[1.5px] border-sidebar-border    group bg-asset-dropdown  text-sm leading-6 font-normal  h-[38px] w-[130px]
                `}
                ref={buttonRef}
                onClick={() => {
                    if (Tokens.length > 1) setExpanded(!expanded);
                }}
            >
                <span className="flex w-fit items-center justify-left cursor-pointer">
                    <img
                        src={`/images/currency/${selectedToken[0].icon}`}
                        alt={selectedToken[0].label}
                        className="h-5 w-5"
                    />
                    <span
                        className="ml-2 flex  flex-row items-center gap-1 "
                        data-testid="selected-option"
                    >
                        <span className=" text-base font-medium text-asset-text block">
                            {`${predictableToken}`}
                        </span>
                    </span>
                    {Tokens.length > 1 ? (
                        <DropdownArrow
                            className="absolute right-1 text-gray-200 stroke-[#C7CAD9]"
                            stroke="text-gray-500"
                        />
                    ) : null}
                </span>
            </button>

            <div
                className={`absolute mt-1 rounded-md shadow-lg transition-all duration-100  oddz-select-list 
                ${
                    expanded
                        ? "pointer-events-auto opacity-100"
                        : "opacity-0 pointer-events-none"
                }
                  `}
                ref={popupRef}
                style={{ zIndex: "1000" }}
            >
                <ul
                    tabIndex={-1}
                    role="listbox"
                    aria-labelledby="listbox-label"
                    aria-activedescendant="listbox-item-3"
                    className="max-h-56 p-1 relative bg-token-dropdown-section   border-token-dropdown-border  border-[1.5px] shadow-lg  rounded-md  text-base ring-1 ring-black ring-opacity-5  focus:outline-none sm:text-sm"
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
                                            setSelectedToken([token]);
                                            dispatch(
                                                updatePredictableToken(
                                                    token.label
                                                )
                                            );
                                            setExpanded(false);
                                        }
                                    }}
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
        </div>
    );
};

export default GTokenSelect;
