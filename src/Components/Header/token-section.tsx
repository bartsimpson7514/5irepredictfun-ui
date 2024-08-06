/* eslint-disable prefer-template */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { useWeb3React } from "@web3-react/core";
import { isMobile } from "react-device-detect";
import { handleGaEvent } from "@Utils/googleanalytics";
import { INTEGRATIONS } from "@Constants";
import { useWalletModalToggle } from "@Redux/Reducers/trade/hooks";
import { shortenAddressWithLessCharacters } from "@Utils";
import { useTranslation } from "react-i18next";
// import LanguageNetworkModal from "./language-network-modal";
import resolveConfig from "tailwindcss/resolveConfig";
import ZeroSwapTokenSection from "@Components/Integations/ZeroSwap/token-section";
import QuickSwapTokenSection from "@Components/Integations/QuickSwap/token-section";
import BhavishTokenSection from "@Components/Integations/Bhavish/token-section";
import OnyxTokenSection from "@Components/Integations/Onyx/token-section";
import ZebecTokenSection from "@Components/Integations/Zebec/token-section";
import tailwindConfig from "../../../tailwind.config";

const TokenSection = ({ connecting }) => {
    const fullConfig = resolveConfig(tailwindConfig);

    const { chainId, account } = useWeb3React();
    const toggleWalletModal = useWalletModalToggle();
    const { t } = useTranslation();
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

    const renderTokenSection = () => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
                return (
                    <BhavishTokenSection
                        t={t}
                        account={account}
                        handleShowModal={handleShowModal}
                        isMobile={isMobile}
                        handleGaEvent={handleGaEvent}
                        fullConfig={fullConfig}
                        showInfo={showInfo}
                        chainId={chainId}
                        shortenAddressWithLessCharacters={
                            shortenAddressWithLessCharacters
                        }
                    />
                );
            case INTEGRATIONS.QUICKSWAP:
                return (
                    <QuickSwapTokenSection
                        t={t}
                        account={account}
                        handleShowModal={handleShowModal}
                        isMobile={isMobile}
                        handleGaEvent={handleGaEvent}
                        fullConfig={fullConfig}
                        showInfo={showInfo}
                        chainId={chainId}
                        shortenAddressWithLessCharacters={
                            shortenAddressWithLessCharacters
                        }
                    />
                );
            case INTEGRATIONS.ZEROSWAP:
                return (
                    <ZeroSwapTokenSection
                        t={t}
                        account={account}
                        handleShowModal={handleShowModal}
                        isMobile={isMobile}
                        handleGaEvent={handleGaEvent}
                        fullConfig={fullConfig}
                        showInfo={showInfo}
                        chainId={chainId}
                        shortenAddressWithLessCharacters={
                            shortenAddressWithLessCharacters
                        }
                    />
                );
            case INTEGRATIONS.ZEBEC:
                return (
                    <ZebecTokenSection
                        t={t}
                        account={account}
                        handleShowModal={handleShowModal}
                        isMobile={isMobile}
                        handleGaEvent={handleGaEvent}
                        fullConfig={fullConfig}
                        showInfo={showInfo}
                        chainId={chainId}
                        shortenAddressWithLessCharacters={
                            shortenAddressWithLessCharacters
                        }
                    />
                );
            case INTEGRATIONS.ONYX:
                return (
                    <OnyxTokenSection
                        t={t}
                        account={account}
                        handleShowModal={handleShowModal}
                        isMobile={isMobile}
                        handleGaEvent={handleGaEvent}
                        fullConfig={fullConfig}
                        showInfo={showInfo}
                        chainId={chainId}
                        shortenAddressWithLessCharacters={
                            shortenAddressWithLessCharacters
                        }
                    />
                );
            default:
                return (
                    <BhavishTokenSection
                        t={t}
                        account={account}
                        handleShowModal={handleShowModal}
                        isMobile={isMobile}
                        handleGaEvent={handleGaEvent}
                        fullConfig={fullConfig}
                        showInfo={showInfo}
                        chainId={chainId}
                        shortenAddressWithLessCharacters={
                            shortenAddressWithLessCharacters
                        }
                    />
                );
        }
    };

    return <>{renderTokenSection()}</>;
};

export default TokenSection;
