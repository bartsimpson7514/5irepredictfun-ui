/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
    useModalOpen,
    useToggleLanguageNetworkModalToggle,
} from "@Redux/Reducers/trade/hooks";
import { ApplicationModal } from "@Redux/Reducers/trade";
import LanguageNetworkModal from "@Components/Header/language-network-modal";
import DropdownArrow from "@Public/svgs/dropdown-arrow.svg";

const OnyxTokenSection = ({
    t,
    account,
    handleShowModal,
    isMobile,
    handleGaEvent,
    fullConfig,
    showInfo,
    chainId,
    shortenAddressWithLessCharacters,
}) => {
    const open = useModalOpen(ApplicationModal.LANGUAGE);

    const toggleLanguageModal = useToggleLanguageNetworkModalToggle();

    return (
        <div className="flex gap-2 items-center sm:ml-3">
            {!account && (
                <div>
                    <button
                        type="button"
                        id="connect-wallet"
                        data-testid="connect-wallet"
                        className="w-full text-wallet-text text-sm outline-none rounded-xl focus:outline-none transition-all duration-300 bg-footer-text px-4 py-[8px] hover:bg-opacity-90 flex items-center"
                        onClick={() => {
                            handleShowModal();
                            isMobile
                                ? handleGaEvent("CONNECT CLICKED")
                                : handleGaEvent("CONNECT WALLET CLICKED");
                        }}
                    >
                        <span className="text-base whitespace-nowrap font-bold text-[#FFFFFF]">
                            {t(showInfo())}
                        </span>
                    </button>
                </div>
            )}
            {account && chainId && (
                <div className="flex flex-row gap-4 justify-between bg-[#1C1F29]  p-2 rounded-[12px]">
                    <button
                        type="button"
                        className={`font-mono text-sm  outline-none focus:outline-none  transition-all duration-300  hover:bg-opacity-90 flex items-center `}
                        onClick={() => {
                            handleShowModal();
                        }}
                    >
                        <img
                            className="h-5 w-5"
                            src="/images/Onyx/userIcon.png"
                            alt="account"
                        />
                        <span className=" pl-2 text-base text-primary-white font-bold">
                            {shortenAddressWithLessCharacters(account)}
                        </span>

                        <DropdownArrow className="stroke-[#FFFFFF] ml-2 w-[14px]" />
                    </button>
                </div>
            )}

            <>
                <LanguageNetworkModal
                    open={open}
                    onClose={toggleLanguageModal}
                />
            </>
        </div>
    );
};

export default OnyxTokenSection;
