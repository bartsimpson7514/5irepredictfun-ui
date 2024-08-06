import React from "react";

function IconNext({ ...props }) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                stroke={props.color}
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.6667 8.99998L7.22223 6.33331V11.6666L11.6667 8.99998Z"
                fill={props.color}
                stroke={props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default IconNext;
