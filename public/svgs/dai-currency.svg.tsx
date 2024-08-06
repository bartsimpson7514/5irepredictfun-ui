import React from "react";

function DAICurrency({ ...props }) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M11.6223 0.00583117C5.2965 0.194845 0.194782 5.29822 0.00582922 11.6261C-0.207769 18.521 5.47724 24.2078 12.3699 23.9942C18.7039 23.7969 23.7974 18.7018 23.9946 12.3657C24.2 5.47902 18.515 -0.207837 11.6223 0.00583117Z"
                fill="#FFD05A"
            />
            <g filter="url(#filter0_i_203_15323)">
                <path
                    d="M20.2238 6.85966C25.0872 15.9488 15.9354 25.0954 6.85742 20.2303C5.74835 19.6386 4.35996 18.2498 3.76846 17.1404C-1.09502 8.05127 8.04865 -1.09536 17.1348 3.76969C18.2439 4.36139 19.6323 5.75023 20.2238 6.85966Z"
                    fill="#F4B331"
                />
            </g>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.52573 6H11.4915C14.5117 6 16.8013 7.587 17.6531 9.8955H19.2V11.2912H17.979C18.0025 11.5117 18.0147 11.7367 18.0147 11.9647V11.9992C18.0147 12.2557 17.9995 12.5092 17.9692 12.7567H19.2V14.1517H17.6236C16.7497 16.4287 14.4783 18 11.4922 18H6.52573V14.1517H4.8V12.7567H6.52573V11.2912H4.8V9.89625H6.52573V6ZM7.91343 14.1517V16.7482H11.4907C13.6992 16.7482 15.3393 15.708 16.1025 14.1517H7.91343ZM16.5277 12.7567H7.91343V11.2912H16.5307C16.5618 11.5215 16.5784 11.7577 16.5784 11.9992V12.033C16.5784 12.2797 16.561 12.5205 16.5277 12.756V12.7567ZM11.4922 7.24875C13.7098 7.24875 15.3552 8.31675 16.1139 9.89475H7.91343V7.2495H11.4907L11.4922 7.24875Z"
                fill="white"
            />
            <defs>
                <filter
                    id="filter0_i_203_15323"
                    x="2.41663"
                    y="2.41742"
                    width="23.1582"
                    height="23.1652"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dx="10" dy="10" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                    />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.75 0 0 0 0 0.5975 0 0 0 0 0.2625 0 0 0 1 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_203_15323"
                    />
                </filter>
            </defs>
        </svg>
    );
}

export default DAICurrency;
