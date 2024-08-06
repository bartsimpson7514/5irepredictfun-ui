import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { AppState } from "@Redux";
import { shortenAddress } from "@Utils";
import useCopyClipboard from "@Hooks/useCopyCliboard";
import CopyIcon from "public/svgs/copy.svg";
import CheckIcon from "public/svgs/check.svg";
import BackArrow from "public/svgs/Backarrow.svg";
import CloseIcon from "public/svgs/close.svg";
import { DEPOSIT_METHOD } from "@Constants";
import {
    useToggleDepositModal,
    useWalletModalToggle,
} from "@Reducers/trade/hooks";
import QRCode from "react-qr-code";
import { useTranslation } from "react-i18next";
import { handleGaEvent } from "@Utils/googleanalytics";
import CurrencyIcon from "@Components/Prediction/Card/currency-icon";
import ModalComponent from "@Basic/Modal";

interface IDepositModal {
    open: boolean;
    onClose: () => void;
}

const DepositModal: FC<IDepositModal> = ({ open, onClose }) => {
    const { account } = useWeb3React();
    const modalRef = useRef<HTMLDivElement | null>(null);
    const { isDarkMode, balance, predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );
    const parentRef = useRef(null);
    const [method, setMethod] = useState("");
    const [width, setWidth] = useState("");
    const [isCopied, setCopied] = useCopyClipboard();
    const toggleWalletModal = useWalletModalToggle();
    const toggleDepositModal = useToggleDepositModal();
    const { t } = useTranslation();
    const [showWithdrawFunds, setShowWithdrawFunds] = useState(false);

    const reloadIframe = framewidth => {
        if (framewidth) {
            return (
                <iframe
                    height="625"
                    width={framewidth}
                    title="Transak On/Off Ramp Widget"
                    src={`https://global.transak.com?apiKey=3434ac54-61fc-4fa7-8d09-49f8b0a462e5&cryptoCurrencyCode=MATIC&hideMenu=true&walletAddress=${account}&themeColor=${
                        isDarkMode ? "242731" : "000000"
                    }                                                    `}
                    frameBorder="no"
                    className="display: block; width: 100%; max-height: 625px; max-width: 500px;"
                />
            );
        }
    };

    useEffect(() => {
        if (parentRef?.current?.clientWidth) {
            setWidth(parentRef.current.clientWidth);
        }
    });

    return (
        <ModalComponent open={open} modalRef={modalRef}>
            <div
                className="sm:w-96 h-auto bg-content-background  rounded-2xl  text-black dark:text-primary-100 shadow-sm transition-all duration-300"
                style={{ maxWidth: "440px" }}
            >
                {!showWithdrawFunds && (
                    <div className="sm:flex sm:items-start flex-col w-full">
                        <div className="text-center sm:mt-0 sm:text-left py-4 flex justify-between w-full">
                            <div className="flex items-center" role="none">
                                <span
                                    role="none"
                                    className="cursor-pointer fill-asset-text"
                                    onClick={() => {
                                        toggleDepositModal();
                                        toggleWalletModal();
                                    }}
                                >
                                    <BackArrow />
                                </span>
                                <span className="pl-2 text-md text-primary-100">
                                    {t("Deposit Funds")}
                                </span>
                            </div>
                            <button
                                type="button"
                                className="text-lg outline-none focus:outline-none hover:text-gray-400 transition-all duration-300"
                                onClick={onClose}
                            >
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="bg-card-background  rounded-xl p-4 pb-6 w-full">
                            <div className="pb-2 text-md text-primary-100 font-semibold">
                                {t("Token")}
                            </div>
                            <div className="flex items-center justify-between space-x-6 pt-1">
                                <div className="flex items-center space-x-2">
                                    <CurrencyIcon
                                        label={predictableToken}
                                        className="h-4 w-4"
                                    />
                                    <div className="text-sm text-primary-100 font-normal">
                                        {predictableToken}
                                    </div>
                                </div>
                                <div className="font-medium text-sm text-primary-200">
                                    {`${t("Bal")} ${
                                        balance ? Number(balance).toFixed(4) : 0
                                    }`}
                                </div>
                            </div>
                            <div className="pt-6 pb-2 text-xs text-primary-100 font-normal">
                                {t("Select Method")}
                            </div>

                            <div className="border p-3 rounded-md mb-2.5 text-xs flex items-center border-primary-200 text-primary-100">
                                <label htmlFor="withdraw">
                                    <input
                                        type="radio"
                                        id="withdraw"
                                        value="withdraw"
                                        name="option"
                                        onClick={() => {
                                            setMethod(DEPOSIT_METHOD.EXCHANGES);
                                            handleGaEvent(
                                                `WITHDRAW FROM EXCHANGES CLICKED`
                                            );
                                        }}
                                    />
                                    &nbsp;
                                    {t("Withdraw from exchanges")}
                                </label>
                            </div>
                            <div className="border p-3 rounded-md text-xs flex items-center border-primary-200 text-primary-100">
                                <label htmlFor="upi">
                                    <input
                                        type="radio"
                                        value="upi"
                                        id="upi"
                                        name="option"
                                        onClick={() => {
                                            setMethod(DEPOSIT_METHOD.BANKUPI);
                                            handleGaEvent(
                                                `WITHDRAW FROM BANK UPI CLICKED`
                                            );
                                        }}
                                    />
                                    &nbsp;
                                    {t("Banking_Options")}
                                </label>
                            </div>
                            <div className="pt-6">
                                <button
                                    type="button"
                                    className={`p-2 rounded-md w-full items-center flex border-1 text-sm border-primary-100 text-primary-white font-semibold justify-center ${
                                        method !== ""
                                            ? "bg-footer-text"
                                            : "bg-footer-text"
                                    }`}
                                    onClick={() => {
                                        setShowWithdrawFunds(true);
                                        handleGaEvent(
                                            `CONTINUE CLICKED SELECTING WITHDRAW METHOD`
                                        );
                                    }}
                                >
                                    {t("Continue")}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {method === DEPOSIT_METHOD.EXCHANGES && showWithdrawFunds && (
                    <div className="sm:flex sm:items-start flex-col w-full">
                        <div className="text-center sm:mt-0 sm:text-left w-full pb-4 flex justify-between">
                            <div className="text-xl  flex items-center">
                                <span
                                    role="none"
                                    className="cursor-pointer fill-asset-text "
                                    onClick={() => {
                                        setShowWithdrawFunds(false);
                                    }}
                                >
                                    <BackArrow />
                                </span>
                                <span className="pl-2 text-sm leading-4 text-tooltip-text">
                                    {t("Withdraw from exchange")}
                                </span>
                            </div>
                            <button
                                type="button"
                                className="text-lg outline-none focus:outline-none hover:text-gray-400 transition-all duration-300"
                                onClick={onClose}
                            >
                                <CloseIcon className="fill-asset-text" />
                            </button>
                        </div>
                        <div className="bg-card-background  rounded-xl p-4 w-full">
                            <div className="w-full m-auto text-center">
                                <div className="justify-center m-auto text-center flex items-center w-full">
                                    <QRCode size={64} value={account} />
                                </div>
                                <div className="flex justify-center items-center text-xs mt-2 mb-4">
                                    <span className="text-tooltip-text">
                                        {shortenAddress(account)}
                                    </span>

                                    <div
                                        role="none"
                                        className="pt-1 cursor-pointer pl-2"
                                        onClick={() => setCopied(account)}
                                    >
                                        {isCopied ? (
                                            <>
                                                <CheckIcon className="mr-1 text-primary-100" />
                                            </>
                                        ) : (
                                            <>
                                                <CopyIcon className="mr-1 text-primary-100" />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ul className=" list-disc px-4 text-xs leading-5 text-tooltip-text">
                                    <li>
                                        {t(
                                            "Scan the QR Code or copy to get your deposit address"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "Send only MATIC to this deposit address"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "Ensure the network is Polygon_Matic"
                                        )}
                                    </li>
                                    <li>
                                        {t(
                                            "Bhavish_MessageFor_IncorrectDeposit"
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {method === DEPOSIT_METHOD.BANKUPI && showWithdrawFunds && (
                    <div className="sm:flex sm:items-start flex-col w-full">
                        <div className="text-center sm:mt-0 sm:text-left w-full pb-3">
                            <div className="flex justify-between">
                                <div className="text-xl flex items-center">
                                    <span
                                        role="none"
                                        className="cursor-pointer fill-asset-text "
                                        onClick={() => {
                                            setShowWithdrawFunds(false);
                                        }}
                                    >
                                        <BackArrow />
                                    </span>
                                    <span className="pl-2 text-sm leading-4">
                                        {t("Banking_Options")}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className="text-lg outline-none focus:outline-none hover:text-gray-400 transition-all duration-300"
                                    onClick={onClose}
                                >
                                    <CloseIcon />
                                </button>
                            </div>
                            <div
                                className="pt-4"
                                ref={parentRef}
                                style={{ maxWidth: "480px" }}
                            >
                                {width && reloadIframe(width)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ModalComponent>
    );
};

export default DepositModal;
