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
                d="M10.4287 7.85718L13.0001 10.4286L10.4287 13"
                stroke="#696C80"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1 10.4286H13"
                stroke="#696C80"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.57143 6.14286L1 3.57143L3.57143 1"
                stroke="#696C80"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13 3.57141L1 3.57141"
                stroke="#696C80"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default Icon;
