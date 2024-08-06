import React from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const QuestGraph = ({ labels = [], series = [] }) => {
    const { t } = useTranslation();
    const options = {
        stroke: {
            curve: "smooth",
            width: 1,
        },
        grid: {
            show: false,
        },
        chart: {
            stacked: false,
            toolbar: {
                show: false,
            },
            height: 350,
        },
        labels,
        markers: {
            size: 0,
        },
        yaxis: {
            labels: {
                formatter(y): string | any {
                    return `${y.toFixed(0)}%`;
                },
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter(y) {
                    if (typeof y !== "undefined") {
                        const point = y.toFixed(0);
                        return `${point} ${t("points")}`;
                    }
                    return y;
                },
            },
        },
    };
    return (
        <div className="w-full">
            {/* @ts-ignore */}
            <Chart type="line" height={350} options={options} series={series} />
        </div>
    );
};
export default QuestGraph;
