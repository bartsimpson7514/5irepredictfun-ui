/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { useWeb3React } from "@web3-react/core";
import { useBGDepositModalToggle } from "@Reducers/trade/hooks";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import { useTranslation } from "react-i18next";
import { initialPredictableToken } from "@Utils";
import { PREDICT_TOKENS } from "@Constants";

const HistoryLossy = () => {
    const { account, chainId } = useWeb3React();
    const toggleDepositModal = useBGDepositModalToggle();

    const { nativeBalance, selectedChainId, predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );
    const { t } = useTranslation();

    return (
        <div className="flex items-center h-[375px] justify-center w-full">
            {account && (
                <div className="text-center w-full flex flex-col gap-y-4">
                    {predictableToken === PREDICT_TOKENS.BNB && (
                        <div className="flex justify-center">
                            <img src="/images/bnb.png" alt="" />
                        </div>
                    )}
                    <div className="text-primary-200 text-sm">
                        {t("Balance")}
                    </div>
                    <div>
                        <span className="text-primary-100 text-lg font-bold">
                            {nativeBalance}
                        </span>
                        <span className="text-sm text-potential-text">
                            &nbsp;
                            {initialPredictableToken(chainId)}
                        </span>
                    </div>
                    {selectedChainId === 137 && (
                        <p className="text-center content-center m-auto sm:w-[591px]">
                            <span className="items-baseline">
                                <span className="text-primary-warning">
                                    {t("Note")}
                                </span>
                                <span
                                    className="inline text-primary-100 underline cursor-pointer"
                                    role="none"
                                    onClick={() => {
                                        toggleDepositModal();
                                    }}
                                >
                                    {t("Deposit_History", {
                                        predictToken: initialPredictableToken(
                                            chainId
                                        ),
                                    })}
                                    {/* {`Deposit $${initialPredictableToken(
                                        chainId
                                    )}`} */}
                                </span>
                            </span>
                            <span className="text-primary-200 text-sm break-words sm:break-normal">
                                &nbsp;
                                {t("bgn_tokens")}
                            </span>
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default HistoryLossy;
