import React from "react";

function TimerIcon({ ...props }) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            {...props}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8.99816 17C12.9246 17 16.1076 13.8162 16.1076 9.88888C16.1076 5.96152 12.9246 2.77777 8.99816 2.77777C5.0717 2.77777 1.88867 5.96152 1.88867 9.88888C1.88867 13.8162 5.0717 17 8.99816 17Z"
                stroke="#696C80"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.99817 5.44444V9.88889H13.4416"
                stroke="#696C80"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.72309 1.00024L1 3.28571"
                stroke="#696C80"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16.9999 3.28547L14.2769 1"
                stroke="#696C80"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default TimerIcon;
