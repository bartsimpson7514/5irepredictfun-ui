import React from "react";

function TickMark({ ...props }) {
    return (
        <svg
            width="8"
            height="6"
            viewBox="0 0 8 6"
            fill="none"
            {...props}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6.75 1.5L3.08125 5L1.25 3.25"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default TickMark;
