import React from "react";

const StackedQuestion = () => {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1 12.6923L9 17L17 12.6923"
                stroke="#696C80"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1 9L9 13.3077L17 9"
                stroke="#696C80"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1 5.30769L9 9.61538L17 5.30769L9 1L1 5.30769Z"
                stroke="#696C80"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default StackedQuestion;
