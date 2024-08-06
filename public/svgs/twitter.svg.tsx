import React from "react";

function Icon({ ...props }) {
    return (
        <svg
            width="13"
            height="11"
            viewBox="0 0 13 11"
            {...props}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12.36 1.94005C11.94 2.12005 11.46 2.24005 10.98 2.30005C11.46 2.00005 11.88 1.52005 12.06 0.980051C11.58 1.28005 11.1 1.46005 10.5 1.58005C10.08 1.10005 9.41997 0.800049 8.75997 0.800049C7.43997 0.800049 6.35997 1.88005 6.35997 3.20005C6.35997 3.38005 6.35997 3.56005 6.41997 3.74005C4.43997 3.62005 2.63997 2.66005 1.43997 1.22005C1.25997 1.58005 1.13997 2.00005 1.13997 2.42005C1.13997 3.26005 1.55997 3.98005 2.21997 4.40005C1.79997 4.40005 1.43997 4.28005 1.13997 4.10005C1.13997 5.24005 1.97997 6.26005 3.05997 6.44005C2.87997 6.50005 2.63998 6.50005 2.39998 6.50005C2.21998 6.50005 2.09997 6.50005 1.91997 6.44005C2.21997 7.40005 3.11998 8.12005 4.19998 8.12005C3.35998 8.78005 2.33998 9.14005 1.19998 9.14005C1.01998 9.14005 0.839976 9.14005 0.599976 9.08005C1.67998 9.74005 2.93997 10.1601 4.31997 10.1601C8.75997 10.1601 11.16 6.50005 11.16 3.32005V3.02005C11.64 2.84005 12.06 2.42005 12.36 1.94005Z" />
        </svg>
    );
}

export default Icon;