import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import CircleQuestion from "public/svgs/circle-question.svg";
import { useTranslation } from "react-i18next";
import ReactTooltip from "react-tooltip";
import { fetchGasPrice, initialPredictableToken } from "@Utils";
import { useWeb3React } from "@web3-react/core";
import {
    updateGaslessMode,
    updateSlippage,
    updateTransactionSpeedOption,
} from "@Redux/Reducers/trade";
import CloseIcon from "public/svgs/close.svg";
import { getMinimumGaslessBetAmount } from "@Utils/predict";
import { AppState } from "@Redux";
import { TransactionSpeed } from "@Components/Constants";
import { handleGaEvent } from "@Utils/googleanalytics";
import { upperCase } from "@Utils/common";
import ModalComponent from "@Basic/Modal";

interface IOptionsLoadingModal {
    open: boolean;
    onClose: () => void;
}

const QuickSwapSettingModal: FC<IOptionsLoadingModal> = ({ open, onClose }) => {
    const { library } = useWeb3React();
    const modalRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const {
        transactionSpeedOption,
        slippage,
        selectedChainId,
        isGaslessModeOn,
        predictableToken,
    } = useSelector((state: AppState) => state.prediction);
    const [currentSlippage, setCurrentSlippage] = useState<string>(
        String(slippage) !== "undefined" ? String(slippage) : "1"
    );
    const [isShown, setIsShown] = useState(false);
    const [minGasLessPremium, setMinGaslessPremium] = useState(0);

    const [isShowMesg, setShowMesg] = useState(false);

    const [isShowSpeedInfo, setIsShowSpeedInfo] = useState(false);
    const [gasPriceRes, setGasPriceRes] = useState<any>();

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    const getGasPrice = async lib => {
        const gas = await fetchGasPrice(lib, selectedChainId);
        setGasPriceRes(gas);
    };

    const getPrice = async () => {
        await getGasPrice(library);
    };

    const getMinGaslessAmount = async () => {
        const minGaslessBetAmount: any = await getMinimumGaslessBetAmount(
            library,
            selectedChainId,
            predictableToken
        );
        setMinGaslessPremium(minGaslessBetAmount);
    };

    useEffect(() => {
        if (library) {
            getMinGaslessAmount();
            getGasPrice(library);
        }
    }, [library, predictableToken]);

    useEffect(() => {
        if (library) {
            getPrice();
        }
    }, [library]);

    const handleSave = () => {
        dispatch(updateSlippage(Number(currentSlippage)));
        onClose();
    };

    const setGaslessMode = () => {
        dispatch(updateGaslessMode(!isGaslessModeOn));
    };

    return (
        <ModalComponent open={open} modalRef={modalRef}>
            <div className="flex items-center justify-between">
                <p className="text-highlight dark:text-primary-100 text-lg font-medium">
                    <h3 className="sm:text-lg text-xs font-bold">
                        {t("Settings")}
                    </h3>
                </p>
                <CloseIcon
                    className="dark:text-primary-100 text-highlight cursor-pointer"
                    onClick={() => {
                        onClose();
                    }}
                />
            </div>
            <div className="flex items-center w-full py-3 text-sm text-info-text font-medium pr-3">
                {t("Gasless Mode")}
                <span
                    className="font-medium"
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}
                >
                    <CircleQuestion className="ml-1 mr-2" />
                    {isShown && (
                        <span className="absolute z-10 dark:bg-gray-300 bg-white dark:text-primary-100 top-24 shadow p-2 inline-block font-medium text-xs flexitems-center text-primary-200 transition delay-150 w-48">
                            {t("Bhavish_Gasless_Feature", {
                                minGaslessPremium: minGasLessPremium,
                                token_id: initialPredictableToken(
                                    selectedChainId
                                ),
                            })}
                        </span>
                    )}
                </span>
            </div>
            <Switch
                checked={isGaslessModeOn}
                onChange={() => {
                    setGaslessMode();
                    handleGaEvent(
                        !isGaslessModeOn
                            ? "GASLESS MODE ON"
                            : "GASLESS MODE OFF"
                    );
                }}
                className={classNames(
                    isGaslessModeOn ? "bg-footer-text" : "bg-gray-300",
                    "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
                )}
            >
                <span
                    className={classNames(
                        isGaslessModeOn ? "absolute flex items-left" : "hidden"
                    )}
                >
                    <svg
                        className="h-5 w-4 pl-0.5 pt-0.5"
                        fill="white"
                        viewBox="0 0 13 13"
                    >
                        <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                    </svg>
                </span>
                <span
                    className={classNames(
                        isGaslessModeOn
                            ? "hidden"
                            : "absolute left-4 pl-1.5 pt-0.5 inset-0 h-full w-full flex items-right justify-right"
                    )}
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 14 14">
                        <path
                            d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                            stroke="#9BA3AF"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
                <span
                    className={classNames(
                        isGaslessModeOn ? "translate-x-5" : "translate-x-0",
                        "pointer-events-none relative bg-white inline-block h-5 w-5 rounded-full shadow transform ring-0 transition ease-in-out duration-200"
                    )}
                />
            </Switch>
            <div className="w-full pt-6 pb-3 text-sm font-normal text-info-text flex">
                {t("Default Transaction Speed (GWEI)")}
                <span
                    className="font-normal text-info-text"
                    onMouseEnter={() => setIsShowSpeedInfo(true)}
                    onMouseLeave={() => setIsShowSpeedInfo(false)}
                >
                    <CircleQuestion className="ml-1 mt-1 mr-2" />
                </span>
                {isShowSpeedInfo && (
                    <span className="absolute z-10 bg-gray-300 text-info-text top-24 shadow p-2 inline-block font-medium text-xs flexitems-center transition delay-150 w-48">
                        {t(
                            "Adjusts the gas price (transaction fee) for your transaction Higher GWEI higher speed higher fees"
                        )}
                    </span>
                )}
            </div>
            <div className="flex flex-wrap gap-3 w-full items-center justify-center">
                <button
                    type="button"
                    className={` whitespace-nowrap lg:w-28 px-4 py-2 rounded-lg text-xs font-medium ${
                        transactionSpeedOption === TransactionSpeed.Standard
                            ? "bg-footer-text text-primary-white"
                            : "border-primary-200 border"
                    }`}
                    onClick={() => {
                        dispatch(
                            updateTransactionSpeedOption(
                                TransactionSpeed.Standard
                            )
                        );
                        handleGaEvent(upperCase("Transaction speed standard"));
                    }}
                >
                    {`${t("Standard")} (${gasPriceRes?.SafeGasPrice})`}
                </button>
                <button
                    type="button"
                    className={` whitespace-nowrap lg:w-28 px-4 py-2 rounded-lg text-xs font-medium ${
                        transactionSpeedOption === TransactionSpeed.Fast
                            ? "bg-footer-text text-primary-white"
                            : "border-primary-200 border"
                    }`}
                    onClick={() => {
                        dispatch(
                            updateTransactionSpeedOption(TransactionSpeed.Fast)
                        );
                        handleGaEvent(upperCase("Transaction speed fast"));
                    }}
                >
                    {`${t("Fast")} (${gasPriceRes?.ProposeGasPrice})`}
                </button>

                <button
                    type="button"
                    className={` whitespace-nowrap lg:w-28 px-4 py-2 rounded-lg text-xs font-medium ${
                        transactionSpeedOption === TransactionSpeed.Instant
                            ? "bg-footer-text text-primary-white"
                            : " border border-primary-200"
                    }`}
                    onClick={() => {
                        dispatch(
                            updateTransactionSpeedOption(
                                TransactionSpeed.Instant
                            )
                        );
                        handleGaEvent(upperCase("Transaction speed instant"));
                    }}
                >
                    {`${t("Instant")} (${gasPriceRes?.FastGasPrice})`}
                </button>
            </div>
            <div className="w-full pt-6 pb-3 text-sm font-normal text-info-text">
                {t("Slippage tolerance")}
            </div>
            <div className="flex flex-wrap gap-2">
                <button
                    type="button"
                    className="border border-primary-200  lg:w-20 w-10 p-1 rounded-lg mr-2 text-xs font-normal"
                    onClick={() => setCurrentSlippage("0.1")}
                >
                    0.1%
                </button>
                <button
                    type="button"
                    className="border border-primary-200  lg:w-20 w-10 p-1 rounded-lg mr-2 text-xs font-medium"
                    onClick={() => setCurrentSlippage("0.5")}
                >
                    0.5%
                </button>
                <button
                    type="button"
                    className="border border-primary-200  lg:w-20 w-10 p-1 rounded-lg mr-2 text-xs font-medium"
                    onClick={() => setCurrentSlippage("1")}
                >
                    1%
                </button>
            </div>
            <div className="w-full pt-6 pb-3 text-sm font-normal text-info-text">
                {t("Custom tolerence")}
            </div>
            <input
                type="number"
                className="border border-primary-200 bg-gray-100 h-8 lg:w-20 w-10 p-2 rounded-lg text-xs font-normal"
                placeholder="1%"
                value={currentSlippage}
                onChange={ev => {
                    setCurrentSlippage(ev.target.value);
                    if (Number(ev.target.value) > 5) {
                        setShowMesg(true);
                    } else {
                        setShowMesg(false);
                    }
                }}
            />
            {isShowMesg && (
                <span className="text-yellow-500 text-xs pt-4">
                    {t("Your transaction may be frontrun!")}
                </span>
            )}
            <div className="w-full pt-6 pb-2 text-sm font-normal text-info-text flex">
                {t("Transaction deadline")}
                <span className="font-medium">
                    <CircleQuestion
                        className="ml-1 mt-1 mr-2"
                        data-tip={t("rounds_transaction_deadline")}
                        data-for="toolTipClosedPrice"
                        data-place="bottom"
                    />
                </span>
                <ReactTooltip
                    id="toolTipClosedPrice"
                    effect="solid"
                    class="text-center text-sm  w-60 justify-center absolute z-100"
                    backgroundColor="#12131A"
                    textColor="#C7CAD9"
                />
            </div>

            <button
                type="button"
                className="bg-footer-text text-primary-white font-bold text-sm tracking-wider rounded-lg mt-3 w-full py-3"
                onClick={handleSave}
            >
                {t("Save")}
            </button>
        </ModalComponent>
    );
};

export default QuickSwapSettingModal;
