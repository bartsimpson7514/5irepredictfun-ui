import React from "react";

function Icon({ ...props }) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            {...props}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M13.3333 2.66663L2.66663 13.3333"
                stroke="#C7CAD9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.3333 13.3333L2.66663 2.66663"
                stroke="#C7CAD9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default Icon;
