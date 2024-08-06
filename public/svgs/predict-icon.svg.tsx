import React from "react";

function PredictIcon({ ...props }) {
    return (
        <svg
        {...props}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0.300651 0C0.134031 0.000499002 -0.000534713 0.126122 1.60434e-06 0.280438V13.1335C-0.000535575 13.2879 0.133893 13.4134 0.300651 13.414H10.2593C10.4259 13.4134 10.5605 13.2879 10.5598 13.1335V0.280438C10.5605 0.126122 10.4259 0.000622755 10.2593 0H0.300651ZM11.1632 1.85903V13.1338L11.1631 13.1335C11.1634 13.3559 11.0683 13.5693 10.8988 13.7267C10.7292 13.8841 10.4992 13.9727 10.2591 13.973H4.2512L11.7691 15.976L11.769 15.9761C11.846 15.9967 11.9289 15.9882 11.9991 15.9523C12.0694 15.9163 12.1212 15.8559 12.1433 15.7845L15.9792 3.42997H15.9791C16.0242 3.28189 15.9314 3.12795 15.7716 3.08567L11.1632 1.85903Z"
                fill={props.fill.primaryColor}
            />
            <path
                d="M2.25032 1.00014L3.18622 1C3.26934 0.99976 3.34911 1.02966 3.40796 1.08324C3.46695 1.13681 3.5 1.20947 3.5 1.28531C3.5 1.36127 3.46695 1.43393 3.40796 1.4875C3.34911 1.54108 3.26934 1.57098 3.18622 1.57073H2.25018C1.89861 1.57073 1.62484 1.82001 1.62484 2.1408V2.70873V2.7086C1.62665 2.78533 1.59458 2.85952 1.53587 2.91436C1.47702 2.96921 1.39655 3 1.31246 3C1.22836 3 1.1479 2.96921 1.08905 2.91436C1.03034 2.85952 0.998259 2.78533 1.00007 2.7086V2.14067C1.00007 1.51398 1.56333 1 2.25018 1L2.25032 1.00014Z"
                fill={props.fill.secondaryColor}
            />
            <path
                d="M8.24968 12.4999L7.31378 12.5C7.23066 12.5002 7.15089 12.4703 7.09204 12.4168C7.03305 12.3632 7 12.2905 7 12.2147C7 12.1387 7.03305 12.0661 7.09204 12.0125C7.15089 11.9589 7.23066 11.929 7.31378 11.9293H8.24982C8.60139 11.9293 8.87516 11.68 8.87516 11.3592V10.7913V10.7914C8.87335 10.7147 8.90542 10.6405 8.96413 10.5856C9.02298 10.5308 9.10345 10.5 9.18754 10.5C9.27164 10.5 9.3521 10.5308 9.41095 10.5856C9.46966 10.6405 9.50174 10.7147 9.49993 10.7914V11.3593C9.49993 11.986 8.93667 12.5 8.24982 12.5L8.24968 12.4999Z"
                fill={props.fill.secondaryColor}
            />
        </svg>
    );
}

export default PredictIcon;
