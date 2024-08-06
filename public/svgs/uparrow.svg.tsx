import React from "react";

function UpArrow({ ...props }) {
    return (
        <>
            <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <path
                    d="M12.3334 6.66666L7.00002 1.33332L1.66669 6.66666"
                    stroke="#448AFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    );
}

export default UpArrow;
