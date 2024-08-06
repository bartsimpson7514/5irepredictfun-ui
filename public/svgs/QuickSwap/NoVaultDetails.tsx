import React from "react";

function Icon({ ...props }) {
    return (
        <svg
            width="80"
            height="72"
            viewBox="0 0 80 72"
            fill="none"
            {...props}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M71.4286 0H8.57143C6.29814 0 4.11797 0.903059 2.51051 2.51051C0.903059 4.11797 0 6.29814 0 8.57143V60C0 62.2733 0.903059 64.4535 2.51051 66.0609C4.11797 67.6684 6.29814 68.5714 8.57143 68.5714H11.4286C11.4286 69.3292 11.7296 70.0559 12.2654 70.5917C12.8012 71.1276 13.528 71.4286 14.2857 71.4286H22.8571C23.6149 71.4286 24.3416 71.1276 24.8774 70.5917C25.4133 70.0559 25.7143 69.3292 25.7143 68.5714H54.2857C54.2857 69.3292 54.5867 70.0559 55.1226 70.5917C55.6584 71.1276 56.3851 71.4286 57.1429 71.4286H65.7143C66.472 71.4286 67.1988 71.1276 67.7346 70.5917C68.2704 70.0559 68.5714 69.3292 68.5714 68.5714H71.4286C73.7019 68.5714 75.882 67.6684 77.4895 66.0609C79.0969 64.4535 80 62.2733 80 60V8.57143C80 6.29814 79.0969 4.11797 77.4895 2.51051C75.882 0.903059 73.7019 0 71.4286 0ZM5.71429 22.8571H8.57143V45.7143H5.71429V22.8571ZM11.4286 17.1429V12.8571C11.4286 12.4783 11.5791 12.1149 11.847 11.847C12.1149 11.5791 12.4783 11.4286 12.8571 11.4286H67.1429C67.5217 11.4286 67.8851 11.5791 68.153 11.847C68.4209 12.1149 68.5714 12.4783 68.5714 12.8571V55.7143C68.5714 56.0932 68.4209 56.4565 68.153 56.7244C67.8851 56.9924 67.5217 57.1429 67.1429 57.1429H12.8571C12.4783 57.1429 12.1149 56.9924 11.847 56.7244C11.5791 56.4565 11.4286 56.0932 11.4286 55.7143V17.1429ZM74.2857 60C74.2857 60.7578 73.9847 61.4845 73.4489 62.0203C72.9131 62.5561 72.1863 62.8571 71.4286 62.8571H8.57143C7.81367 62.8571 7.08694 62.5561 6.55112 62.0203C6.01531 61.4845 5.71429 60.7578 5.71429 60V51.4286H8.57143V55.7143C8.57143 56.8509 9.02296 57.941 9.82668 58.7447C10.6304 59.5485 11.7205 60 12.8571 60H67.1429C68.2795 60 69.3696 59.5485 70.1733 58.7447C70.977 57.941 71.4286 56.8509 71.4286 55.7143V12.8571C71.4286 11.7205 70.977 10.6304 70.1733 9.82668C69.3696 9.02296 68.2795 8.57143 67.1429 8.57143H12.8571C11.7205 8.57143 10.6304 9.02296 9.82668 9.82668C9.02296 10.6304 8.57143 11.7205 8.57143 12.8571V17.1429H5.71429V8.57143C5.71429 7.81367 6.01531 7.08694 6.55112 6.55112C7.08694 6.01531 7.81367 5.71429 8.57143 5.71429H71.4286C72.1863 5.71429 72.9131 6.01531 73.4489 6.55112C73.9847 7.08694 74.2857 7.81367 74.2857 8.57143V60Z"
                fill="#404557"
            />
            <path
                d="M31.4286 48.5714C34.186 48.5384 36.8385 47.5094 38.8969 45.6743C40.9553 43.8392 42.2808 41.3217 42.6288 38.5861C42.9768 35.8505 42.324 33.0813 40.7907 30.7892C39.2574 28.4971 36.9471 26.8368 34.2857 26.1143V22.8571C34.2857 22.0994 33.9847 21.3727 33.4489 20.8368C32.9131 20.301 32.1863 20 31.4286 20C30.6708 20 29.9441 20.301 29.4083 20.8368C28.8725 21.3727 28.5714 22.0994 28.5714 22.8571V26.1143C25.9101 26.8368 23.5998 28.4971 22.0665 30.7892C20.5332 33.0813 19.8803 35.8505 20.2284 38.5861C20.5764 41.3217 21.9019 43.8392 23.9602 45.6743C26.0186 47.5094 28.6711 48.5384 31.4286 48.5714ZM31.4286 31.4286C32.5588 31.4286 33.6636 31.7637 34.6033 32.3916C35.543 33.0195 36.2754 33.9119 36.7079 34.9561C37.1404 36.0002 37.2536 37.1492 37.0331 38.2577C36.8126 39.3661 36.2684 40.3843 35.4692 41.1835C34.67 41.9826 33.6518 42.5269 32.5434 42.7473C31.4349 42.9678 30.286 42.8547 29.2418 42.4222C28.1977 41.9897 27.3052 41.2573 26.6773 40.3175C26.0494 39.3778 25.7143 38.273 25.7143 37.1429C25.7143 35.6273 26.3163 34.1739 27.388 33.1022C28.4596 32.0306 29.9131 31.4286 31.4286 31.4286ZM51.4286 33.4857V42.8571C51.4286 43.6149 51.7296 44.3416 52.2654 44.8775C52.8012 45.4133 53.528 45.7143 54.2857 45.7143C55.0435 45.7143 55.7702 45.4133 56.306 44.8775C56.8419 44.3416 57.1429 43.6149 57.1429 42.8571V33.4857C58.2323 32.8568 59.0837 31.8859 59.565 30.7238C60.0464 29.5616 60.1309 28.2731 59.8053 27.058C59.4797 25.843 58.7623 24.7693 57.7644 24.0035C56.7664 23.2378 55.5436 22.8227 54.2857 22.8227C53.0278 22.8227 51.8051 23.2378 50.8071 24.0035C49.8091 24.7693 49.0917 25.843 48.7662 27.058C48.4406 28.2731 48.525 29.5616 49.0064 30.7238C49.4878 31.8859 50.3392 32.8568 51.4286 33.4857Z"
                fill="#404557"
            />
        </svg>
    );
}

export default Icon;
