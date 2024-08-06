import React, { FC, useRef, useState } from "react";
import CloseIcon from "public/svgs/close.svg";
import ModalComponent from "@Basic/Modal";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { handleGaEvent } from "@Utils/googleanalytics";
import { updateOnboardingModal } from "@Reducers/trade";
import { useDispatch, useSelector } from "react-redux";
import { useBGDepositModalToggle } from "@Reducers/trade/hooks";
import { initialPredictableToken } from "@Utils";
import { AppState } from "@Redux";
import { useTranslation } from "react-i18next";

interface OnboardingModal {
    open: boolean;
    onClose: () => void;
}

const Step = ({
    animationSrc,
    heading,
    description,
    continueHandler,
    continueText = "Continue",
}) => {
    const { t } = useTranslation();
    return (
        <div className="">
            <div className="">
                <img className="" src={animationSrc} alt={heading} />
            </div>
            <div className="mt-8 text-left">
                <h3 className="text-lg">{heading}</h3>
                <p className="text-xs text-primary-200">{description}</p>
                <div className="flex gap-2">
                    <button
                        type="button"
                        className=" items-center flex  justify-center py-2.5 px-3 text-white rounded text-sm font-medium bg-footer-text mt-8 mb-8"
                        onClick={continueHandler}
                    >
                        {t(continueText)}
                    </button>
                </div>
            </div>
        </div>
    );
};
export const OnboardingModal: FC<OnboardingModal> = ({ open, onClose }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const dispatch = useDispatch();
    const toggleDepositModal = useBGDepositModalToggle();
    const { selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    const token = initialPredictableToken(selectedChainId);
    const { t } = useTranslation();
    /* TEXTS ARE USED FOR TRANSLATIONS. ADDDED IN COMMON.JSON */
    return (
        <ModalComponent open={open} modalRef={modalRef}>
            <div className="flex items-center justify-end w-full">
                <CloseIcon
                    className="dark:text-primary-100 text-highlight cursor-pointer mb-2"
                    onClick={() => {
                        handleGaEvent(
                            `ONBOARDING CLOSED STEP AT ${currentSlide}`
                        );
                        onClose();
                    }}
                />
            </div>
            <Carousel
                autoPlay
                showThumbs={false}
                selectedItem={currentSlide}
                onChange={setCurrentSlide}
                showArrows={false}
                showStatus={false}
                transitionTime={500}
            >
                <Step
                    animationSrc={`/svgs/onboarding/videos/${token}/01.gif`}
                    heading={t("Hello User")}
                    description={t("stepOne", { token })}
                    continueHandler={() => {
                        setCurrentSlide(currentSlide + 1);
                    }}
                />
                <Step
                    animationSrc={`/svgs/onboarding/videos/${token}/02.gif`}
                    heading={t("deposit-to-recieve", { token })}
                    description={t("stepTwo")}
                    continueHandler={() => {
                        setCurrentSlide(currentSlide + 1);
                    }}
                    continueText={`${t("NextSlide", {
                        currentSilde: currentSlide,
                    })}`}
                />
                <Step
                    animationSrc={`/svgs/onboarding/videos/${token}/03.gif`}
                    heading={t("ExploreBhavish")}
                    description={t("stepThree")}
                    continueHandler={() => {
                        setCurrentSlide(currentSlide + 1);
                    }}
                    continueText={`${t("NextSlide", {
                        currentSilde: currentSlide,
                    })}`}
                />
                <Step
                    animationSrc={`/svgs/onboarding/videos/${token}/04.gif`}
                    heading={t("WinBhavish")}
                    description={t("StepFour")}
                    continueHandler={() => {
                        setCurrentSlide(currentSlide + 1);
                    }}
                    continueText={`${t("NextSlide", {
                        currentSilde: currentSlide,
                    })}`}
                />
                <Step
                    animationSrc={`/svgs/onboarding/videos/${token}/05.gif`}
                    heading={t("WithdrawBGN")}
                    description={t("StepFive")}
                    continueHandler={() => {
                        setCurrentSlide(currentSlide + 1);
                    }}
                    continueText={`${t("NextSlide", {
                        currentSilde: currentSlide,
                    })}`}
                />
                <Step
                    animationSrc={`/svgs/onboarding/videos/${token}/06.gif`}
                    heading={t("ThatsIt")}
                    description={t("StepSix", { token })}
                    continueText={`${t("DepositToken", { token })}`}
                    continueHandler={() => {
                        dispatch(updateOnboardingModal(false));
                        onClose();
                        toggleDepositModal();
                        setCurrentSlide(currentSlide + 1);
                    }}
                />
            </Carousel>
        </ModalComponent>
    );
};
