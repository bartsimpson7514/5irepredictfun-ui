import React from "react";

function Icon({ ...props }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="52"
            fill="none"
            viewBox="0 0 52 52"
            {...props}
        >
            <path
                fill="#006DFB"
                fillOpacity="0.25"
                d="M52 26c0 14.36-11.64 26-26 26S0 40.36 0 26 11.64 0 26 0s26 11.64 26 26zM3.9 26c0 12.206 9.894 22.1 22.1 22.1 12.206 0 22.1-9.895 22.1-22.1 0-12.206-9.895-22.1-22.1-22.1C13.794 3.9 3.9 13.794 3.9 26z"
            />
            <path
                fill="url(#paint0_linear)"
                d="M8.994 43.006c-.761.761-.766 2.002.05 2.705A26 26 0 1023.078.165c-1.07.12-1.765 1.15-1.564 2.207.201 1.058 1.222 1.744 2.293 1.637a22.1 22.1 0 11-11.995 38.934c-.826-.691-2.055-.699-2.817.063z"
            />
            <defs>
                <linearGradient
                    id="paint0_linear"
                    x1="1.5"
                    x2="-3.5"
                    y1="24.5"
                    y2="38"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#1C7EFF" />
                    <stop offset="1" stopColor="#9EC8FF" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export default Icon;
