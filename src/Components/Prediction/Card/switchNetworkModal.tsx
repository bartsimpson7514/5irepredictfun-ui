import React, { FC, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@Redux";
import { setupNetwork } from "@Utils";
import { useWeb3React } from "@web3-react/core";
import SadIcon from "@Public/svgs/sad-icon.svg";
import WarningIcon from "@Public/svgs/warning-icon.svg";
import { useTranslation } from "react-i18next";
import ModalComponent from "@Basic/Modal";
import { useWalletModalToggle } from "@Reducers/trade/hooks";
import { SWITCHNETWORK_MESSAGE } from "@Components/Constants";
import { updateSelectedChainId } from "@Reducers/trade";
import IntegrationButton from "@Basic/IntegrationButton";

interface IUnsupportedNetworkModal {
    open: boolean;
}

const UnsupportedNetworkModal: FC<IUnsupportedNetworkModal> = ({ open }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const { selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    const { account } = useWeb3React();
    const toggleWalletModal = useWalletModalToggle();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const switchNetwork =
        SWITCHNETWORK_MESSAGE[process.env.NEXT_PUBLIC_INTEGRATION];

    const handleConfirm = () => {
        if (!account) {
            toggleWalletModal();
        } else {
            setupNetwork(selectedChainId, () =>
                dispatch(updateSelectedChainId(Number(selectedChainId)))
            );
        }
    };

    return (
        <ModalComponent open={open} modalRef={modalRef}>
            <div className="sm:justify-between break-words text-primary-200 text-sm text-center font-medium w-auto sm:w-[320px]">
                {account && (
                    <>
                        <div className="flex items-center flex-col w-full">
                            <WarningIcon />
                            <h3 className="font-normal mt-4 text-base text-primary-100">
                                {t("Switch App Network")}
                            </h3>
                            <p className="mt-4 text-sm font-normal text-primary-200">
                                {t(switchNetwork[0].message)}
                            </p>
                        </div>
                        <p className="text-xs mt-3 w-full font-normal text-primary-200">
                            <span className="text-primary-warning">
                                {t("Note:")}
                            </span>
                            &nbsp;
                            {t("browser_refresh_text")}
                        </p>
                    </>
                )}
                {!account && (
                    <div className="flex items-center flex-col">
                        <SadIcon />
                        <h3 className="font-bold text-tooltip-text mt-4 text-xl ">
                            {t("Connect your Wallet")}
                        </h3>
                        <p className="mt-4">
                            {t(
                                "You would need to connect your wallet to start using the app"
                            )}
                        </p>
                    </div>
                )}
            </div>
            <div className="mt-8 gap-x-3 box-border  text-center w-full">
                <IntegrationButton
                    onClick={handleConfirm}
                    className="uppercase text-entered-text font-bold
                    text-sm outline-none px-4 py-4 focus:outline-none w-full bg-footer-text rounded"
                    content={() =>
                        !account ? "Connect Wallet" : t("Switch Network")
                    }
                />
            </div>
            <div className="mt-4 text-xs dark:text-primary-100 text-center">
                &quot;
                {t("Note_refresh_page")}
                &quot;
            </div>
        </ModalComponent>
    );
};

export default UnsupportedNetworkModal;
