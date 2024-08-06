import React from "react";

function ArrowQuestRight({ ...props }) {
    return (
        <svg
            width="18"
            height="14"
            viewBox="0 0 18 14"
            fill="none"
            {...props}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1 7H17"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10 1L17 7L10 13"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default ArrowQuestRight;
