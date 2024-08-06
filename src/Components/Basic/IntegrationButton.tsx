import { INTEGRATIONS } from "@Constants";
import React from "react";

const IntegrationButton = ({
    onClick,
    content,
    style = {},
    className = "",
    disabled = false,
}) => {
    switch (process.env.NEXT_PUBLIC_INTEGRATION) {
        case INTEGRATIONS.BHAVISH:
        case INTEGRATIONS.QUICKSWAP:
        case INTEGRATIONS.ZEROSWAP:
        case INTEGRATIONS.ONYX:
            return (
                <button
                    type="button"
                    className={className}
                    onClick={onClick}
                    style={style}
                    disabled={disabled}
                >
                    {content()}
                </button>
            );
        case INTEGRATIONS.ZEBEC:
            return (
                <div
                    style={style}
                    className="p-[1px]  bg-gradient-to-r from-[#08E0A3] w-full to-[#E0AE1F] rounded-[6px]"
                >
                    <button
                        type="button"
                        disabled={disabled}
                        className="sm:py-[5px] w-full sm:relative sm:px-3 px-2 py-2 hover:bg-opacity-70 rounded-md bg-[#1A1B1F] text-primary-white"
                        onClick={onClick}
                    >
                        {content()}
                    </button>
                </div>
            );
        default:
            return (
                <button
                    type="button"
                    className={className}
                    onClick={onClick}
                    style={style}
                    disabled={disabled}
                >
                    {content()}
                </button>
            );
    }
};

export default IntegrationButton;
