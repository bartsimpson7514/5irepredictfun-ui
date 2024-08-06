/* eslint-disable prettier/prettier */
import React from "react";

const ArrowCircleDown = ({ ...props }) => {
    return (
        <svg
            width="18"
            height="18"
            {...props}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9 1V17"
                stroke="#696C80"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1.5 10L9 17L16.5 10"
                stroke="#696C80"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ArrowCircleDown;
