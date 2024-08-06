import React from "react";
import CloseIcon from "public/svgs/close-icon.svg";

const ZebecAlertMessage = ({ ...props }) => {
    return (
        <div className="bg-[#1A1B1F] flex items-center  py-[6px] px-4 gap-4  box-border justify-center relative">
            <div className="flex gap-3 items-center  justify-between ">
                <div className="grow">{props.children}</div>
            </div>
            <button
                type="button"
                className="absolute w-4 h-4 right-0 mr-6"
                onClick={props.close}
            >
                <CloseIcon />
            </button>
        </div>
    );
};

export default ZebecAlertMessage;
