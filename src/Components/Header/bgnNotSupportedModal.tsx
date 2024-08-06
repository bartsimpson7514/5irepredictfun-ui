import React, { FC, useRef } from "react";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useWeb3React } from "@web3-react/core";
import { PREDICT_TOKENS } from "@Constants";
import ButtonCTA from "@Basic/ButtonCTA";
import ModalComponent from "@Basic/Modal";
import { updatePredictableToken } from "@Reducers/trade";
import { useWalletModalToggle } from "@Reducers/trade/hooks";
import { useTranslation } from "react-i18next";

interface IBGNNotSupportedModal {
    open: boolean;
    onClose: () => void;
}
export const BGNNotSupportedModal: FC<IBGNNotSupportedModal> = ({
    open,
    onClose,
}) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const { account } = useWeb3React();
    const alert = useAlert();
    const dispatch = useDispatch();
    const toggleWalletModal = useWalletModalToggle();
    const { t } = useTranslation();

    const onSwitchToBNB = async () => {
        if (!account) {
            toggleWalletModal();
        } else {
            dispatch(updatePredictableToken(PREDICT_TOKENS.BNB));
            onClose();
            alert.success(t("CurrencyChangedText"));
        }
    };

    /* texts are used for internationalization */
    return (
        <ModalComponent
            open={open}
            modalRef={modalRef}
            cssstyle="sm:px-8 sm:py-8 px-4 py-6"
            width="max-w-[352px]"
        >
            <div className=" w-full  justify-between align-center text-center mt-4">
                <div className="flex justify-center">
                    <img src="/images/bhavish.png" alt="" />
                </div>

                <div className="text-lg font-normal text-primary-100 mt-6">
                    {t("NoBGNSupport")}
                </div>
                <div className="text-sm font-normal text-primary-200 mt-6">
                    {t("BGN_Support_OnBNB")}
                </div>
            </div>
            <ButtonCTA
                buttonFunction={() => onSwitchToBNB()}
                variant="bg-footer-text py-2.5 text-primary-white rounded-[10px] w-full text-sm font-medium bg-footer-text mt-6"
                text={!account ? "Connect Wallet" : "SwitchToBNB"}
            />
        </ModalComponent>
    );
};
