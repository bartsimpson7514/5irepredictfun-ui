import React from "react";

function CardLoader({ ...props }) {
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
                    d="M12.3334 1.33333L7.00002 6.66667L1.66669 1.33333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    );
}

export default CardLoader;
