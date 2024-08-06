import React from "react";
import { useWeb3React } from "@web3-react/core";
import { isMobile } from "react-device-detect";
import { handleGaEvent } from "@Utils/googleanalytics";
import { useWalletModalToggle } from "@Redux/Reducers/trade/hooks";
import { shortenAddress } from "@Utils";
import { SUPPORTED_NETWORKS } from "@Components/Constants";
import { useTranslation } from "react-i18next";

const ZeroSwapNetworkSection = ({ connecting }) => {
    const { chainId, account } = useWeb3React();
    const toggleWalletModal = useWalletModalToggle();
    const { t } = useTranslation();
    const networks: any = {};
    SUPPORTED_NETWORKS[process.env.NEXT_PUBLIC_INTEGRATION][
        process.env.NEXT_PUBLIC_NETWORK_TYPE
    ].forEach(element => {
        if (element.isActive) {
            networks[`${element.networkName.toString()}`] = [
                element.networkName,
            ];
        }
    });

    const handleShowModal = () => {
        toggleWalletModal();
    };

    const showInfo = () => {
        if (connecting) {
            return "Connecting";
        }
        if (isMobile) {
            return "Connect";
        }
        return "Connect Wallet";
    };

    return (
        <div className="flex justify-center sm:gap-4 gap-1">
            <div className="flex w-fit">
                {!account && (
                    <button
                        type="button"
                        id="connect-wallet"
                        data-testid="connect-wallet"
                        className="w-[152px] h-9 flex items-center justify-center rounded-[20px] text-sm text-primary-white relative cursor-pointer font-semibold bg-footer-text "
                        onClick={() => {
                            handleShowModal();

                            isMobile
                                ? handleGaEvent("CONNECT CLICKED")
                                : handleGaEvent("CONNECT WALLET CLICKED");
                        }}
                    >
                        {t(showInfo())}
                    </button>
                )}

                {account && chainId && (
                    <button
                        type="button"
                        id="connect-wallet"
                        data-testid="connect-wallet"
                        className="border px-4 h-9 cursor-pointer rounded-[20px] flex items-center justify-center "
                        onClick={() => {
                            handleShowModal();

                            isMobile
                                ? handleGaEvent("CONNECT CLICKED")
                                : handleGaEvent("CONNECT WALLET CLICKED");
                        }}
                    >
                        <span className=" text-sm font-semibold leading-6 text-primary-white ">
                            {shortenAddress(account)}
                        </span>
                        <img
                            src="/svgs/QuickSwap/WalletIcon.png"
                            alt="Wallet"
                            className=" w-5 ml-2"
                        />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ZeroSwapNetworkSection;
