import React from "react";

function Icon({ ...props }) {
    return (
        <svg
            width="36"
            height="37"
            viewBox="0 0 36 37"
            fill="none"
            {...props}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17.931 36.9213C27.8341 36.9213 35.8621 28.7387 35.8621 18.6449C35.8621 8.55115 27.8341 0.36853 17.931 0.36853C8.028 0.36853 0 8.55115 0 18.6449C0 28.7387 8.028 36.9213 17.931 36.9213Z"
                fill="url(#paint0_linear_30_1012)"
            />
            <path
                d="M17.7706 27.9832C22.875 27.9832 27.0129 23.7192 27.0129 18.4594C27.0129 13.1996 22.875 8.93561 17.7706 8.93561C12.6662 8.93561 8.52832 13.1996 8.52832 18.4594C8.52832 23.7192 12.6662 27.9832 17.7706 27.9832Z"
                stroke="white"
                strokeWidth="2.5"
            />
            <path
                d="M21.9345 26.4557V18.3876L7.4707 30.4546"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.6065 10.4609V18.5289L28.0703 6.46195"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_30_1012"
                    x1="0"
                    y1="0.36853"
                    x2="39.0816"
                    y2="4.21563"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#087EE1" />
                    <stop offset="1" stopColor="#04C29C" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export default Icon;
