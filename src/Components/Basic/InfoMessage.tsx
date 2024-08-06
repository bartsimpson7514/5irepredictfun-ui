import React from "react";
import InfoIcon from "public/svgs/info-icon.svg";

const InfoMessage = ({ ...props }) => {
    return (
        <div className="bg-[#232F45] flex items-center justify-center py-[15px] px-4 gap-10 rounded-[10px] mx-6  box-border relative">
            <div className="flex gap-[6px] items-center justify-between ">
                <div className="bg-[#448AFF] rounded-full p-[3.2px] flex items-center justify-center">
                    <InfoIcon />
                </div>
                <div className="grow">{props.children}</div>
            </div>
        </div>
    );
};

export default InfoMessage;
