import React from "react";

function GridCardLoader({ ...props }) {
    return (
        <svg
            height="268"
            viewBox="0 0 362 268"
            fill="none"
            {...props}
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                opacity="0.5"
                width="362"
                height="268"
                rx="4"
                fill="#2E3746"
            />
            <rect
                x="24"
                y="80"
                width="314"
                height="24"
                rx="12"
                fill="#353F52"
            />
            <rect
                x="24"
                y="120"
                width="181"
                height="24"
                rx="12"
                fill="#353F52"
            />
            <rect
                x="24"
                y="160"
                width="89"
                height="24"
                rx="12"
                fill="#353F52"
            />
            <circle cx="44" cy="44" r="20" fill="#353F52" />
        </svg>
    );
}

export default GridCardLoader;
