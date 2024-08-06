/* eslint-disable no-return-assign */
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import {
    ASSET_TYPES,
    ASSET_TYPES_COMMODITY,
    ASSET_TYPES_STOCKS,
} from "@Constants";
import CollectCardModal from "@Components/Prediction/Card/collectCard";
import {
    useModalOpen,
    useToggleCollectEarningsModal,
    useToggleCollectRefundsModal,
} from "@Reducers/trade/hooks";
import { ApplicationModal, updateClaimedRoundId } from "@Redux/Reducers/trade";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@Redux";
import { useTranslation } from "react-i18next";
import CollectRefundModal from "@Components/Prediction/Card/collectRefund";
import TablePagination from "@mui/material/TablePagination";
import { ThemeProvider, createTheme } from "@mui/material";
import resolveConfig from "tailwindcss/resolveConfig";
import HeaderSelect from "../Basic/headerSelect";
import Pagination from "./history-pagination";
import tailwindConfig from "../../../tailwind.config";

const HistoryRoundTable = ({ userHistories, selectedTab }) => {
    const itemsPerPage = isMobile ? 5 : 20;

    const [sortValue, setSortValue] = useState("betTimestamp");
    const [historyData, setHistoryData] = useState([] as any);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

    const open = useModalOpen(ApplicationModal.COLLECT_EARNING);
    const openRefund = useModalOpen(ApplicationModal.COLLECT_REFUND);

    const toggleCollectCardModal = useToggleCollectEarningsModal();
    const toggleCollectRefundCardModal = useToggleCollectRefundsModal();

    const [isClaimSuccess, setIsClaimSuccess] = useState(false);
    const { isRewardCollected, selectedChainId } = useSelector(
        (state: AppState) => state.prediction
    );
    const fullConfig = resolveConfig(tailwindConfig);

    const dispatch = useDispatch();

    const { t } = useTranslation();
    useEffect(() => {
        document.querySelector(".sticky-table-table")?.classList.add("w-full");
    }, []);

    const closeCollectCard = id => {
        if (id) {
            dispatch(updateClaimedRoundId(id));
        }
        toggleCollectCardModal();
    };

    const closeCollectRefundCard = id => {
        if (id) {
            dispatch(updateClaimedRoundId(id));
        }
        toggleCollectRefundCardModal();
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const theme = createTheme({
        components: {
            MuiTablePagination: {
                styleOverrides: {
                    toolbar: {
                        color: fullConfig.theme.colors["primary-100"],
                        marginRight: "5px",
                    },
                    selectIcon: {
                        color: fullConfig.theme.colors["cards-live-border"],
                    },
                    menuItem: {
                        marginRight: "5px",
                    },
                    actions: {
                        marginLeft: "1px",
                    },
                    input: {
                        marginRight: "5px",
                    },
                },
            },
        },
    });

    const dropDownOption = () => {
        const options = {
            all: "ALL",
        };
        switch (selectedTab) {
            case "Crypto":
                ASSET_TYPES[selectedChainId].map(
                    type => (options[type.symbol] = type.symbol)
                );
                return options;
            case "Stocks":
                ASSET_TYPES_STOCKS[selectedChainId].map(
                    type => (options[type.symbol] = type.symbol)
                );
                return options;

            case "Commodities":
                ASSET_TYPES_COMMODITY[selectedChainId].map(
                    type => (options[type.symbol] = type.name)
                );
                return options;
            default:
                return options;
        }
    };

    const filterData = () => {
        if (userHistories) {
            const userHistorie = userHistories?.userHistories?.sort((a, b) => {
                return Number(b.betTimestamp) - Number(a.betTimestamp);
            });
            if (sortValue === "earnings") {
                const result = userHistorie.filter(
                    history =>
                        (history.upPredictAmount > 0 &&
                            history.roundId.winStatus === "UP") ||
                        (history.downPredictAmount > 0 &&
                            history.roundId.winStatus === "DOWN")
                );
                return result;
            }
            if (sortValue === "all" || sortValue === "betTimestamp") {
                return userHistorie;
            }
            if (sortValue === "Collected") {
                const result = userHistorie.filter(history => history.claimed);
                return result;
            }
            if (sortValue === "UnCollected") {
                const result = userHistorie.filter(
                    history =>
                        !history.claimed &&
                        ((history.upPredictAmount > 0 &&
                            history.roundId.winStatus === "UP") ||
                            (history.downPredictAmount > 0 &&
                                history.roundId.winStatus === "DOWN"))
                );
                return result;
            }
            if (sortValue === "YouWon") {
                const result = userHistorie.filter(
                    history =>
                        (history.upPredictAmount > 0 &&
                            history.roundId.winStatus === "UP") ||
                        (history.downPredictAmount > 0 &&
                            history.roundId.winStatus === "DOWN")
                );
                return result;
            }
            if (sortValue === "YouLost") {
                const winResult = userHistorie.filter(
                    history =>
                        history.upPredictAmount > 0 &&
                        history.downPredictAmount > 0
                );

                const lostResult = userHistorie.filter(
                    history =>
                        (history.upPredictAmount > 0 &&
                            history.roundId.winStatus !== "UP") ||
                        (history.downPredictAmount > 0 &&
                            history.roundId.winStatus !== "DOWN")
                );

                const newArr = [];
                lostResult.forEach(obj => {
                    const isExists = winResult.filter(
                        item => item.roundId.roundId === obj.roundId.roundId
                    );
                    if (isExists.length <= 0) {
                        newArr.push(obj);
                    }
                });

                return newArr;
            }
            const result = userHistorie.filter(
                history => history.roundId.asset === `${sortValue}/USD`
            );
            return result;
        }
    };

    useEffect(() => {
        const result = filterData();
        setHistoryData(result);
    }, [sortValue, userHistories, isRewardCollected]);

    return (
        <>
            <table className="w-full sm:mx-8 z-20">
                <thead className="block sm:contents z-50 justify-between  items-center py-2 rounded-xl text-sm pb-6 pt-5 h-16 border-seperate border-spacing-10 sm:border-t border-gray-200">
                    <tr style={{ height: "60px" }}>
                        <th className="items-center text-left w-24 sm:w-[19rem]">
                            <div className="sm:block hidden text-primary-200 text-sm font-medium sm:pl-6 pl-2">
                                {t("Round")}
                            </div>
                        </th>
                        <th className="items-center text-left w-24 sm:w-64">
                            <div className="sm:hidden">
                                <HeaderSelect
                                    label={`${t("Result")}`}
                                    options={{
                                        all: "ALL",
                                        YouWon: t("YOU WON"),
                                        YouLost: t("YOU LOST"),
                                    }}
                                    margin={false}
                                    onChange={(val: string) =>
                                        setSortValue(val)
                                    }
                                    variant="text-xs sm:block hidden text-primary-200 font-normal"
                                />
                            </div>
                            <div className="sm:block hidden">
                                <HeaderSelect
                                    label={`${t("Your Result")}`}
                                    options={{
                                        all: t("ALL"),
                                        YouWon: t("YOU WON"),
                                        YouLost: t("YOU LOST"),
                                    }}
                                    margin={false}
                                    onChange={(val: string) =>
                                        setSortValue(val)
                                    }
                                    variant=" sm:block hidden text-primary-200 text-sm font-medium"
                                />
                            </div>
                        </th>
                        {isMobile ? null : (
                            <th className="items-center text-left w-24 sm:w-64">
                                <div className="sm:block hidden text-primary-200 text-sm font-medium">
                                    {t("Earnings")}
                                </div>
                            </th>
                        )}
                        <th className="items-center text-left w-24 sm:w-60">
                            <HeaderSelect
                                label="Asset"
                                options={dropDownOption()}
                                margin={false}
                                onChange={(val: string) => setSortValue(val)}
                                variant="sm:block hidden text-primary-200 text-sm font-medium"
                            />
                        </th>
                        <th className="items-center text-left w-28 sm:w-60">
                            <HeaderSelect
                                label="Actions"
                                options={{
                                    all: t("ALL"),
                                    Collected: t("COLLECTED"),
                                    UnCollected: t("UNCOLLECTED"),
                                }}
                                margin={false}
                                onChange={(val: string) => setSortValue(val)}
                                variant="sm:block hidden leading-4 text-primary-200 text-sm font-medium"
                            />
                        </th>
                    </tr>
                </thead>
                <Pagination
                    data={historyData}
                    isClaimSuccess={isClaimSuccess}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                />
            </table>
            <ThemeProvider theme={theme}>
                <TablePagination
                    component="div"
                    count={historyData?.length}
                    rowsPerPage={rowsPerPage}
                    page={currentPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    className="w-full"
                />
            </ThemeProvider>

            <CollectCardModal
                open={open}
                onClose={closeCollectCard}
                onSuccess={isSuccess => {
                    setIsClaimSuccess(isSuccess);
                }}
            />
            <CollectRefundModal
                open={openRefund}
                onClose={closeCollectRefundCard}
            />
        </>
    );
};

export default HistoryRoundTable;
