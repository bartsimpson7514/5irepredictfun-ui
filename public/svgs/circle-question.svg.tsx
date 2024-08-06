import React from "react";

function Icon({ ...props }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            fill="none"
            viewBox="0 0 11 11"
            stroke="currentColor"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.91"
                d="M5.094 8.12H5.1m-1.314-3.6a1.35 1.35 0 012.623.45c0 .9-1.35 1.35-1.35 1.35m4.536-.45a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
            />
        </svg>
    );
}

export default Icon;
