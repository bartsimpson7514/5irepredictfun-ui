import React from "react";
import CloseIcon from "public/svgs/Zeroswap/close-icon.svg";

const ZeroSwapAlertMessage = ({ ...props }) => {
    return (
        <div className="bg-alert-background flex items-center relative py-[18px] px-4 gap-4  box-border justify-center relative">
            <div className="flex gap-3 items-center  justify-between ">
                <div className="grow">{props.children}</div>
            </div>
            <button
                type="button"
                className="absolute right-0 mr-6"
                onClick={props.close}
            >
                <CloseIcon />
            </button>
        </div>
    );
};

export default ZeroSwapAlertMessage;
