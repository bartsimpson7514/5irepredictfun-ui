import React from "react";
import Modal from "@Basic/BasicModal";
import { AppState } from "@Redux";
import { updateTermsAndConditionsModal } from "@Redux/Reducers/trade";
import { useDispatch, useSelector } from "react-redux";
import ScrollEffect from "@Components/ScrollEffect";
import { useTranslation } from "react-i18next";

const TermsAndConditionsModal = () => {
    const dispatch = useDispatch();
    const { isDarkMode } = useSelector((state: AppState) => state.prediction);
    const { t } = useTranslation();

    /* Texts are used for Internalization */
    return (
        <Modal
            showBack={false}
            showClose={false}
            title="Disclosure"
            open
            variant={`${isDarkMode ? "dark" : ""}`}
        >
            <div>
                <div className="bg-gray-200 flex flex-col relative">
                    <ScrollEffect variant="h-60">
                        <div className="text-sm m-4 rounded-md flex flex-col gap-2 text-primary-200 opacity-80">
                            <p>{t("TermsConditions_Modal_ParaOne")}</p>
                            <p>{t("TermsConditions_Modal_ParaTwo")}</p>
                        </div>
                    </ScrollEffect>
                </div>

                <div className="text-sm my-4">
                    {`${t("Click_Proceed_Text")} `}
                    <a href="/" target="_blank" rel="noreferrer">
                        <span className="curosr text-primary-blue font-semibold underline">
                            {t("Terms of Use")}
                        </span>
                    </a>
                    {" & "}
                    <a href="/" target="_blank" rel="noreferrer">
                        <span className="curosr text-primary-blue font-semibold underline">
                            {t("Risk Disclosure")}
                        </span>
                    </a>
                    .
                </div>
                <button
                    type="button"
                    className={`p-2 uppercase bg-footer-text text-primary-white rounded-md w-full items-center flex text-sm font-medium justify-center `}
                    onClick={() => {
                        dispatch(updateTermsAndConditionsModal(false));
                    }}
                >
                    {t("Proceed")}
                </button>
            </div>
        </Modal>
    );
};

// export default withTranslation("common")(WalletModal);
export default TermsAndConditionsModal;
