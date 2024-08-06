import React from "react";

function Icon({ ...props }) {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.98165 0.144043C2.6789 0.144043 0 2.82294 0 6.1257C0 8.7679 1.72477 11.0064 4.07339 11.8138C4.36697 11.8505 4.47706 11.667 4.47706 11.5202C4.47706 11.3734 4.47706 11.0064 4.47706 10.4927C2.82569 10.8596 2.45872 9.68533 2.45872 9.68533C2.20183 8.98808 1.79817 8.80459 1.79817 8.80459C1.24771 8.43762 1.83486 8.43762 1.83486 8.43762C2.42202 8.47432 2.75229 9.06148 2.75229 9.06148C3.30275 9.97891 4.14679 9.72203 4.47706 9.57524C4.51376 9.17157 4.69725 8.91469 4.84404 8.7679C3.52294 8.62111 2.12844 8.10735 2.12844 5.79542C2.12844 5.13487 2.34862 4.62111 2.75229 4.18074C2.7156 4.07065 2.49541 3.4468 2.82569 2.63946C2.82569 2.63946 3.33945 2.49267 4.47706 3.26331C4.95413 3.11652 5.46789 3.07982 5.98165 3.07982C6.49541 3.07982 7.00917 3.15322 7.48624 3.26331C8.62385 2.49267 9.13761 2.63946 9.13761 2.63946C9.46789 3.4468 9.24771 4.07065 9.21101 4.21744C9.57798 4.62111 9.83486 5.17157 9.83486 5.83212C9.83486 8.14404 8.44037 8.62111 7.11927 8.7679C7.33945 8.95138 7.52294 9.31836 7.52294 9.86882C7.52294 10.6762 7.52294 11.3 7.52294 11.5202C7.52294 11.667 7.63303 11.8505 7.92661 11.8138C10.3119 11.0064 12 8.7679 12 6.1257C11.9633 2.82294 9.2844 0.144043 5.98165 0.144043Z"
            />
        </svg>
    );
}

export default Icon;