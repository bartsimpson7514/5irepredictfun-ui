import React from "react";
import CloseIcon from "public/svgs/close-icon.svg";
import WarningAlert from "public/svgs/warning-alert.svg";

const AlertMessage = ({ ...props }) => {
    return (
        <div className="bg-alert-background flex items-center py-[18px] px-4 gap-4 rounded-[10px] mlgh:mx-0 mx-6 box-border justify-between relative">
            <div className="flex gap-3 items-center  justify-between ">
                <div className="bg-[#251D13] rounded-full p-[6px] flex items-center justify-center">
                    <WarningAlert />
                </div>
                <div className="grow">{props.children}</div>
            </div>
            <button
                type="button"
                className="stroke-white"
                onClick={props.close}
            >
                <CloseIcon />
            </button>
        </div>
    );
};

export default AlertMessage;
