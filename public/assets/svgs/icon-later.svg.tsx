import React from "react";

function IconLater({ ...props }) {
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
                d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                strokeWidth="1.75"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9 5V9.5H13.5"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default IconLater;
