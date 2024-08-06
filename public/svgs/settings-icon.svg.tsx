import React from "react";

function Icon({ ...props }) {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M6.00005 7.88664C7.24562 7.88664 8.25536 6.89273 8.25536 5.66667C8.25536 4.4406 7.24562 3.44669 6.00005 3.44669C4.75448 3.44669 3.74475 4.4406 3.74475 5.66667C3.74475 6.89273 4.75448 7.88664 6.00005 7.88664Z"
                stroke="#696C80"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.55719 3.28019C9.68059 3.45409 9.78862 3.63808 9.8801 3.83014L11.2077 4.55668C11.3734 5.2875 11.3752 6.04511 11.2128 6.77666L9.8801 7.5032C9.78862 7.69526 9.68059 7.87925 9.55719 8.05315L9.58281 9.55164C9.02019 10.0563 8.3543 10.4365 7.62993 10.6667L6.32288 9.89472C6.10787 9.90986 5.89204 9.90986 5.67704 9.89472L4.37512 10.6616C3.64845 10.4356 2.98036 10.0569 2.4171 9.55164L2.44273 8.0582C2.32037 7.88188 2.21239 7.69631 2.11981 7.5032L0.79226 6.77666C0.626495 6.04585 0.624746 5.28823 0.787135 4.55668L2.11981 3.83014C2.2113 3.63808 2.31933 3.45409 2.44273 3.28019L2.4171 1.78171C2.97972 1.27705 3.64562 0.896844 4.36999 0.666672L5.67704 1.43862C5.89204 1.42348 6.10787 1.42348 6.32288 1.43862L7.6248 0.671717C8.35147 0.897699 9.01956 1.27644 9.58281 1.78171L9.55719 3.28019Z"
                stroke="#696C80"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default Icon;