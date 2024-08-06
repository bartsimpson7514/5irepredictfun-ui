import React from "react";

function LostTag({ ...props }) {
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
                    d="M4.1572 1H7.8428C7.99014 1 8.13145 1.05853 8.23564 1.16272L10.8373 3.76436C10.9415 3.86855 11 4.00986 11 4.1572V7.8428C11 7.99014 10.9415 8.13145 10.8373 8.23564L8.23564 10.8373C8.13145 10.9415 7.99014 11 7.8428 11H4.1572C4.00986 11 3.86855 10.9415 3.76436 10.8373L1.16272 8.23563C1.05853 8.13145 1 7.99014 1 7.8428V4.1572C1 4.00986 1.05853 3.86855 1.16272 3.76437L3.76436 1.16272C3.86855 1.05853 4.00986 1 4.1572 1Z"
                    stroke="#E0476A"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M7.11114 7.11111L4.88892 4.88889"
                    stroke="#E0476A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M7.11111 4.88889L4.88889 7.11111"
                    stroke="#E0476A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    );
}

export default LostTag;
