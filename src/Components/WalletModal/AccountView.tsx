/* eslint-disable import/no-extraneous-dependencies */
import React, { FC } from "react";
import { AppState } from "@Redux";
import { useSelector } from "react-redux";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { MagicConnector } from "@Connectors/magic";
import { shortenAddress, toDecimals } from "@Utils";
import { MagicConnectorSocial } from "@Connectors/magicOAuth";
import {
    useModalOpen,
    useToggleDepositModal,
    useToggleWithdrawModal,
    useWalletModalToggle,
} from "@Reducers/trade/hooks";
import { ApplicationModal } from "@Reducers/trade";
import { useTranslation } from "react-i18next";
import { handleGaEvent } from "@Utils/googleanalytics";
import { NETWORK_NAME } from "@Constants";
import DepositModal from "./Deposit";
import WithdrawModal from "./Withdraw";
import { StatusIcon } from "./staus-icon";

interface IAccountView {
    openOptions: () => void;
}

const AccountView: FC<IAccountView> = () => {
    const { account, connector } = useWeb3React<Web3Provider>();
    const toggleWalletModal = useWalletModalToggle();
    const toggleDepositModal = useToggleDepositModal();
    const toggleWithdrawModal = useToggleWithdrawModal();
    const open = useModalOpen(ApplicationModal.DEPOSIT_MODAL);
    const openWithdraw = useModalOpen(ApplicationModal.WITHDRAW_MODAL);
    const {
        predictableToken,
        nativeBalance: balanceFromFetcher,
        selectedChainId,
    } = useSelector((state: AppState) => state.prediction);
    const { t } = useTranslation();

    return (
        <div className=" flex px-4 py-3 flex-col rounded-2xl bg-modal-content ">
            <section className="flex flex-col">
                <div className="flex items-center flex-row justify-between gap-3 sm:gap-8">
                    <div>
                        <span className="text-xs font-normal text-primary-200">
                            {t("Address")}
                        </span>
                        <div className="pt-1 flex flex-row gap-x-1 text-sm text-primary-100 font-normal text-highlight">
                            <div className="pt-1 text-sm text-primary-100 font-normal text-highlight">
                                {connector && (
                                    <StatusIcon connector={connector} />
                                )}
                            </div>
                            {shortenAddress(account)}
                        </div>
                    </div>
                    <div>
                        <span className="text-xs font-normal text-primary-200">
                            {t("Network")}
                        </span>
                        <div className="pt-1 text-sm text-primary-100 font-normal text-highlight">
                            {NETWORK_NAME[selectedChainId]}
                        </div>
                    </div>
                    <div>
                        <span className="text-xs font-normal text-primary-200">
                            {t("Balance")}
                        </span>
                        <div className="pt-1 text-sm flex items-end">
                            <div className="dark:text-primary-100 text-highlight">
                                {balanceFromFetcher
                                    ? toDecimals(Number(balanceFromFetcher), 4)
                                    : 0}
                            </div>
                            <div className="font-normal leading-4 pl-1 pb-0.5 text-primary-300 text-[10px]">
                                {predictableToken}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {(connector instanceof MagicConnector ||
                connector instanceof MagicConnectorSocial) && (
                <section className="mt-4">
                    <span className="text-xs text-secondary dark:text-primary-200">
                        {t("Funds")}
                    </span>
                    <div className="flex flex-row mt-2 w-full items-center gap-4">
                        <button
                            type="button"
                            className="p-2 hover:bg-footer-text hover:text-primary-100 text-primary rounded-md w-full items-center flex border-2 text-xs border-primary-200 hover:border-primary-blue  justify-center font-medium"
                            onClick={() => {
                                toggleWalletModal();
                                toggleDepositModal();
                                handleGaEvent("DEPOSIT FUNDS CLICKED");
                            }}
                        >
                            {t("Deposit Funds")}
                        </button>
                        <button
                            type="button"
                            className="p-2 hover:bg-footer-text hover:text-primary-100 text-primary rounded-md w-full items-center flex border-2 text-xs border-primary-200 hover:border-primary-blue  justify-center font-medium"
                            onClick={() => {
                                toggleWalletModal();
                                toggleWithdrawModal();
                                handleGaEvent("WITHDRAW FUNDS CLICKED");
                            }}
                        >
                            {t("Withdraw Funds")}
                        </button>
                    </div>
                </section>
            )}

            <DepositModal open={open} onClose={toggleDepositModal} />
            <WithdrawModal open={openWithdraw} onClose={toggleWithdrawModal} />
        </div>
    );
};

export default AccountView;
