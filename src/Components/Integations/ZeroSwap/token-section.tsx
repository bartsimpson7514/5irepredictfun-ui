/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import { initialPredictableToken } from "@Utils";

const ZeroSwapTokenSection = ({
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
                <button
                    type="button"
                    id="connect-wallet"
                    data-testid="connect-wallet"
                    className="w-full text-wallet-text rounded-[400px] text-sm outline-none focus:outline-none transition-all duration-300 bg-footer-text px-4 py-2  hover:bg-opacity-90 flex items-center"
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
            )}
            {account && chainId && (
                // <div className="flex flex-row gap-4 justify-between  border-light border-gray-700  px-3 py-[6px] rounded-lg border-2">
                //     <button
                //         type="button"
                //         className={`font-mono text-sm  outline-none focus:outline-none  transition-all duration-300  hover:bg-opacity-90 flex items-center `}
                //         onClick={() => {
                //             handleShowModal();
                //         }}
                //     >
                //         <WalletIcon
                //             color={fullConfig.theme.colors["entered-text"]}
                //         />

                //         <span className=" pl-2 text-primary-white text-sm font-normal leading-6">
                //             {shortenAddressWithLessCharacters(account)}
                //         </span>
                //     </button>
                // </div>
                <button
                    type="button"
                    onClick={() => {
                        handleShowModal();
                    }}
                    className="bg-wallet cursor-pointer flex justify-between p-1 rounded-[400px] items-center sm:w-[244px] w-[165px]"
                >
                    <div className="flex items-center justify-between sm:gap-2 gap-[6px]">
                        <div className="bg-[#FFFFFF] p-[4px] rounded-[50%]">
                            <img
                                src={`/images/wallets/${renderWalletIcon()}`}
                                alt="Icon"
                                className="h-[26px] w-[26px]"
                            />
                        </div>
                        <div className=" sm:text-base sm:leading-5 text-xs leading-3 text-[#11142D] font-bold">
                            {`${
                                nativeBalance
                                    ? Number(nativeBalance).toFixed(2)
                                    : 0
                            }
                            ${initialPredictableToken(selectedChainId)}`}
                        </div>
                    </div>
                    <div className="rounded-[400px] outline-none focus:outline-none transition-all duration-300 bg-footer-text sm:px-4 sm:py-2 p-1 flex items-center text-[13px] leading-[17px] text-[#FFFFFF] font-semibold">
                        {shortenAddressWithLessCharacters(account, 0)}
                    </div>
                </button>
            )}
        </div>
    );
};

export default ZeroSwapTokenSection;
