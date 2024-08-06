import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getBalance,
    getERC20TokenBalance,
    getOddzBalance,
    transferFunds,
    upperCase,
} from "@Utils/common";
import { useWeb3React } from "@web3-react/core";
import { AppState } from "@Redux";
import BackArrow from "public/svgs/Backarrow.svg";
import {
    useToggleDepositModal,
    useWalletModalToggle,
} from "@Reducers/trade/hooks";
import CloseIcon from "public/svgs/close.svg";
import Select from "@Basic/select";
import LoadingIcon from "@Public/svgs/loading.svg";
import { useAlert } from "react-alert";
import { useTranslation } from "react-i18next";
import { updateIsFundTransferred } from "@Reducers/trade";
import { PREDICT_TOKENS } from "@Constants";
import { handleGaEvent } from "@Utils/googleanalytics";
import InputWithMax from "@Basic/InputWithMax";
import ButtonCTA from "@Basic/ButtonCTA";
import ModalComponent from "@Basic/Modal";
import { initialPredictableToken } from "@Utils";

interface IWithdrawModal {
    open: boolean;
    onClose: () => void;
}

const WithdrawModal: FC<IWithdrawModal> = ({ open, onClose }) => {
    const { account, library, chainId } = useWeb3React();
    const modalRef = useRef<HTMLDivElement | null>(null);
    const {
        isFundTransferred,
        balance,
        predictableToken,
        selectedChainId,
    } = useSelector((state: AppState) => state.prediction);
    const [balanceInfo, setBalance] = useState(0);
    const { t } = useTranslation();
    const toggleWalletModal = useWalletModalToggle();
    const toggleDepositModal = useToggleDepositModal();
    const recipentReff = useRef(null);
    const amountReff = useRef(null);
    const [recepientAddress, setRecepientAddress] = useState("");
    const [amount, setAmount] = useState(0);
    const [isTransferred, setIsTransferred] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(predictableToken);
    const [loading, setLoading] = useState(false);
    const alert = useAlert();
    const dispatch = useDispatch();
    // const [networkFee, setNetworkFee] = useState(0);
    const getOddzBal = async () => {
        const bal = await getOddzBalance(account, library);
        setBalance(bal);
    };

    // const getNetworkFees = async () => {
    //     const fee = await getNetworkFee(
    //         account,
    //         recepientAddress,
    //         amount,
    //         chainId
    //     );
    //    console.log("")
    // };

    const getUserBalance = async () => {
        if (account && library) {
            if (
                selectedCoin.toUpperCase() ===
                    PREDICT_TOKENS.MATIC.toString() ||
                selectedCoin.toUpperCase() === PREDICT_TOKENS.BNB.toString()
            ) {
                const balanceRes: any = await getBalance(account, library);
                // dispatch(updateBalance(balanceRes));
                setBalance(balanceRes);
            } else {
                const balanceRes: any = await getERC20TokenBalance(
                    selectedCoin,
                    account,
                    library
                );
                // dispatch(updateBalance(balanceRes));
                setBalance(balanceRes);
            }
        }
    };

    useEffect(() => {
        if (account && library) {
            if (selectedCoin === "ODDZ") {
                getOddzBal();
            } else {
                getUserBalance();
            }
        }
    }, [selectedCoin, balance]);

    const transfer = () => {
        setLoading(true);

        if (Number(balanceInfo) === 0) {
            alert.error(t("Insufficient Balance"));
            setLoading(false);
            return;
        }
        if (!amount) {
            alert.error(t("Please enter amount"));
            setLoading(false);
            return;
        }
        if (!recepientAddress) {
            alert.error(t("Please enter Recepients Address"));
            setLoading(false);
            return;
        }
        if (!Number(amount)) {
            alert.error(t("Please enter right amount"));
            setLoading(false);
            return;
        }
        if (Number(amount) > Number(balanceInfo)) {
            alert.error(
                t("Amount", { balanceInfo: Number(balanceInfo).toFixed(4) })
            );
            setLoading(false);
            return;
        }
        transferFunds(
            library,
            account,
            recepientAddress,
            amount,
            chainId,
            selectedCoin
        )
            .then(() => {
                dispatch(updateIsFundTransferred(!isFundTransferred));
                setLoading(false);
                setIsTransferred(!isTransferred);
                setAmount(0);
                setRecepientAddress("");
                setSelectedCoin(predictableToken);
                recipentReff.current.value = "";
                amountReff.current.value = 0;
                alert.success(t("Transferred Successfully"));
                handleGaEvent(
                    upperCase(`${predictableToken} transfer success`)
                );
                onClose();
            })
            .catch(() => {
                setLoading(false);
                alert.error(t("Something went wrong"));
                handleGaEvent(
                    upperCase(`${predictableToken} transfer went wrong`)
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const token = initialPredictableToken(selectedChainId);
    const options = {};
    options[initialPredictableToken(selectedChainId)] = token;

    return (
        <ModalComponent open={open} modalRef={modalRef}>
            <div
                className="sm:w-96 h-auto bg-content-background p-4 rounded-2xl text-secondary dark:text-primary-100 shadow-sm transition-all duration-300"
                style={{ maxWidth: "440px" }}
            >
                <div className="sm:flex sm:items-start flex-col w-full">
                    <div className="text-center sm:mt-0 sm:text-left w-full pb-4 flex justify-between">
                        <div className="flex items-center">
                            <span
                                role="none"
                                className="cursor-pointer fill-asset-text "
                                onClick={() => {
                                    toggleDepositModal();
                                    toggleWalletModal();
                                    handleGaEvent("WITHDRAW FUNDS CLICKED");
                                }}
                            >
                                <BackArrow />
                            </span>
                            <span className="pl-2 text-sm text-primary-100 leading-4">
                                {t("Withdraw Funds")}
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
                    <div className="bg-card-background rounded-xl p-4 w-full">
                        <div className="pb-2 text-xs text-primary-100">
                            {t("Select Coin")}
                        </div>

                        <Select
                            options={options}
                            value={selectedCoin}
                            onChange={(val: string) => {
                                setSelectedCoin(val);
                            }}
                            variant="border border-gray-100 py-2 px-4 rounded-md bg-primary-card-200"
                            margin={false}
                        />
                        <div className="pt-4 pb-2 text-xs text-primary-100">
                            {t("Network")}
                        </div>

                        <div className="bg-primary-card-200 border border-gray-100 py-2 px-4 rounded-md text-xs text-primary-200">
                            {token}
                        </div>
                        <div className="pt-4 pb-2 text-xs text-primary-100">
                            {t("Recepient_Address")}
                        </div>
                        <div className="border border-gray-100 py-2 px-4 rounded-md bg-primary-card-200">
                            <input
                                className=" bg-primary-card-200 text-primary-100 text-xs focus:outline-none w-full  rounded-md"
                                type="text"
                                ref={recipentReff}
                                placeholder="Enter Address"
                                onChange={(ev: any) => {
                                    setRecepientAddress(ev.target.value);
                                }}
                            />
                        </div>
                        <div className="pt-4 pb-2 flex justify-between text-xs">
                            <div className="text-primary-100 font-normal">
                                {t("Withdraw Amount")}
                            </div>
                            <div className="font-medium text-primary-200 text-xs ">
                                {`${selectedCoin} Bal: ${Number(
                                    balanceInfo
                                ).toFixed(4)}`}
                            </div>
                        </div>
                        <InputWithMax
                            inputRef={amountReff}
                            val={amount}
                            setValue={setAmount}
                            maxVal={balanceInfo}
                            placeholderText="Enter Amount"
                            parentStyle="relative bg-primary-card-200 py-2 px-4 rounded-md"
                            inputStyle="relative  text-xs text-primary-100 bg-primary-card-200  focus:outline-none w-full"
                            maxButtonStyle="text-xs  bg-footer-text border-none rounded-md py-1 px-2  font-medium text-entered-text hover:bg-white hover:text-primary hover:border-primary "
                        />
                        <div className="pt-3 flex flex-row justify-center w-full">
                            {loading ? (
                                <div className="flex flex-row justify-center h-10 w-10">
                                    <LoadingIcon className="animate-spin origin-center animate" />
                                </div>
                            ) : (
                                <ButtonCTA
                                    buttonFunction={transfer}
                                    variant="p-2 bg-footer-text text-primary-100 rounded-md w-full text-sm text-primary-white font-medium "
                                    text="Continue"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ModalComponent>
    );
};

export default WithdrawModal;
