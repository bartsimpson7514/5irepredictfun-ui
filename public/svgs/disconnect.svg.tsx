import React from "react";

function Icon({ ...props }) {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M7 9.25L9.25 7M9.25 7L7 4.75M9.25 7L1 7"
                stroke="#696C80"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1 3.25V1.75C1 1.33579 1.33579 1 1.75 1H12.25C12.6642 1 13 1.33579 13 1.75V12.25C13 12.6642 12.6642 13 12.25 13H1.75C1.33579 13 1 12.6642 1 12.25V10.75"
                stroke="#696C80"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default Icon;
