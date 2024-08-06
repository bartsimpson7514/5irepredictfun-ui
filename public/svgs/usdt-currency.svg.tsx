import React from "react";

function USDTCurrency({ ...props }) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11.6223 0.00583117C5.2965 0.194845 0.194782 5.29822 0.00582922 11.6261C-0.207769 18.521 5.47724 24.2078 12.3699 23.9942C18.7039 23.7969 23.7974 18.7018 23.9946 12.3657C24.2 5.47902 18.515 -0.207837 11.6223 0.00583117Z"
                fill="#FFD05A"
            />
            <g filter="url(#filter0_i_203_15271)">
                <path
                    d="M20.2238 6.8596C25.0872 15.9487 15.9354 25.0953 6.85742 20.2303C5.74835 19.6386 4.35996 18.2497 3.76846 17.1403C-1.09502 8.05121 8.04865 -1.09542 17.1348 3.76963C18.2439 4.36133 19.6323 5.75017 20.2238 6.8596Z"
                    fill="#50AF95"
                />
            </g>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.3429 12.4506C13.2679 12.4562 12.8803 12.479 12.0159 12.479C11.3284 12.479 10.8403 12.4586 10.669 12.4506C8.01199 12.3353 6.02877 11.8788 6.02877 11.3322C6.02877 10.7857 8.01199 10.3298 10.669 10.2126V11.996C10.8428 12.0083 11.3403 12.0373 12.0278 12.0373C12.8528 12.0373 13.266 12.0034 13.3404 11.9966V10.2138C15.9917 10.3304 17.9706 10.7869 17.9706 11.3322C17.9706 11.8776 15.9924 12.334 13.3404 12.45L13.3429 12.4506ZM13.3429 10.0294V8.43356H17.043V6H6.96882V8.43356H10.6684V10.0288C7.66135 10.1651 5.39999 10.753 5.39999 11.4575C5.39999 12.1619 7.66135 12.7492 10.6684 12.8861V18H13.3422V12.8843C16.3424 12.748 18.6 12.1607 18.6 11.4568C18.6 10.753 16.3443 10.1657 13.3422 10.0288L13.3429 10.0294Z"
                fill="white"
            />
            <defs>
                <filter
                    id="filter0_i_203_15271"
                    x="2.41663"
                    y="2.41736"
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
                        values="0 0 0 0 0.313726 0 0 0 0 0.686275 0 0 0 0 0.584314 0 0 0 1 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_203_15271"
                    />
                </filter>
            </defs>
        </svg>
    );
}

export default USDTCurrency;
