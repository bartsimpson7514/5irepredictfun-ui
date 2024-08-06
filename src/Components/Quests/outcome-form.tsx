/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useAlert } from "react-alert";
import {
    fetchGas,
    getEtherscanLink,
    shortenAddress,
    shortenName,
    toDecimals,
    validNetwork,
} from "@Utils";
import { AppState } from "@Redux";
import { useDispatch, useSelector } from "react-redux";
import {
    enterLossyWrapperQuest,
    enterNativeQuest,
    enterQuest,
} from "@Utils/quest";
import LoadingIcon from "@Public/svgs/loading.svg";
import QuickSwapLoader from "@Components/Integations/QuickSwap/loader";
import LinkIcon from "@Public/svgs/link-icon";
import InputField from "@Basic/InputModal";
import { INTEGRATIONS, PREDICT_TOKENS, QUESTS } from "@Constants";
import { handleGaEvent } from "@Utils/googleanalytics";
import { useUserMarkets } from "@Hooks/useUserMarkets";
import { useGetMarket } from "@Hooks/useGetMarket";
import { useUserHistory } from "@Hooks/useUserHistory";
import { useGetMarketOutcome } from "@Hooks/useGetMarketOucome";
import { updateIsQuestPredicted } from "@Reducers/trade";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import ZeroSwapInputField from "@Components/Integations/ZeroSwap/InputModal";
import WrongConnectWalletModal from "@Components/WalletModal/WrongConnectWalletModal";
import {
    useBGDepositModalToggle,
    useWalletModalToggle,
} from "@Reducers/trade/hooks";
import OnyxInputField from "@Components/Integations/Onyx/InputModal";
import ZebecInputField from "@Components/Integations/Zebec/InputModal";
import { MARKET } from "./constants";
import {
    formatQuestion,
    convertToWei,
    returnCurrencyName,
} from "./questhelpers";
import { tagRender, tagStatus } from "./questUtils";
import RenderAnsweredSection from "./quest-renderAnsweredSection";
import RenderUIResolutionSection from "./quest-renderResolutionSection";
import RenderEndedSection from "./quest-renderEndedSection";
import InsufficientBalance from "./insufficient-balance";

