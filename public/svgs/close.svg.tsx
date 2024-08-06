import React from "react";

function Icon({ ...props }) {
    return (
        <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 20 20"
            {...props}
        >
            <path d="M18 6L6 18" />
            <path d="M6 6L18 18" />
        </svg>
    );
}

export default Icon;
