import TickMark from "@Public/svgs/Tickmark.svg";
import React from "react";

const CheckBox = ({ isTrue }) => {
    return (
        <div
            className={`w-[11.64px] h-[11.64px] border-[1.5px] flex items-center p-[0.5px]  ${
                isTrue ? "border-primary-100" : "border-primary-200"
            }`}
        >
            {isTrue && <TickMark className="stroke-primary-100" />}
        </div>
    );
};

export default CheckBox;
