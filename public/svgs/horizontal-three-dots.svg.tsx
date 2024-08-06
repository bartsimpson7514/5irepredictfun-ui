import React from "react";

function MwebThreeDotsIcon({ ...props }) {
    return (
        <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect
                x="0.75"
                y="0.75"
                width="34.5"
                height="34.5"
                rx="7.25"
                stroke="#232734"
                strokeWidth="1.5"
            />
            <path
                d="M16 18C16 19.1046 16.8954 20 18 20C19.1046 20 20 19.1046 20 18C20 16.8954 19.1046 16 18 16C16.8954 16 16 16.8954 16 18Z"
                fill="#696C80"
            />
            <path
                d="M23 18C23 19.1046 23.8954 20 25 20C26.1046 20 27 19.1046 27 18C27 16.8954 26.1046 16 25 16C23.8954 16 23 16.8954 23 18Z"
                fill="#696C80"
            />
            <path
                d="M9 18C9 19.1046 9.89543 20 11 20C12.1046 20 13 19.1046 13 18C13 16.8954 12.1046 16 11 16C9.89543 16 9 16.8954 9 18Z"
                fill="#696C80"
            />
        </svg>
    );
}

export default MwebThreeDotsIcon;
