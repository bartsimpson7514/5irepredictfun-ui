/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { AbstractConnector } from "@web3-react/abstract-connector";
// import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { MagicConnector } from "@Connectors/magic";
import { getEtherscanLink } from "@Utils";
import SwitchIcon from "public/svgs/switch.svg";
import SettingsIcon from "public/svgs/settings-icon.svg";
import RightArrow from "@Public/svgs/right-arrow.svg";
import DisconnectIcon from "public/svgs/disconnect.svg";
import CopyIcon from "public/svgs/copy.svg";
import CheckIcon from "public/svgs/check.svg";
import LinkIcon from "public/svgs/link.svg";
import { MagicConnectorSocial } from "@Connectors/magicOAuth";
import { handleGaEvent } from "@Utils/googleanalytics";
import { INTEGRATIONS, TRANSACTION_VIEWER, WALLET_NAME } from "@Constants";
import { upperCase } from "@Utils/common";
import useCopyClipboard from "../../Hooks/useCopyCliboard";

import {
    useModalOpen,
    useTradeSettingModalToggle,
    useWalletModalToggle,
} from "../../Redux/Reducers/trade/hooks";
import {
    ApplicationModal,
    updateIsSocial,
    updateMagicEmail,
    updateWalletConnected,
} from "../../Redux/Reducers/trade";
import usePrevious from "../../Hooks/usePrevious";
import {
    fortmatic,
    frontierinjected,
    magicSetter,
    metamaskinjected,
} from "../../Connectors";
import { OVERLAY_READY } from "../../Connectors/Fortmatic";
import { AppState } from "../../Redux";
import Modal from "../Basic/BasicModal";
import PendingView from "./PendingView";
import {
    WALLET_VIEWS,
    SUPPORTED_WALLETS,
    // EthereumWalletsLink,
    // MagicWalletsLink,
} from "./consts";
import AccountView from "./AccountView";

