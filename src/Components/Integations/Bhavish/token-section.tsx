import React from "react";
import WalletIcon from "public/svgs/wallet.svg";
import {
    useModalOpen,
    useToggleLanguageNetworkModalToggle,
} from "@Redux/Reducers/trade/hooks";
import { ApplicationModal } from "@Redux/Reducers/trade";
import LanguageNetworkModal from "@Components/Header/language-network-modal";

const BhavishTokenSection = ({
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
        <div className="flex gap-2 items-center">
            {!account && (
                <div>
                    <button
                        type="button"
                        id="connect-wallet"
                        data-testid="connect-wallet"
                        className="w-full text-wallet-text text-sm outline-none focus:outline-none transition-all duration-300 bg-footer-text rounded-lg px-2 py-2 hover:bg-opacity-90 flex items-center"
                        onClick={() => {
                            handleShowModal();
                            isMobile
                                ? handleGaEvent("CONNECT CLICKED")
                                : handleGaEvent("CONNECT WALLET CLICKED");
                        }}
                    >
                        <WalletIcon
                            color={fullConfig.theme.colors["entered-text"]}
                        />
                        <span className="ml-2 text-sm leading-4 font-normal text-[#FFFFFF]">
                            {t(showInfo())}
                        </span>
                    </button>
                </div>
            )}
            {account && chainId && (
                <div className="flex flex-row gap-4 justify-between  border-light border-gray-700  px-3 py-[6px] rounded-lg border-2">
                    <button
                        type="button"
                        className={`font-mono text-sm  outline-none focus:outline-none  transition-all duration-300  hover:bg-opacity-90 flex items-center `}
                        onClick={() => {
                            handleShowModal();
                        }}
                    >
                        <WalletIcon
                            color={fullConfig.theme.colors["entered-text"]}
                        />

                        <span className=" pl-2 text-primary-white text-sm font-normal leading-6">
                            {shortenAddressWithLessCharacters(account, 2)}
                        </span>
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

export default BhavishTokenSection;
