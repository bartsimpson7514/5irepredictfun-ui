/* eslint-disable import/order */
import React from "react";
/* eslint-disable import/no-unresolved */
import "swiper/css";
import "swiper/css/navigation";

const DummyCards = () => {
    return (
        <>
            <div className="flex justify-center w-full gap-x-8 sm:hidden">
                <div
                    style={{ width: "270px", height: "374px" }}
                    className="rounded-2xl p-6 border-primary-card-200 border-2 "
                >
                    <div className="flex flex-col gap-1 items-center">
                        <div className="w-full h-10 QuickSwapLoader rounded-2xl" />
                        <div className="w-full h-60 QuickSwapLoader rounded-xl" />
                        <div className="w-full h-10 QuickSwapLoader rounded-2xl" />
                    </div>
                </div>
            </div>
            <div className=" justify-center w-full gap-x-8 hidden sm:flex">
                {React.Children.toArray(
                    [...Array(4)].map(() => {
                        return (
                            <div
                                style={{ width: "270px", height: "374px" }}
                                className="rounded-2xl p-6 border-primary-card-200 border-2 "
                            >
                                <div className="flex flex-col gap-1 items-center">
                                    <div className="w-full h-10 QuickSwapLoader rounded-2xl" />
                                    <div className="w-full h-60 QuickSwapLoader rounded-xl" />
                                    <div className="w-full h-10 QuickSwapLoader rounded-2xl" />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
};

export default DummyCards;