const WalletModal = ({ setMagicLoading }) => {
    const {
        active,
        chainId,
        account,
        connector,
        activate,
        deactivate,
        error,
    } = useWeb3React();
    const walletModalOpen = useModalOpen(ApplicationModal.WALLET);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const toggleSettingModal = useTradeSettingModalToggle();

    const toggleWalletModal = useWalletModalToggle();

    const previousAccount = usePrevious(account);
    const activePrevious = usePrevious(active);
    const connectorPrevious = usePrevious(connector);

    const [pendingWallet, setPendingWallet] = useState<
        AbstractConnector | undefined
    >();
    const [pendingError, setPendingError] = useState<boolean>();
    const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);
    const {
        isDarkMode,
        isSocial,
        magicEmail,
        walletConnected,
        selectedChainId,
    } = useSelector((state: AppState) => state.prediction);
    const [isCopied, setCopied] = useCopyClipboard();

    enum SocialLoginOptions {
        "google",
        "twitter",
    }

    // close on connection, when logged out before
    useEffect(() => {
        if (account && !previousAccount && walletModalOpen) {
            toggleWalletModal();
        }
    }, [account, previousAccount, toggleWalletModal, walletModalOpen]);

    // always reset to account view
    useEffect(() => {
        if (walletModalOpen) {
            setPendingError(false);
            setWalletView(WALLET_VIEWS.ACCOUNT);
        }
    }, [walletModalOpen]);

    // close modal when a connection is successful
    useEffect(() => {
        if (
            walletModalOpen &&
            ((active && !activePrevious) ||
                (connector && connector !== connectorPrevious && !error))
        ) {
            setWalletView(WALLET_VIEWS.ACCOUNT);
        }
    }, [
        setWalletView,
        active,
        error,
        connector,
        walletModalOpen,
        activePrevious,
        connectorPrevious,
    ]);

    // close wallet modal if fortmatic modal is active
    useEffect(() => {
        fortmatic.on(OVERLAY_READY, () => {
            toggleWalletModal();
        });
    }, [toggleWalletModal]);

    const checkIfInstalled = connect => {
        if (
            connect === metamaskinjected &&
            typeof window !== "undefined" &&
            !(window.web3 || window.ethereum)
        ) {
            window.open("https://metamask.io/", "_blank");
            return true;
        }
        if (
            connect === frontierinjected &&
            typeof window !== "undefined" &&
            !(window.frontier || window?.ethereum?.isFrontier)
        ) {
            window.open("https://www.frontier.xyz/", "_blank");
            return true;
        }
        return false;
    };

    // eslint-disable-next-line no-shadow
    const tryActivation = async (connector: AbstractConnector | undefined) => {
        const ifInstalled = checkIfInstalled(connector);
        if (ifInstalled) {
            return;
        }
        const oldWallet = walletConnected;

        Object.keys(SUPPORTED_WALLETS).map(key => {
            if (connector === SUPPORTED_WALLETS[key].connector) {
                dispatch(updateWalletConnected(SUPPORTED_WALLETS[key].name));
                dispatch(updateMagicEmail(null));
                dispatch(updateIsSocial(false));
            } else if (
                connector instanceof MagicConnector ||
                connector instanceof MagicConnectorSocial
            ) {
                dispatch(updateWalletConnected(WALLET_NAME.Magiclink));
            }
            return false;
        });

        // log selected wallet

        setPendingWallet(connector); // set wallet for pending view
        setWalletView(WALLET_VIEWS.PENDING);

        if (connector) {
            // eslint-disable-next-line no-shadow
            await activate(connector, undefined, true).catch(errormesg => {
                if (errormesg instanceof UnsupportedChainIdError) {
                    activate(connector); // a little janky...can't use setError because the connector isn't set
                } else {
                    setPendingError(true);
                    if (
                        !(
                            connector instanceof MagicConnector ||
                            connector instanceof MagicConnectorSocial
                        )
                    ) {
                        dispatch(updateWalletConnected(oldWallet));
                    }
                }
            });
        }
    };

    const [formData, setFormData] = useState("");

    const handleChange = e => {
        setFormData(e.target.value);
    };

    useEffect(() => {
        if (!account && formData) {
            tryActivation(
                magicSetter(
                    formData,
                    false,
                    magicEmail,
                    () => {
                        setMagicLoading(false);
                    },
                    selectedChainId
                )
            );
            setFormData("");
        }
    }, [account]);
    const deactivateAccount = async () => {
        await deactivate();
        dispatch(updateMagicEmail(null));
        dispatch(updateIsSocial(false));
    };

    const getWalletOptions = () => {
        const isMetamask =
            typeof window !== "undefined" &&
            window.ethereum &&
            window.ethereum.isMetaMask;

        return Object.keys(SUPPORTED_WALLETS).map(key => {
            const option = SUPPORTED_WALLETS[key];
            const icon = option.iconName
                ? `/images/wallets/${option.iconName}`
                : null;
            if (option.connector === metamaskinjected) {
                // don't show injected if there's no injected provider
                if (
                    typeof window !== "undefined" &&
                    !(window.web3 || window.ethereum)
                ) {
                    if (option.name === "MetaMask") {
                        return (
                            <button
                                key={key}
                                type="button"
                                className="flex flex-row gap-2 items-center sm:px-[8px] p-[12px] border border-transparent  hover:bg-token-dropdown-border hover:rounded-md  hover:border-cards-live-border"
                            >
                                <a
                                    href="https://metamask.io/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src={icon}
                                        alt="Icon"
                                        className="w-6 h-auto"
                                    />
                                </a>

                                <div className="font-medium whitespace-nowrap	 text-sm text-primary-100 leading-[22px]">
                                    {option.name}
                                </div>
                            </button>
                        );
                    }
                    if (option.name === "Frontier") {
                        return (
                            <button
                                key={key}
                                type="button"
                                className="flex flex-row gap-2 items-center sm:px-[8px] p-[12px] border border-transparent  hover:bg-token-dropdown-border hover:rounded-md  hover:border-cards-live-border"
                            >
                                <a
                                    href="https://www.frontier.xyz/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src={icon}
                                        alt="Icon"
                                        className="w-6 h-auto"
                                    />
                                </a>

                                <div className="font-medium whitespace-nowrap	 text-sm text-primary-100 leading-[22px]">
                                    {option.name}
                                </div>
                            </button>
                        );
                    }

                    return null; // dont want to return install twice
                }
                // don't return metamask if injected provider isn't metamask
                if (option.name === "MetaMask" && !isMetamask) {
                    return null;
                }
                // likewise for generic
                if (option.name === "Injected" && isMetamask) {
                    return null;
                }
            }

            return (
                <React.Fragment key={key}>
                    <button
                        type="button"
                        className="flex flex-row gap-2 items-center sm:px-[8px] p-[12px] border border-transparent  hover:bg-token-dropdown-border hover:rounded-md  hover:border-cards-live-border"
                        onClick={() => {
                            if (option.connector === connector) {
                                setWalletView(WALLET_VIEWS.ACCOUNT);
                            } else if (!option.href) {
                                tryActivation(option.connector);
                            }
                            handleGaEvent(upperCase(`${option.name} clicked`));
                        }}
                    >
                        <img src={icon} alt="Icon" className="w-6 h-auto" />
                        <div className="font-medium whitespace-nowrap	 text-sm text-primary-100 leading-[22px]">
                            {option.name}
                        </div>
                    </button>
                </React.Fragment>
            );
        });
    };

    const getOptions = () => {
        if (process.env.NEXT_PUBLIC_INTEGRATION === INTEGRATIONS.ZEBEC) {
            return;
        }
        // const isMetamask =
        //     typeof window !== "undefined" &&
        //     window.ethereum &&
        //     window.ethereum.isMetaMask;

        const activateEmail = async () => {
            dispatch(updateMagicEmail(formData));
            dispatch(updateIsSocial(false));
            if (account) {
                await deactivateAccount();
            } else {
                tryActivation(
                    magicSetter(
                        formData,
                        false,
                        magicEmail,
                        () => {
                            setMagicLoading(false);
                        },
                        selectedChainId
                    )
                );
            }

            setMagicLoading(true);
        };

        const activateSocial = async SocialLoginOption => {
            await deactivateAccount();

            dispatch(updateMagicEmail(SocialLoginOption));
            dispatch(updateIsSocial(true));
            tryActivation(
                magicSetter(
                    SocialLoginOption,
                    true,
                    magicEmail,
                    () => {
                        dispatch(updateWalletConnected(null));
                        setMagicLoading(false);
                    },
                    selectedChainId
                )
            );
        };

        return (
            <div className="w-full">
                <div className="bg-modal-content rounded-2xl p-4 my-1">
                    <div className="text-primary-100 font-normal text-[16px] leading-6 mb-6">
                        {t("Login_Text")}
                    </div>
                    <div className="relative p-3 rounded-md flex flex-row border-2 border-input-border bg-input-background">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder={t("Enter Email here")}
                            className="w-full  relative text-md font-normal bg-transparent text-primary-100 focus:outline-none realtive"
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className={`rounded-md flex items-center justify-center text-sm text-primary-100 ${
                                formData === "" ? "opacity-30" : ""
                            }`}
                            onClick={() => {
                                activateEmail();

                                handleGaEvent("MAGIC LINK EMAIL ENTERED");
                            }}
                            disabled={formData === ""}
                        >
                            <RightArrow className="stroke-cards-live-border" />
                        </button>
                    </div>
                </div>
                <div className="bg-modal-content rounded-2xl p-4 my-1">
                    <div className="flex flex-row items-left justify-left text-primary-100 font-normal text-[16px] eading-6 leading-6  mb-6">
                        {t("Login via Social")}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="py-2 px-3">
                            <button
                                type="button"
                                onClick={() => {
                                    activateSocial(SocialLoginOptions[0]);
                                    handleGaEvent("GOOGLE LOGIN CLICKED");
                                }}
                                className="flex gap-2 items-center"
                            >
                                <img
                                    src="/images/wallets/google.svg"
                                    alt="Icon"
                                    className="w-6 h-6"
                                />
                                <span className="text-primary-100 text-sm leading-[22px]">
                                    {t("Google")}
                                </span>
                            </button>
                        </div>
                        <div className="py-2 px-3">
                            <button
                                type="button"
                                onClick={() => {
                                    activateSocial(SocialLoginOptions[1]);
                                    handleGaEvent("TWITTER LOGIN CLICKED");
                                }}
                                className="flex gap-2 items-center"
                            >
                                <img
                                    src="/images/wallets/twitter.svg"
                                    alt="Icon"
                                    className="w-6 h-6"
                                />
                                <span className="text-primary-100 text-sm leading-[22px">
                                    {t("Twitter")}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const getModalContent = () => {
        // if (error) {
        //     deactivate();
        // }

        if (account && walletView === WALLET_VIEWS.ACCOUNT) {
            return (
                <>
                    <AccountView
                        openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
                    />
                    <section className="grid grid-cols-3 grid-rows-2 items-center mt-4 w-full justify-center gap-2 sm:gap-4">
                        {account && (
                            <button
                                type="button"
                                onClick={() => setCopied(account)}
                                className="text-sm text-primary-100 outline-none focus:outline-none transition-all duration-300 mr-2 flex items-center"
                            >
                                {isCopied ? (
                                    <>
                                        <CheckIcon className="mr-1 stroke-primary-200 text-sm leading-4 h-3 w-3" />
                                        <span className="text-primary-200 text-sm font-normal">
                                            {t("Copied")}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <CopyIcon className="mr-1 stroke-primary-200 text-sm leading-4 h-3 w-3" />
                                        <span className="text-primary-200 text-sm font-normal">
                                            {t("Copy")}
                                        </span>
                                    </>
                                )}
                            </button>
                        )}
                        {account && chainId && (
                            <a
                                href={getEtherscanLink(
                                    chainId,
                                    account,
                                    "address"
                                )}
                                rel="noreferrer"
                                target="_blank"
                                className="text-sm leading-4 text-primary-100  hover:text-gray-700 hover:underline transition-all duration-300 flex items-center"
                            >
                                <LinkIcon className="h-3 w-3" />
                                <span className="text-primary-200 text-sm font-normal ml-1">
                                    {TRANSACTION_VIEWER[chainId]}
                                </span>
                            </a>
                        )}
                        <button
                            type="button"
                            onClick={() => setWalletView(WALLET_VIEWS.OPTIONS)}
                            className=" text-sm leading-4 text-primary-100  hover:text-gray-700 hover:underline transition-all duration-300 flex items-center"
                        >
                            <SwitchIcon className="mr-1 h-3 w-3" />
                            <span className="text-primary-200 text-sm font-normal">
                                {t("Wallet")}
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                deactivate();
                                dispatch(updateWalletConnected(null));
                                dispatch(updateMagicEmail(null));
                                dispatch(updateIsSocial(false));
                                setFormData("");
                                handleGaEvent("WALLET DISCONNECTED");
                            }}
                            className="text-sm leading-4 text-primary-100  hover:text-gray-700 hover:underline transition-all duration-300 flex items-center"
                        >
                            <DisconnectIcon className="mr-1 h-3 w-3" />
                            <span className="text-primary-200 text-sm font-normal">
                                {t("Disconnect")}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                toggleSettingModal();
                            }}
                            className="text-sm leading-4 text-primary-100  hover:text-gray-700 hover:underline transition-all duration-300 flex items-center"
                        >
                            <SettingsIcon className="mr-1" />
                            <span className="text-primary-200 text-sm font-normal">
                                {t("Settings")}
                            </span>
                        </button>
                    </section>
                </>
            );
        }

        return (
            <>
                {walletView === WALLET_VIEWS.PENDING && (
                    <PendingView
                        connector={pendingWallet}
                        error={pendingError}
                        setPendingError={setPendingError}
                        tryActivation={tryActivation}
                    />
                )}
                {walletView !== WALLET_VIEWS.PENDING &&
                    walletView !== WALLET_VIEWS.MAGICEMAIL && (
                        <>
                            <div className="flex gap-x-6 justify-center flex-row   flex-wrap">
                                <div className="w-full items-center bg-modal-content rounded-2xl">
                                    <div className="text-primary-100 font-normal text-[16px] leading-6 px-4 pt-4">
                                        <span>{t("Wallet")}</span>
                                    </div>
                                    <div
                                        className="grid grid-cols-2 justify-center sm:pl-4 pl-1 pr-[26px] gap-2 mt-4 pb-4"
                                        style={{
                                            display: "grid",
                                        }}
                                    >
                                        {getWalletOptions()}
                                    </div>
                                </div>
                                {getOptions()}
                            </div>
                        </>
                    )}
                {walletView === WALLET_VIEWS.MAGICEMAIL && (
                    <div className="flex p-4  flex-row rounded-2xl dark:bg-gray-200 bg-white ">
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="border rounded-lg w-full h-10 appearance-none text-sm focus:outline-none placeholder:font-medium placeholder:text-primary-200 px-2 text-sm"
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="button"
                            className="bg-footer-text mt-6 w-full rounded-md flex items-center justify-center py-3 text-sm text-primary-100"
                            onClick={() => {
                                dispatch(updateMagicEmail(formData));
                                tryActivation(
                                    magicSetter(
                                        formData,
                                        isSocial,
                                        magicEmail,
                                        () => {
                                            setMagicLoading(false);
                                        },
                                        selectedChainId
                                    )
                                );
                            }}
                        >
                            {t("Log In or Sign Up")}
                        </button>
                    </div>
                )}
                {/* {walletView !== WALLET_VIEWS.PENDING && (
                    <span className="flex text-xs justify-start items-center mt-6 gap-1">
                        {`New? Learn more about `}
                        <a
                            href={EthereumWalletsLink}
                            className="text-primary hover:underline no-underline dark:text-primary-400"
                            rel="noreferrer"
                            target="_blank"
                        >
                            {` wallets `}
                        </a>
                        {` and `}
                        <a
                            href={MagicWalletsLink}
                            className="text-primary hover:underline no-underline dark:text-primary-400"
                            rel="noreferrer"
                            target="_blank"
                        >
                            {` magic link `}
                        </a>
                    </span>
                )} */}
            </>
        );
    };

    const backAvailable = !error && walletView !== WALLET_VIEWS.ACCOUNT;

    return (
        <Modal
            showBack={backAvailable}
            onBack={() => {
                if (backAvailable) {
                    setPendingError(false);
                    setWalletView(WALLET_VIEWS.ACCOUNT);
                }
            }}
            title={
                account && walletView === WALLET_VIEWS.ACCOUNT
                    ? "Account"
                    : "Connect a Wallet"
            }
            open={walletModalOpen}
            onClose={toggleWalletModal}
            testid="wallet-modal"
            variant={`${isDarkMode ? "dark" : ""}`}
            maxWidth="402px"
        >
            {getModalContent()}
        </Modal>
    );
};

// export default withTranslation("common")(WalletModal);
export default WalletModal;