interface IOutComeForm {
    questId: number;
    title: any;
    markets: MARKET[];
    questions: number;
    onPlacebetSuccess: (success: boolean) => void;
    betOutcomes: number[];
    inResolution: boolean;
    ended: boolean;
    expired: boolean;
    startsin: boolean;
    answered: boolean;
}
const OutcomeForm: React.FC<IOutComeForm> = ({
    questId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    title,
    markets,
    questions,
    onPlacebetSuccess,
    betOutcomes,
    inResolution,
    ended,
    expired,
    startsin,
    answered = false,
}) => {
    const router = useRouter();
    const { library, account, chainId } = useWeb3React();
    const {
        bgnBalance,
        bglBalance,
        nativeBalance,
        transactionSpeedOption,
        predictableToken,
        isQuestPredicted,
        selectedChainId,
    } = useSelector((state: AppState) => state.prediction);
    const dispatch = useDispatch();

    const balance = {
        BGN: bgnBalance,
        BGL: bglBalance,
        MATIC: nativeBalance,
        BNB: nativeBalance,
    };

    const alert = useAlert();

    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);

    const contractAddress = QUESTS[predictableToken][selectedChainId];
    const [questionWeightage, setQuestionWeightage] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);
    const [estimatedEarnings, setEstimatedEarnings] = useState(0);

    const [marketIds, setMarketIds] = useState([]);
    const [data, setData] = useState([] as any);
    const [outcomeRatio, setOutcomeRatio] = useState({});
    const toggleWalletModal = useWalletModalToggle();
    const toggleBGDepositModal = useBGDepositModalToggle();

    const { questData } = useGetMarket(questId);
    const { userMarketData } = useUserMarkets();
    const { questOutcome } = useGetMarketOutcome(marketIds);
    const { userMarketHistory } = useUserHistory(questId);
    const { t } = useTranslation();
    const totalWeightage: number = 100;
    const userData = userMarketData.filter(
        dataItem => Number(dataItem.quest.id) === Number(questId)
    );
    const tag = tagStatus(userData);

    useEffect(() => {
        let estimatedPotentialEarnings = 0;
        if (questData) {
            // eslint-disable-next-line array-callback-return
            Array.from(Array(questions).keys()).map((outcome, index) => {
                const sumTotal = questData.markets[index].outcomeBetted.reduce(
                    (a, b) => Number(a) + Number(b)
                );

                const assumedDeposit = amount / questions;
                const assumedDepositWei = convertToWei(assumedDeposit, library);

                const potentailEarning =
                    amount > 0
                        ? toDecimals(
                              assumedDeposit *
                                  ((sumTotal + assumedDepositWei) /
                                      (Number(
                                          questData.markets[index]
                                              .outcomeBetted[betOutcomes[index]]
                                      ) +
                                          assumedDepositWei)),
                              2
                          )
                        : 0;

                estimatedPotentialEarnings += potentailEarning;
            });

            setEstimatedEarnings(estimatedPotentialEarnings);
        }
        return () => {
            setEstimatedEarnings(0);
        };
    }, [amount, questData]);

    useEffect(() => {
        const dict = {};
        questOutcome.map(val => {
            if (dict[val.marketId]) {
                if (
                    Number(dict[val.marketId].timestamp) < Number(val.timestamp)
                )
                    dict[val.marketId] = val;
            } else dict[val.marketId] = val;
            // eslint-disable-next-line no-useless-return
            return;
        });
        setOutcomeRatio(dict);
        return () => {
            setOutcomeRatio({});
        };
    }, [questOutcome]);

    useEffect(() => {
        if (userMarketHistory) {
            setData(userMarketHistory.markets);
            const marketId = userMarketHistory.markets.map(market =>
                Number(market.id.split("-")[0])
            );
            setMarketIds(marketId);
            setIsAnswered(true);
        } else {
            setData(markets);
            const marketId = markets.map(market => Number(market.id));
            setMarketIds(marketId);
            setIsAnswered(false);
        }
        return () => {
            setData([]);
            setMarketIds([]);
            setIsAnswered(false);
        };
    }, [userMarketHistory]);

    const callback = () => {
        alert.success(t("Prediction placed successfully"));
        handleGaEvent(`QUEST ${predictableToken} PREDICTION PLACED SUCCESSFUL`);
        onPlacebetSuccess(true);
        setAmount(0);
        dispatch(updateIsQuestPredicted(!isQuestPredicted));
        setLoading(false);
        router.push("/quests");
    };

    const errorHandler = () => {
        alert.error(t("failed to place bet"));
        handleGaEvent(`QUEST ${predictableToken} BET FAILED`);
        onPlacebetSuccess(false);
        setLoading(false);
    };

    useEffect(() => {
        const qweight = totalWeightage / questions;
        setQuestionWeightage(Array(questions).fill(qweight));
        return () => {
            setQuestionWeightage([]);
        };
    }, []);

    const onPlacebet = async () => {
        setLoading(true);
        const gasPrice = await fetchGas(
            library,
            transactionSpeedOption,
            selectedChainId
        );
        try {
            if (predictableToken === PREDICT_TOKENS.BGN) {
                enterQuest(
                    library,
                    account,
                    () => {},
                    callback,
                    errorHandler,
                    gasPrice,
                    questId,
                    totalWeightage,
                    betOutcomes,
                    questions === 3 ? [33, 33, 34] : questionWeightage,
                    amount,
                    predictableToken
                );
            } else if (predictableToken === PREDICT_TOKENS.MATIC) {
                enterLossyWrapperQuest(
                    library,
                    account,
                    () => {},
                    callback,
                    errorHandler,
                    gasPrice,
                    questId,
                    totalWeightage,
                    betOutcomes,
                    questions === 3 ? [33, 33, 34] : questionWeightage,
                    amount,
                    predictableToken
                );
            } else {
                enterNativeQuest(
                    library,
                    account,
                    () => {},
                    callback,
                    errorHandler,
                    gasPrice,
                    questId,
                    totalWeightage,
                    betOutcomes,
                    questions === 3 ? [33, 33, 34] : questionWeightage,
                    amount,
                    predictableToken
                );
            }
        } catch (err) {
            alert.error("Something went wrong");
        }
    };

    const InputRender = disabledCondition => {
        switch (process.env.NEXT_PUBLIC_INTEGRATION) {
            case INTEGRATIONS.BHAVISH:
            case INTEGRATIONS.QUICKSWAP:
                return (
                    <InputField
                        amount={amount}
                        maxAmount={balance[predictableToken]}
                        onMaxSelect={() => {
                            balance[predictableToken] > 0 &&
                                setAmount(balance[predictableToken]);
                        }}
                        onHalfSelect={() => {
                            balance[predictableToken] > 0 &&
                                setAmount(balance[predictableToken] / 2);
                        }}
                        disabledCondition={disabledCondition}
                        inputChange={ev => {
                            setAmount(ev.target.value);
                        }}
                        selectedOption={predictableToken}
                        balanceText="Balance"
                        loading={loading}
                        minAmount={0}
                    />
                );
            case INTEGRATIONS.ZEROSWAP:
                return (
                    <ZeroSwapInputField
                        amount={amount}
                        maxAmount={balance[predictableToken]}
                        onMaxSelect={() => {
                            balance[predictableToken] > 0 &&
                                setAmount(balance[predictableToken]);
                        }}
                        onHalfSelect={() => {
                            balance[predictableToken] > 0 &&
                                setAmount(balance[predictableToken] / 2);
                        }}
                        on25Select={() => {
                            balance[predictableToken] > 0 &&
                                setAmount(balance[predictableToken] / 4);
                        }}
                        on75Select={() => {
                            balance[predictableToken] > 0 &&
                                setAmount((3 * balance[predictableToken]) / 4);
                        }}
                        inputChange={ev => {
                            setAmount(ev.target.value);
                        }}
                        selectedOption={predictableToken}
                        balanceText="Balance"
                        loading={loading}
                        disabledCondition={disabledCondition}
                        minAmount={0}
                    />
                );
            case INTEGRATIONS.ZEBEC:
                return (
                    <ZebecInputField
                        amount={amount}
                        maxAmount={balance[predictableToken]}
                        onMaxSelect={() => {
                            balance[predictableToken] > 0 &&
                                setAmount(balance[predictableToken]);
                        }}
                        onHalfSelect={() => {
                            balance[predictableToken] > 0 &&
                                setAmount(balance[predictableToken] / 2);
                        }}
                        on25Select={() => {
                            balance[predictableToken] > 0 &&
                                setAmount(balance[predictableToken] / 4);
                        }}
                        on75Select={() => {
                            balance[predictableToken] > 0 &&
                                setAmount((3 * balance[predictableToken]) / 4);
                        }}
                        inputChange={ev => {
                            setAmount(ev.target.value);
                        }}
                        selectedOption={predictableToken}
                        balanceText="Balance"
                        loading={loading}
                        disabledCondition={disabledCondition}
                        minAmount={0}
                    />
                );
            case INTEGRATIONS.ONYX:
                return (
                    <OnyxInputField
                        amount={amount}
                        maxAmount={balance[predictableToken]}
                        onMaxSelect={() => {
                            balance[predictableToken] > 0 &&
                                setAmount(balance[predictableToken]);
                        }}
                        onHalfSelect={() => {
                            balance[predictableToken] > 0 &&
                                setAmount(balance[predictableToken] / 2);
                        }}
                        on25Select={() => {
                            balance[predictableToken] > 0 &&
                                setAmount(balance[predictableToken] / 4);
                        }}
                        on75Select={() => {
                            balance[predictableToken] > 0 &&
                                setAmount((3 * balance[predictableToken]) / 4);
                        }}
                        inputChange={ev => {
                            setAmount(ev.target.value);
                        }}
                        selectedOption={predictableToken}
                        balanceText="Balance"
                        loading={loading}
                        disabledCondition={disabledCondition}
                        minAmount={0}
                    />
                );

            default:
                return (
                    <InputField
                        amount={amount}
                        maxAmount={balance[predictableToken]}
                        onMaxSelect={() => {
                            balance[predictableToken] > 0 &&
                                setAmount(balance[predictableToken]);
                        }}
                        onHalfSelect={() => {
                            balance[predictableToken] > 0 &&
                                setAmount(balance[predictableToken] / 2);
                        }}
                        disabledCondition={disabledCondition}
                        inputChange={ev => {
                            setAmount(ev.target.value);
                        }}
                        selectedOption={predictableToken}
                        balanceText="Balance"
                        loading={loading}
                        minAmount={0}
                    />
                );
        }
    };

    const showInfo = () => {
        if (!account) {
            return "CONNECT WALLET";
        }
        if (
            account &&
            predictableToken === PREDICT_TOKENS.BGN &&
            balance[predictableToken] === 0
        ) {
            return "Desposit";
        }
        return " ";
    };

    const connectWalletOrDeposit = () => {
        if (!account) {
            toggleWalletModal();
        } else if (
            account &&
            predictableToken === PREDICT_TOKENS.BGN &&
            balance[predictableToken] === 0
        ) {
            toggleBGDepositModal();
        }
    };
    const renderEnterAmountSection = () => {
        const disabledCondition =
            !account ||
            (account && !validNetwork(chainId)) ||
            balance[predictableToken] === 0;
        return (
            <div className="rounded-t-[10px] relative sm:px-6 sm:pt-8 sm:pb-6 px-3 py-4 bg-card-background">
                {tag && tagRender(tag, t)}
                <p className="text-primary-300 text-xs font-medium mb-2">
                    {t("Last Step")}
                </p>
                <h3 className="text-md font-medium text-primary-100 mb-4">
                    {t("Enter Amount")}
                </h3>
                <div className="input">
                    {InputRender(disabledCondition)}
                    <div>
                        {questData && (
                            <>
                                <p className="text-primary-100 text-sm font-medium">
                                    {`${t("markets", {
                                        questions: questions / questions,
                                    })}`}
                                </p>
                                {Array.from(Array(questions).keys()).map(
                                    qnum => {
                                        return (
                                            <div
                                                className="flex flex-row items-center justify-between mt-2"
                                                key={String(qnum)}
                                            >
                                                <p className="text-primary-200 text-xs font-medium">
                                                    {` ${qnum +
                                                        1}. ${shortenName(
                                                        formatQuestion(
                                                            markets[qnum]
                                                                .question
                                                        ),
                                                        32
                                                    )}`}
                                                </p>
                                                <p className="animate-pulse text-primary-100 text-xs font-medium break-words whitespace-nowrap">
                                                    {amount > 0
                                                        ? `${toDecimals(
                                                              amount / questions
                                                          )} ${predictableToken}`
                                                        : "---"}
                                                </p>
                                            </div>
                                        );
                                    }
                                )}
                                <div className="flex justify-between mt-6">
                                    <span className="text-primary-100 text-sm font-medium">
                                        {t("Potential Earnings")}
                                    </span>
                                    <span className="text-primary-success text-sm">
                                        {`${toDecimals(
                                            estimatedEarnings,
                                            2
                                        )} ${returnCurrencyName(
                                            predictableToken
                                        )}`}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                    {loading ? (
                        <div className="flex flex-row justify-center w-full mt-8 ">
                            <LoadingIcon className="animate-spin origin-center h-10 animate" />
                        </div>
                    ) : !account ? (
                        <button
                            type="button"
                            className={`bg-primary-blue inline-flex w-full items-center justify-center px-4 py-2 mt-8  border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-white
                            `}
                            onClick={toggleWalletModal}
                        >
                            {t("Connect Wallet")}
                        </button>
                    ) : account && !validNetwork(chainId) ? (
                        <div className=" flex itsems-center justify-center h-96 mx-4">
                            <WrongConnectWalletModal />
                        </div>
                    ) : balance[predictableToken] === 0 ? (
                        <div className="h-full mt-1 py-6 pt-6 pb-0.5 sm:my-12 flex items-center flex-col justify-center">
                            <InsufficientBalance />
                            {predictableToken === PREDICT_TOKENS.BGN && (
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            connectWalletOrDeposit();
                                        }}
                                        className="inline-flex items-center justify-center  border-2 border-primary-blue  my-auto p-2 sm:w-[240px] w-full text-sm font-medium rounded-md shadow-sm text-primary-blue"
                                    >
                                        {t(showInfo())}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            type="button"
                            className={`
                            ${
                                amount <= 0 ||
                                amount > balance[predictableToken]
                                    ? "bg-footer-text opacity-20"
                                    : "bg-footer-text"
                            } inline-flex w-full items-center justify-center px-4 py-2 mt-8  border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-white
                            `}
                            disabled={
                                amount <= 0 ||
                                amount > balance[predictableToken]
                            }
                            onClick={() => {
                                onPlacebet();
                                handleGaEvent(
                                    `QUEST ${predictableToken} CONFIRM CLICKED`
                                );
                            }}
                        >
                            {t("Confirm")}
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="rounded w-full sm:w-[30%]">
                {inResolution || ended ? (
                    <RenderUIResolutionSection
                        tag={tag}
                        questData={questData}
                        data={data}
                        isAnswered={isAnswered}
                        userData={userData}
                        outcomeRatio={outcomeRatio}
                        ended={ended}
                    />
                ) : expired || startsin ? (
                    <RenderEndedSection
                        tag={tag}
                        questData={questData}
                        data={data}
                        isAnswered={isAnswered}
                        userData={userData}
                        ended={ended}
                        expired={expired}
                        startsin={startsin}
                        questId={questId}
                    />
                ) : answered ? (
                    <RenderAnsweredSection
                        tag={tag}
                        questData={questData}
                        data={data}
                        isAnswered={isAnswered}
                        userData={userData}
                        outcomeRatio={outcomeRatio}
                        answered={answered}
                    />
                ) : (
                    renderEnterAmountSection()
                )}

                <div className="bg-quest-contract-section rounded-b-[10px]  py-2 flex items-center justify-center">
                    <a
                        href={getEtherscanLink(
                            selectedChainId,
                            contractAddress,
                            "address"
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className=" text-primary-100 flex gap-1 text-xs font-medium"
                    >
                        <span>
                            {contractAddress ? (
                                <>
                                    {`${t("Contract")} ${shortenAddress(
                                        contractAddress
                                    )}`}
                                </>
                            ) : (
                                <div className="w-14 h-2">
                                    <QuickSwapLoader />
                                </div>
                            )}
                        </span>
                        <LinkIcon className="fill-asset-text" />
                    </a>
                </div>
            </div>
        </>
    );
};
export default OutcomeForm;
