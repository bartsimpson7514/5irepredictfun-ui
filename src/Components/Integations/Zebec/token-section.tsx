/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import { initialPredictableToken } from "@Utils";
import DropdownArrow from "@Public/svgs/dropdown-arrow.svg";
import { useWeb3React } from "@web3-react/core";
import { StatusText } from "@Components/WalletModal/staus-icon";

const ZebecTokenSection = ({
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
    const {
        walletConnected,
        predictableToken,
        nativeBalance,
        selectedChainId,
    } = useSelector((state: AppState) => state.prediction);
    const { connector } = useWeb3React();

    const renderWalletIcon = () => {
        switch (walletConnected) {
            case "Injected":
                return "metamask.svg";
            case "MetaMask":
                return "metamask.svg";
            case "Frontier":
                return "frontier.png";
            case "Wallet Connect":
                return "walletConnectIcon.svg";
            case "Coinbase":
                return "coinbaseWalletIcon.svg";
            case "Magiclink":
                return "fortmaticIcon.png";
            default:
                return "metamask.svg";
        }
    };

    return (
        <div className="flex gap-2 items-center sm:ml-2">
            {!account && (
                <div
                    style={{ background: "#08E0A3, #E0AE1F" }}
                    className="p-[1px]  bg-gradient-to-r from-[#08E0A3] to-[#E0AE1F] rounded-[6px]"
                >
                    <button
                        type="button"
                        id="connect-wallet"
                        data-testid="connect-wallet"
                        className="w-full text-[#FFFFFFE5] bg-[#1A1B1F] rounded-[6px] text-[14px] leading-[24px] font-semibold outline-none focus:outline-none transition-all duration-300 px-4 py-2  hover:bg-opacity-70 flex items-center"
                        onClick={() => {
                            handleShowModal();

                            isMobile
                                ? handleGaEvent("CONNECT CLICKED")
                                : handleGaEvent("CONNECT WALLET CLICKED");
                        }}
                    >
                        <span className=" text-sm font-normal">
                            {t(showInfo())}
                        </span>
                    </button>
                </div>
            )}
            {account && chainId && (
                <>
                    <button
                        type="button"
                        onClick={() => {
                            handleShowModal();
                        }}
                        className="flex items-center gap-2 flex-row"
                    >
                        <img src="/images/Zebec/user.png" alt="userName" />
                        <div className="flex flex-col gap-[2px]">
                            <span className="text-[#FFFFFFE5] text-sm leading-4">
                                {shortenAddressWithLessCharacters(account, 4)}
                            </span>
                            <span className="text-[#FFFFFF66] text-xs leading-[14px]">
                                <StatusText connector={connector} />
                            </span>
                        </div>
                        <DropdownArrow className="stroke-[#C7CAD9]" />
                    </button>
                </>
            )}
        </div>
    );
};

export default ZebecTokenSection;
