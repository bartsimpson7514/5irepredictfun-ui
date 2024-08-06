import React from "react";

function TieTag({ ...props }) {
    return (
        <>
            <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
                    stroke="#1C7EFF"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M4 7H8"
                    stroke="#1C7EFF"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M4 5H8"
                    stroke="#1C7EFF"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    );
}

export default TieTag;
