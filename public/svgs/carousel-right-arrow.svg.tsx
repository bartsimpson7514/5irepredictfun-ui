import React from "react";

function CarouselRightArrow({ ...props }) {
    return (
        <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M0.299999 6.20002L5.3 1.20002C5.7 0.800024 6.3 0.800024 6.7 1.20002C7.1 1.60002 7.1 2.20002 6.7 2.60002L3.4 5.90002H11C11.6 5.90002 12 6.30002 12 6.90002C12 7.50002 11.6 7.90002 11 7.90002H3.4L6.7 11.2C7.1 11.6 7.1 12.2 6.7 12.6C6.3 13 5.7 13 5.3 12.6L0.299999 7.60003C-0.1 7.30002 -0.1 6.60002 0.299999 6.20002Z"
                fill="white"
            />
        </svg>
    );
}

export default CarouselRightArrow;
