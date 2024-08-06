import React from "react";

function TooltipArrow({ ...props }) {
    return (
        <svg width="8" height="8" {...props}>
            <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
        </svg>
    );
}

export default TooltipArrow;
