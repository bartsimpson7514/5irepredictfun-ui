import React, { FC } from "react";
// import Lottie from "lottie-react";
// import SuccessIcon from "public/animations/SuccessIcon.json";
// import ErrorIcon from "public/animations/ErrorIcon.json";
// import InfoIcon from "public/animations/InfoIcon.json";
// import CloseIcon from "public/svgs/close-alert.svg";
// import ExternalLink from "@Public/svgs/external-link.svg";

// const buttonStyle = {
//     marginLeft: "16px",
//     marginRight: "8px",
//     marginBottom: "4px",
//     border: "none",
//     backgroundColor: "transparent",
//     cursor: "pointer",
//     color: "#121127",
// };

interface IAlertTemplate {
    // close: () => void;
    message: any;
    options: any;
    // style: any;
}

const AlertTemplate: FC<IAlertTemplate> = ({ message, options }) => {
    let tagLine: string = "Processing...";
    let tagLineStyle: string = "text-primary-warning";
    // let borderClassName: string = "";
    // const infoIconReff = useRef(null);
    // const successIconReff = useRef(null);
    // const errorIconReff = useRef(null);

    if (options.type === "error") {
        tagLine = "Error";
        tagLineStyle = "text-primary-error";
    } else if (options.type === "success") {
        tagLine = "Confirmed";
        tagLineStyle = "text-primary-success";
    }

    return (
        <div className="flex flex-col gap-3 w-80 rounded-lg shadow-content bg-content-background text-sm p-6 font-medium mt-10 mr-6">
            <div className="flex justify-between items-center">
                <div className={tagLineStyle}>{tagLine}</div>
                {/* <div className="cursor-pointer">
                    <ExternalLink />
                </div> */}
            </div>
            <div className="text-primary-100">{message}</div>
            {/* <div className="flex flex-row items-center justify-center text-highlight rounded-lg text-base font-medium">
                {/* {options.type === "success" && (
                    <Lottie
                        animationData={SuccessIcon}
                        lottieRef={successIconReff}
                        autoPlay
                        loop
                        style={{
                            width: "32px",
                        }}
                    />
                )}
                {options.type === "error" && (
                    <Lottie
                        animationData={ErrorIcon}
                        lottieRef={errorIconReff}
                        autoPlay
                        loop
                        style={{
                            width: "32px",
                        }}
                    />
                )}
                {options.type === "info" && (
                    <Lottie
                        animationData={InfoIcon}
                        lottieRef={infoIconReff}
                        autoPlay
                        loop
                        style={{
                            width: "32px",
                        }}
                    />
                )} 
                <span className="mb-1 ml-2">{message}</span>
            </div> */}
            {/* <button type="button" onClick={close} style={buttonStyle}>
                <CloseIcon />
            </button> */}
        </div>
    );
};

export default AlertTemplate;
