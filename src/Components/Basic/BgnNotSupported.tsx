import React from "react";
import { NETWORK_NAME, PREDICT_TOKENS } from "@Constants";
import { useSelector } from "react-redux";
import { AppState } from "@Redux";
import CurrencyIcon from "@Components/Prediction/Card/currency-icon";
import { initialPredictableToken } from "@Utils";
import { useTranslation } from "react-i18next";

const BGNNotSupportedSection = ({ title }) => {
    const { t } = useTranslation();
    const { selectedChainId, predictableToken } = useSelector(
        (state: AppState) => state.prediction
    );

    const returnIcon = () => {
        switch (title) {
            case "Vaults":
                return (
                    <svg
                        width="72"
                        height="72"
                        viewBox="0 0 72 72"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M61.5 4.20001H10.5C6.89998 4.20001 3.59998 7.20001 3.59998 11.1V62.1C3.59998 65.7 6.59998 69 10.5 69H61.5C65.1 69 68.4 66 68.4 62.1V11.1C68.1 7.20001 65.1 4.20001 61.5 4.20001ZM31.5 54.3C21.6 54.3 13.8 46.5 13.8 36.6C13.8 26.7 21.9 18.9 31.5 18.9C41.4 18.9 49.2 27 49.2 36.6C49.2 46.2 41.1 54.3 31.5 54.3ZM58.2 54.3H55.5V18.9H58.2V54.3Z"
                            fill="#696C80"
                        />
                        <path
                            d="M40.2 35.1H38.4C38.1 34.2 37.8 33.3 37.2 32.4L38.4 31.2C39 30.6 39 29.7 38.4 29.4C37.8 28.8 37.2 28.8 36.6 29.4L35.4 30.6C34.8 30 33.9 29.7 32.7 29.4V27.9C32.7 27.3 32.1 26.4 31.2 26.4C30.3 26.4 30 27 30 27.9V29.7C29.1 29.7 28.2001 30 27.3001 30.6L26.1 29.4C25.5 28.8 24.9001 28.8 24.3001 29.4C23.7001 30 23.7001 30.9 24.3001 31.2L25.5 32.4C24.9 33.3 24.6001 34.2 24.3001 35.1H22.8C21.9 35.1 21.3 35.7 21.3 36.6C21.3 37.2 21.9 38.1 22.8 38.1H24.6C24.9 39 25.2001 39.9 25.8001 40.8L24.6 42C24 42.6 24 43.5 24.6 43.8C24.9 44.1 25.2 44.1 25.5 44.1C25.8 44.1 26.1 44.1 26.4 43.8L27.6 42.6C28.5 43.2 29.4001 43.5 30.3001 43.8V45.6C30.3001 46.2 30.9001 47.1 31.8001 47.1C32.7001 47.1 33.3001 46.5 33.3001 45.6V43.8C34.2001 43.5 35.1 43.2 36 42.6L37.2 43.8C37.5 44.1 37.8 44.1 38.1 44.1C38.4 44.1 38.7 44.1 39 43.8C39.6 43.2 39.6 42.3 39 42L37.8001 40.8C38.4001 39.9 38.7 39 39 38.1H40.8001C41.4001 38.1 42 37.5 42 36.6C41.4 35.7 40.8 35.1 40.2 35.1ZM31.5 40.8C29.1 40.8 27 39 27 36.6C27 34.2 29.1 32.4 31.5 32.4C33.9 32.4 36 34.2 36 36.6C36 39 33.9 40.8 31.5 40.8Z"
                            fill="#696C80"
                        />
                    </svg>
                );
            case "Quests":
                return (
                    <svg
                        width="72"
                        height="72"
                        viewBox="0 0 72 72"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.477 38.1711C10.2947 38.1711 3.65177 44.8139 3.65177 52.9963C3.65177 61.1784 10.2947 67.8216 18.477 67.8216C26.6591 67.8216 33.302 61.1784 33.302 52.9963C33.302 44.8139 26.6591 38.1711 18.477 38.1711ZM11.9326 54.9298L15.0065 58.0037C15.8254 58.8227 17.1535 58.8227 17.9725 58.0037L25.0212 50.955C25.8396 50.1365 25.8396 48.8074 25.0212 47.9889C24.2028 47.1702 22.8736 47.1702 22.0552 47.9889L16.4896 53.5545L14.8986 51.9638C14.0802 51.1451 12.751 51.1451 11.9326 51.9638C11.1142 52.7822 11.1142 54.1114 11.9326 54.9298ZM53.4332 38.1711C45.2511 38.1711 38.6079 44.8139 38.6079 52.9963C38.6079 61.1784 45.2511 67.8216 53.4332 67.8216C61.6155 67.8216 68.2584 61.1784 68.2584 52.9963C68.2584 44.8139 61.6155 38.1711 53.4332 38.1711ZM53.4332 50.03L51.3921 47.9889C50.5734 47.1702 49.2442 47.1702 48.4258 47.9889C47.6074 48.8074 47.6074 50.1365 48.4258 50.955L50.4671 52.9963L48.4258 55.0374C47.6074 55.8561 47.6074 57.185 48.4258 58.0037C49.2442 58.8221 50.5734 58.8221 51.3921 58.0037L53.4332 55.9623L55.4745 58.0037C56.2929 58.8221 57.6221 58.8221 58.4405 58.0037C59.2592 57.185 59.2592 55.8561 58.4405 55.0374L56.3995 52.9963L58.4405 50.955C59.2592 50.1365 59.2592 48.8074 58.4405 47.9889C57.6221 47.1702 56.2929 47.1702 55.4745 47.9889L53.4332 50.03ZM27.0434 35.2997C28.1326 35.2997 29.1889 35.6721 30.0372 36.3546C30.0372 36.3549 33.3133 38.9911 33.3133 38.9911C34.8558 40.2324 37.0544 40.2324 38.5966 38.9911L41.8727 36.3549C42.7213 35.6721 43.7776 35.2997 44.8665 35.2997C49.7164 35.2997 61.7978 35.2997 61.7978 35.2997C63.5113 35.2997 65.1546 34.6191 66.3662 33.4075C67.5778 32.1959 68.2584 30.5525 68.2584 28.8391C68.2584 23.5906 68.2584 15.7979 68.2584 10.5492C68.2584 8.83577 67.5778 7.19244 66.3662 5.98085C65.1546 4.76925 63.5113 4.08862 61.7978 4.08862C49.8499 4.08862 22.036 4.08862 10.0881 4.08862C8.37465 4.08862 6.73133 4.76925 5.51973 5.98085C4.30813 7.19244 3.62724 8.83577 3.62724 10.5492C3.62724 15.7979 3.62724 23.5906 3.62724 28.8391C3.62724 30.5525 4.30813 32.1959 5.51973 33.4075C6.73133 34.6191 8.37465 35.2997 10.0881 35.2997H27.0434ZM22.8561 23.136C23.444 23.5324 23.866 23.8201 24.1216 23.9989C24.5817 24.3441 24.812 24.6733 24.812 24.9864C24.812 25.2998 24.62 25.7374 24.2365 26.2999C23.853 26.8625 23.4631 27.1437 23.067 27.1437C22.824 27.1437 22.4532 26.9711 21.9549 26.626C21.891 26.5877 21.7119 26.4661 21.418 26.2617C21.1238 26.057 20.8938 25.9038 20.7276 25.8013C19.5387 26.7217 18.2028 27.182 16.7199 27.182C14.7387 27.182 13.0671 26.479 11.7058 25.0727C10.3443 23.6667 9.66364 21.9921 9.66364 20.0489C9.66364 18.988 9.85537 17.9941 10.2388 17.0672C10.6223 16.1404 11.1336 15.3638 11.7729 14.7373C12.412 14.1112 13.1471 13.6191 13.978 13.2609C14.8088 12.9031 15.6653 12.724 16.5473 12.724C18.4393 12.724 20.0821 13.4079 21.4754 14.7759C22.8688 16.1436 23.5656 17.8757 23.5656 19.9723C23.5656 21.0332 23.3291 22.0878 22.8561 23.136ZM56.719 13.8938L61.8963 24.5935C62.1136 25.0279 62.2223 25.354 62.2223 25.5713C62.2223 26.0316 61.8515 26.4469 61.1099 26.8177C60.6755 27.0351 60.3336 27.1437 60.0841 27.1437C59.835 27.1437 59.6303 27.086 59.4706 26.9711C59.3107 26.856 59.1956 26.7346 59.1255 26.6068C59.0551 26.479 58.9561 26.2873 58.8283 26.0316L57.8311 23.9606H52.5195L51.5226 26.0316C51.3948 26.2873 51.2955 26.4725 51.2254 26.5877C51.1551 26.7026 51.0399 26.8209 50.8803 26.9423C50.7204 27.0636 50.516 27.1246 50.2665 27.1246C50.0173 27.1246 49.6754 27.0159 49.2407 26.7986C48.4994 26.4407 48.1286 26.0316 48.1286 25.5713C48.1286 25.354 48.2373 25.0279 48.4547 24.5935L53.6319 13.8747C53.7724 13.5805 53.9865 13.344 54.2742 13.1652C54.5617 12.9862 54.8653 12.8966 55.1849 12.8966C55.8752 12.8966 56.3865 13.2291 56.719 13.8938ZM41.6858 26.9711C40.5738 26.9711 39.4743 26.6834 38.3876 26.1082C37.1733 26.7729 35.9461 27.1054 34.7062 27.1054C31.4209 27.1054 29.7781 25.7374 29.7781 23.002C29.7781 21.583 30.5132 20.2662 31.9834 19.052C31.4718 17.9142 31.2162 16.8849 31.2162 15.9646C31.2162 14.6864 31.5996 13.7404 32.3668 13.1266C33.1338 12.5132 34.1628 12.2063 35.4539 12.2063C36.7451 12.2063 37.7229 12.5132 38.3876 13.1266C39.0523 13.7404 39.3848 14.5777 39.3848 15.6386C39.3848 16.5336 39.0205 17.3388 38.2919 18.0547C37.755 18.5916 37.0007 19.186 36.0291 19.838C36.7834 20.8352 37.6015 21.6787 38.4836 22.3691C38.8414 21.8195 39.0909 21.257 39.2314 20.6818C39.3592 20.1193 39.9344 19.838 40.9572 19.838C41.3916 19.838 41.7209 19.8955 41.9447 20.0106C42.1683 20.1257 42.2961 20.2439 42.3282 20.3652C42.36 20.4868 42.3697 20.6432 42.357 20.8352C42.3058 21.8066 41.9094 22.7717 41.1681 23.7306C41.3598 23.7689 41.5389 23.788 41.705 23.788C42.7019 23.788 43.2005 24.2931 43.2005 25.3027C43.2005 26.006 43.0857 26.4599 42.8554 26.6643C42.6253 26.8689 42.2354 26.9711 41.6858 26.9711ZM34.8404 24.2675C35.16 24.2675 35.4475 24.2419 35.7031 24.1906C34.9618 23.5259 34.2588 22.7334 33.5941 21.813C33.2999 22.1838 33.1529 22.5673 33.1529 22.9634C33.1529 23.8328 33.7154 24.2675 34.8404 24.2675ZM13.0576 19.9532C13.0576 21.0909 13.4252 22.0145 14.16 22.7239C14.8951 23.4334 15.7165 23.788 16.6242 23.788C17.5316 23.788 18.3498 23.4429 19.0784 22.7525C19.8073 22.0622 20.1716 21.1356 20.1716 19.9723C20.1716 18.809 19.804 17.8757 19.0689 17.1727C18.3338 16.4697 17.5124 16.118 16.605 16.118C15.6973 16.118 14.8792 16.4729 14.1506 17.1824C13.4219 17.8919 13.0576 18.8155 13.0576 19.9532ZM55.1657 18.4956L53.9002 21.1227H56.4504L55.1657 18.4956ZM34.2458 15.7346C34.2458 16.1949 34.3545 16.7124 34.5719 17.2878C35.1727 16.9044 35.6233 16.5845 35.9237 16.3289C36.2241 16.0733 36.3743 15.8306 36.3743 15.6003C36.3743 15.0377 36.0612 14.7568 35.4348 14.7568C34.6422 14.7568 34.2458 15.0825 34.2458 15.7346Z"
                            fill="#696C80"
                        />
                    </svg>
                );
            default:
                return "";
        }
    };

    const renderContent = () => {
        if (title === "Quests" || title === "Vaults") {
            return (
                <div className="flex max-w-[343px] flex-col gap-4 items-center justify-center">
                    {returnIcon()}
                    <p className="flex text-entered-text font-medium text-base text-center">
                        Coming Soon!
                    </p>
                    <p className="text-primary-200 text-center text-sm">
                        {`${title} strategies are in the works. Stay tuned to
                our `}
                        <a
                            href=""
                            target="_blank"
                            rel="noreferrer"
                            className="gradient-text bg-footer-text underline text-sm"
                        >
                            Twitter
                        </a>
                        {` for the launch update!`}
                    </p>
                </div>
            );
        }
        if (
            predictableToken === PREDICT_TOKENS.MATIC ||
            predictableToken === PREDICT_TOKENS.ETH ||
            predictableToken === PREDICT_TOKENS.TLOS ||
            predictableToken === PREDICT_TOKENS.BGN
        ) {
            return (
                <>
                    <p className="flex p-2 sm:max-w-lg text-primary-100 font-medium text-base text-center">
                        {`We apologize for the inconvenience, Fun Predictions on ${NETWORK_NAME[selectedChainId]} network using ${predictableToken} is currently undergoing maintenance. We are working hard to resolve the issue and will be back shortly. 
                        Meanwhile, you can explore Nexter on other networks!`}
                    </p>
                    <p className="text-primary-200 text-sm font-normal text-center mb-6">
                        Thank you for your patience.
                    </p>
                </>
            );
        }
        return (
            <>
                <span className="items-center justify-center cursor-pointer mb-3">
                    <CurrencyIcon
                        label={predictableToken}
                        className="h-5 w-5"
                    />
                </span>
                <p className="flex text-primary-100 font-medium text-lg text-center">
                    {t("NoBGNSupportText", {
                        predictTokens: predictableToken,
                        title,
                    })}
                </p>
                <p className="text-primary-200 text-sm font-normal text-center mb-6">
                    {t("ChooseToken", {
                        chain_id: initialPredictableToken(selectedChainId),
                        title,
                    })}
                </p>
            </>
        );
    };
    return (
        <div className="relative">
            <div className=" w-full flex flex-col items-center justify-center h-80">
                {renderContent()}
            </div>
        </div>
    );
};

export default BGNNotSupportedSection;
