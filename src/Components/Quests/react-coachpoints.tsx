// import { updateCoachPoints } from "@Reducers/trade";
import React, { useEffect, useReducer } from "react";
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import { isMobile } from "react-device-detect";
import { updateCoachpoints } from "@Reducers/trade";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@Redux/store";
import { initialPredictableToken } from "@Utils";
import { ChainId } from "@Components/Constants";
import resolveConfig from "tailwindcss/resolveConfig";
import { useTranslation } from "react-i18next";
import { FEATURES_ACTIVE } from "@Constants";
import tailwindConfig from "../../../tailwind.config";

/* TEXTS ARE USED FOR TRANSLATIONS. ADDDED IN COMMON.JSON */
const ReactCoachPoints = ({ page }) => {
    const { coachPoints, selectedChainId } = useSelector((state: AppState) => {
        return state.prediction;
    });
    const tokenName = initialPredictableToken(selectedChainId);
    const { t } = useTranslation();
    const predictionSteps = [
        {
            target: ".asset",
            continuous: true,
            locale: "1/2",
            content:
                selectedChainId === ChainId.MaticMainnet ? (
                    <div>{t("Matic Game Token Support")}</div>
                ) : (
                    <div>{t("BGN Game Token Support")}</div>
                ),
            disableBeacon: true,
            placement: isMobile ? "bottom" : "right",
            disableOverlayClose: true,
            spotlightClicks: true,
            styles: {
                options: {
                    right: "75px",
                },
            },
            title:
                selectedChainId === ChainId.MaticMainnet
                    ? t("New Currencies Added")
                    : t("Multiple Currencies"),
        },
        {
            target: ".profile",
            placement: "bottom",
            content: (
                <div>
                    {FEATURES_ACTIVE[selectedChainId].lossless
                        ? `${t("Evaluate your prediction activity", {
                              tokenName,
                          })}`
                        : "Evaluate your prediction activity, balances, and Profit & Loss."}
                </div>
            ),
            disableBeacon: true,
            title: t("Analyze Porfolio"),
        },
        {
            target: ".history",
            placement: "bottom",
            content: <div>{t("CoachPoints History")}</div>,
            disableBeacon: true,
            title: t("Review Prediction History"),
        },
        {
            target: ".leaderboard",
            placement: "bottom",
            content: <div>{t("CoachPoints Leaderboard")}</div>,
            disableBeacon: true,
            title: t("Explore Leaderboard"),
        },
    ];

    const predictionStepsMweb = [
        {
            target: ".asset",
            continuous: true,
            locale: "1/2",
            content:
                selectedChainId === ChainId.MaticMainnet ? (
                    <div>{t("Matic Game Token Support")}</div>
                ) : (
                    <div>{t("BGN Game Token Support")}</div>
                ),
            disableBeacon: true,
            placement: isMobile ? "bottom" : "right",
            disableOverlayClose: true,
            spotlightClicks: true,
            styles: {
                options: {
                    right: "75px",
                },
            },
            title:
                selectedChainId === ChainId.MaticMainnet
                    ? t("New Currencies Added")
                    : t("Multiple Currencies"),
        },
        {
            target: ".historymweb",
            placement: "bottom",
            content: (
                <div>
                    <ul className="list-decimal pl-4 space-y-2">
                        <li>
                            <div>
                                {FEATURES_ACTIVE[selectedChainId].lossless
                                    ? `${t(
                                          "Evaluate your prediction activity",
                                          {
                                              tokenName,
                                          }
                                      )}`
                                    : `Evaluate your prediction activity, balances, and Profit & Loss.`}
                            </div>
                        </li>
                        <li>{t("CoachPoints History")}</li>
                        <li>{t("CoachPoints Leaderboard")}</li>
                    </ul>
                </div>
            ),
            disableBeacon: true,
            title: t("Explore Actions"),
        },
    ];

    const profileSteps = [
        {
            target: ".deposit",
            continuous: true,
            locale: "1/2",
            content: (
                <>
                    <div>
                        {t("Deposit token to recieve BGN tokens", {
                            tokenName,
                        })}
                    </div>
                </>
            ),
            disableBeacon: true,
            placement: isMobile ? "bottom" : "right",
            disableOverlayClose: true,
            spotlightClicks: true,
            styles: {
                options: {
                    right: "75px",
                },
            },
            title: `${t("Profile Deposit", { tokenName })}`,
        },
        {
            target: ".repeat",
            placement: "bottom",
            content: <div>{t("Reset your BGN balance")}</div>,
            disableBeacon: true,
            title: t("Reset BGN Balance"),
        },
        {
            target: ".withdraw",
            placement: "bottom",
            content: (
                <div>
                    {t(
                        "Withdraw your BGN balance along with the accumulated APY"
                    )}
                </div>
            ),
            disableBeacon: true,
            title: t("Withdraw $BGN Balance"),
        },
        {
            target: ".reinvest",
            placement: "bottom",
            content: <div>{t("Reinvest BRN tokens text")}</div>,
            disableBeacon: true,
            title: t("Reinvest BRN Tokens"),
        },
        {
            target: ".claim",
            placement: "bottom",
            content: <div>{`Convert your $BRN tokens to $${tokenName}.`}</div>,
            disableBeacon: true,
            title: "Convert $BRN Tokens!",
        },
    ];

    const renderPageSpecificSteps = pageName => {
        const tourSteps: any = [];
        if (pageName === "main") {
            isMobile
                ? tourSteps.push(predictionStepsMweb)
                : tourSteps.push(predictionSteps);
        } else {
            tourSteps.push(profileSteps);
        }
        return tourSteps;
    };

    const steps = renderPageSpecificSteps(page);
    const TOUR_STEPS = steps[0];
    const INITIAL_STATE = {
        key: new Date(),
        run: false,
        continuous: true,
        loading: false,
        stepIndex: 0,
        steps: TOUR_STEPS,
    };

    // Set up the reducer function
    const reducer = (state = INITIAL_STATE, action) => {
        switch (action.type) {
            case "START":
                return { ...state, run: true };
            case "RESET":
                return { ...state, stepIndex: 0 };
            case "STOP":
                return { ...state, run: false };
            case "NEXT_OR_PREV":
                return { ...state, ...action.payload };
            case "RESTART":
                return {
                    ...state,
                    stepIndex: 0,
                    run: true,
                    loading: false,
                    key: new Date(),
                };
            default:
                return state;
        }
    };

    const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);
    const dispatchPredcition = useDispatch();

    useEffect(() => {
        dispatch({ type: "START" });
    }, []);

    const handleClosingCoachPointsState = () => {
        if (page === "main") {
            dispatchPredcition(
                updateCoachpoints({
                    ...coachPoints,
                    mainSection: true,
                })
            );
        }
        if (page === "profile") {
            dispatchPredcition(
                updateCoachpoints({
                    ...coachPoints,
                    profile: true,
                })
            );
        }
    };

    const callback = data => {
        const { action, index, type, status } = data;
        if (
            action === ACTIONS.CLOSE ||
            (status === STATUS.SKIPPED && tourState.run) ||
            status === STATUS.FINISHED
        ) {
            dispatch({ type: "STOP" });
            // handleClosingCoachPointsState();
        } else if (
            type === EVENTS.STEP_AFTER ||
            type === EVENTS.TARGET_NOT_FOUND
        ) {
            dispatch({
                type: "NEXT_OR_PREV",
                payload: {
                    stepIndex: index + (action === ACTIONS.PREV ? -1 : 1),
                },
            });
        }

        if (status === STATUS.FINISHED) {
            handleClosingCoachPointsState();
        }
    };

    const fullConfig = resolveConfig(tailwindConfig);

    return (
        <>
            <JoyRide
                start
                {...tourState}
                callback={callback}
                disableOverlayClose
                disableScrollParentFix
                scrollOffset={isMobile ? 70 : 300}
                showProgress
                floaterProps={{ disableAnimation: true }}
                hideCloseButton
                styles={{
                    options: {
                        arrowColor: fullConfig.theme.colors["history-section"],
                        backgroundColor:
                            fullConfig.theme.colors["history-section"],
                    },
                    tooltip: {
                        width: "352px",

                        padding: "16px",
                        borderRadius: "8px",
                        marginLeft: isMobile ? "1px" : "",
                        marginRight: isMobile ? "4px" : "",
                    },
                    tooltipContent: {
                        padding: "8px 0px 16px 0px",
                        color: fullConfig.theme.colors["primary-200"],
                    },
                    tooltipTitle: {
                        fontWeight: "500",
                        fontSize: "16px",
                        lineHeight: "24px",
                    },
                    tooltipContainer: {
                        textAlign: "left",
                        fontSize: "14px",
                        fontWeight: "500",
                        lineHeight: "22px",
                        color: fullConfig.theme.colors["primary-100"],
                    },
                    buttonNext: {
                        backgroundColor:
                            fullConfig.theme.colors["coachpoint-button"],
                        borderRadius: 4,
                        color: "#fff",
                        padding: "5px 32px 5px 32px",
                        fontWeight: "500",
                        fontSize: "14px",
                        lineHeight: "22px",
                        text: "NEXT (1/2)",
                        outline: "none",
                    },
                    tooltipFooter: {
                        marginTop: "0",
                    },
                    buttonBack: {
                        marginRight: 16,
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHeight: "22px",
                        color: fullConfig.theme.colors["coachpoint-button"],
                        padding: "5px 32px 5px 32px",
                        border: `2px solid ${fullConfig.theme.colors["coachpoint-button"]}`,
                        borderRadius: "8px",
                        outline: "none",
                    },
                }}
                locale={{
                    last: "Done",
                }}
                continuous
                debug
            />
        </>
    );
};

export default ReactCoachPoints;
