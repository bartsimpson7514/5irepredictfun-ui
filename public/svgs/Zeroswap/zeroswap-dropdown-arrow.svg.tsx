import React from "react";

function DropdownArrow({ ...props }) {
    return (
        <svg
            width="10"
            height="6"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M8.453.771H1.547c-.56 0-.84.677-.444 1.074l3.022 3.021a1.243 1.243 0 001.756 0l1.15-1.149 1.872-1.872A.631.631 0 008.453.77z"
                fill="current"
            />
        </svg>
    );
}

export default DropdownArrow;
