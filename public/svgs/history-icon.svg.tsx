import React from "react";

function HistoryIcon({ ...props }) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="2" y="2" width="20" height="20" rx="10" fill="#BEDAFF" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.9999 24C18.6273 24 23.9999 18.6274 23.9999 12C23.9999 5.37258 18.6273 0 11.9999 0C5.37246 0 -0.00012207 5.37258 -0.00012207 12C-0.00012207 18.6274 5.37246 24 11.9999 24ZM12.8999 6C12.8999 5.50294 12.4969 5.1 11.9999 5.1C11.5028 5.1 11.0999 5.50294 11.0999 6V12C11.0999 12.3874 11.3478 12.7313 11.7153 12.8538L15.3153 14.0538C15.7868 14.211 16.2965 13.9562 16.4537 13.4846C16.6109 13.0131 16.356 12.5034 15.8845 12.3462L12.8999 11.3513V6Z"
                fill={props.fill.primaryColor}
            />
        </svg>
    );
}

export default HistoryIcon;
