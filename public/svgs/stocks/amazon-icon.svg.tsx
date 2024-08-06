import React from "react";

function AmazonIcon({ ...props }) {
    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx="24" cy="24" r="24" fill="#FF9900" />
            <path
                d="M26.1302 18.7947C21.4444 18.9456 16.9853 20.2287 16.9853 24.9081C16.9853 28.1536 18.9503 29.7385 21.5955 29.7385C23.9385 29.7385 25.45 28.8328 26.7348 27.4743C27.3394 28.3045 27.4906 28.6819 28.5487 29.5121C28.7754 29.6631 29.1533 29.6631 29.3045 29.4366L31.6474 27.3988C31.9497 27.1724 31.7985 26.795 31.6474 26.6441C31.1183 25.8138 30.5137 25.21 30.5137 23.7005V18.8701C30.5137 16.8323 30.6649 14.9454 29.1533 13.5869C27.8685 12.3793 26.2814 12.0774 24.4675 12.0019C20.4619 11.9264 17.8167 14.1152 17.4388 16.6813C17.3632 17.1342 17.7411 17.3606 17.9678 17.3606L20.7642 17.738C21.2177 17.8135 21.4444 17.4361 21.52 17.1342C21.9734 15.4737 23.7117 15.0209 24.7698 15.3983C26.2814 15.8511 26.1302 17.587 26.1302 18.7947ZM23.4094 26.7195C22.2757 26.7195 21.52 25.7384 21.52 24.4553C21.5955 21.7382 23.7117 21.2853 26.1302 21.2853V22.6439C26.1302 25.0591 24.8454 26.7195 23.4094 26.7195ZM36.1065 34.7199C37.089 33.8897 38.0715 31.8518 37.9959 30.4178C37.9959 29.8895 37.9203 29.814 37.3913 29.6631C36.4088 29.3612 33.9147 29.2857 32.7055 30.4178C32.4787 30.6442 32.5543 30.7952 32.781 30.7952C33.6124 30.6442 36.182 30.3423 36.5599 30.9461C36.8622 31.4745 35.9553 33.5878 35.653 34.4935C35.5018 34.8708 35.8041 34.9463 36.1065 34.7199ZM9.12522 30.4933C16.3807 37.3615 27.7929 37.5879 35.1995 32.3802C35.7286 32.0783 35.1995 31.4745 34.7461 31.7009C30.6913 33.4133 26.2936 34.1614 21.8999 33.8864C17.5061 33.6113 13.2364 32.3206 9.42753 30.1159C9.12522 29.8895 8.82291 30.2669 9.12522 30.4933Z"
                fill="white"
            />
        </svg>
    );
}

export default AmazonIcon;