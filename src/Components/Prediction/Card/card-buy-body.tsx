/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { PREDICT_TOKENS } from "@Constants";
import { TurnOffInputSpinner } from "@Styled/Options";
import { initialPredictableToken, toDecimals } from "@Utils";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import { handleGaEvent } from "@Utils/googleanalytics";
import { useTranslation } from "react-i18next";
import CurrencyIcon from "@Components/Prediction/Card/currency-icon";
import Modal from "@Basic/BasicModal";
import DurationSlider from "./duration-slider";

const CardBuybody = ({ ...props }) => {
    const percentageSelect = ["10%", "25%", "50%", "75%", "Max"];
    const [percentage, setPercentage] = useState(0);
    const [amountFlag, setAmountFlag] = useState(true);
    const [percFalg, setPercFlag] = useState(true);
    const [amount, updateAmount] = useState("");
    const [error, setError] = useState("");
    const { account } = useWeb3React();
    const {
        balance,
        isLoading,
        predictableToken,
        isDarkMode,
        selectedChainId,
    } = useSelector((state: AppState) => state.prediction);
    const [openTnC, setOpenTnC] = useState(false);

    const { t } = useTranslation();

    const setPercentageValue = index => {
        switch (index) {
            case 0:
                return 10;
            case 1:
                return 25;
            case 2:
                return 50;
            case 3:
                return 75;
            case 4:
                return 100;
            default:
                return 0;
        }
    };

    useEffect(() => {
        if (balance && amountFlag) {
            const amt = parseFloat(amount) ? parseFloat(amount) : 0;
            const bal = balance || 0;
            setPercentage((amt / bal) * 100 <= 100 ? (amt / bal) * 100 : 100);
            setPercFlag(false);
            setAmountFlag(true);
        }
        setAmountFlag(true);
    }, [amount]);

    useEffect(() => {
        if (account) {
            if (Number(balance) === 0) {
                setError("Insufficient Balance");
            } else if (Number(amount) > balance) {
                setError(
                    `Amount cannot be greater than ${toDecimals(balance, 2)}`
                );
            } else if (Number(amount) < 0) {
                setError(`${"Amount cannot be negative"}`);
            } else {
                setError("");
            }
        }
    }, [amount, balance]);

    useEffect(() => {
        if (percFalg) {
            const perc = percentage || 0;
            const bal = balance || 0;
            updateAmount(String(toDecimals(bal * perc * 0.01, 2)));
            setAmountFlag(false);
            setPercFlag(true);
        }
        setPercFlag(true);
    }, [percentage]);

    useEffect(() => {
        props.onChange(amount);
    }, [amount]);

    return (
        <div className="mx-4">
            <div className="flex items-center justify-between mb-2">
                <span className=" flex text-highlight text-sm leading-4 font-medium dark:text-tooltip-text">
                    {t("Commit")}
                </span>
                {account && (
                    <div className="flex">
                        <CurrencyIcon
                            label={predictableToken}
                            className="h-5 w-5"
                        />
                        <span
                            className="text-primary-100 font-normal dark:text-tooltip-text-opacity-72 pt-1 pl-1"
                            style={{ fontSize: "14px", lineHeight: "16px" }}
                        >
                            {`${Number(balance).toFixed(4)}`}
                        </span>
                    </div>
                )}
            </div>
            <TurnOffInputSpinner
                className={` ${
                    isLoading ? "pointer-events-none opacity-50" : ""
                }`}
            >
                <input
                    type="number"
                    className={`border rounded-lg mb-2 w-full h-10 appearance-none text-sm focus:outline-none bg-backgroung-blue placeholder:text-primary-200 dark:placeholder:text-primary-200 px-2 text-primary-100 dark:text-medium dark:bg-gray-300 ${
                        error
                            ? "border-down dark:border-down"
                            : "border-dark-border dark:border-gray-700"
                    } `}
                    placeholder={t("Enter Amount")}
                    maxLength={10}
                    value={amount}
                    onChange={ev => {
                        updateAmount(
                            String(
                                ev.target.value
                                    .toString()
                                    .split(".")
                                    .map((el, i) =>
                                        i
                                            ? el
                                                  .split("")
                                                  .slice(0, 2)
                                                  .join("")
                                            : el
                                    )
                                    .join(".")
                            )
                        );
                    }}
                />

                {error ? (
                    <div className="absolute text-down text-sm leading-3 -translate-y-2">
                        {t(error)}
                    </div>
                ) : (
                    account &&
                    predictableToken !== PREDICT_TOKENS.MATIC && (
                        <span
                            className="text-gray-400 text-sm leading-3 break-normal"
                            style={{ fontSize: "10px" }}
                        >
                            <span className="font-medium text-gray-400 break-normal">
                                {t("Approx", {
                                    predictionAmount: (
                                        Number(amount) / props.currentMaticPrice
                                    ).toFixed(4),
                                    token_id: initialPredictableToken(
                                        selectedChainId
                                    ),
                                })}
                            </span>
                            {t("will be used for this prediction")}
                        </span>
                    )
                )}
            </TurnOffInputSpinner>
            <div
                className={`mx-2 ${
                    isLoading ? "pointer-events-none  opacity-50" : ""
                } `}
            >
                <DurationSlider
                    percentage={percentage}
                    setPercentage={setPercentage}
                />
            </div>
            <span
                className="text-xs font-medium dark:text-tooltip-text text-highlight absolute"
                style={{ transform: "translateY(-9px)", height: "20px" }}
            >
                {`${toDecimals(percentage, 2)}%`}
            </span>
            <div
                className={`flex items-center justify-between mt-4  ${
                    isLoading ? "pointer-events-none opacity-50" : ""
                }`}
            >
                {percentageSelect.map((value, index) => {
                    return (
                        <button
                            key={value}
                            className="px-2.5 py-1 text-xs font-medium bg-footer-text bg-opacity-80 dark:bg-secondary-dark-blue text-tooltip-text rounded"
                            style={{
                                border: "0.5px solid rgba(28, 126, 255, 0.5)",
                            }}
                            type="button"
                            onClick={() =>
                                setPercentage(setPercentageValue(index))
                            }
                        >
                            {value}
                        </button>
                    );
                })}
            </div>

            <div className="text-xs font-medium dark:text-tooltip-text text-highlight mt-6">
                <span>
                    {t("Note I hereby accept that I have read & accept the")}
                </span>
                <button
                    className="ml-1 text-xs text-primary font-semibold cursor-pointer dark:text-primary-400"
                    type="button"
                    onClick={() => {
                        handleGaEvent("T&C CLICKED");
                        setOpenTnC(true);
                    }}
                >
                    {t("Bhavish_T_C")}
                </button>
            </div>

            <Modal
                showBack={false}
                onBack={() => {}}
                title={account && "Terms_Conditions"}
                open={openTnC}
                onClose={() => {
                    setOpenTnC(false);
                }}
                variant={`${isDarkMode ? "dark" : ""}`}
            >
                <span className="text-xs">
                    {t("Terms_Conditions_Text")}
                    <a href="" target="_blank" rel="noreferrer">
                        <span className="curosr text-primary ml-1">
                            {t("Read more")}
                        </span>
                    </a>
                </span>
            </Modal>
        </div>
    );
};

export default CardBuybody;
