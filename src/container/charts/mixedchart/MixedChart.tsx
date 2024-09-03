import { ApexOptions } from "apexcharts";
import React, { Component, useMemo, useRef } from "react";
import ReactApexChart from "react-apexcharts";

interface spark3 {
  options?: ApexOptions;
  width?: string | number;
  height?: string | number;
  series?: ApexOptions["series"];
  label?: XAxisAnnotations;
  endingShape?: string;
  colors?: string | string[] | undefined;
  categories: string[];
}

export const MixedChart = ({ ...props }: spark3) => {
  const { series, categories, colors } = props;
  const chartRef = useRef<ReactApexChart>(null);
  const initial = useMemo(
    () => ({
      series: series,
      options: {
        chart: {
          animations: { easing: "easeinout" },
          events: {
            mounted: (chart) => {
              chart.windowResizeHandler();
            },
          },
          height: 300,
          toolbar: {
            show: true,
          },
          dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 5,
            left: 0,
            blur: 3,
            color: "var(--primary02)",
            opacity: 0.5,
          },
        },
        grid: {
          show: true,
          borderColor: "rgba(119, 119, 142, 0.1)",
          strokeDashArray: 4,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [0, 2.5, 2.5],
          curve: "smooth",
        },
        legend: {
          show: true,
          position: "bottom",
          horizontalAlign: "center",
          fontWeight: 600,
          fontSize: "11px",
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              " - " +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              ""
            );
          },
          labels: {
            colors: "#74767c",
          },
          markers: {
            //@ts-ignore
            width: 8,
            height: 8,
            strokeWidth: 0,
            radius: 12,
            offsetX: 0,
            offsetY: 0,
          },
        },
        series: series,
        colors: colors,
        fill: {
          type: ["solid", "gradient", "gradient"],
          gradient: {
            gradientToColors: ["transparent", "#4776E6", "#f5bb74"],
          },
        },
        yaxis: {
          title: {
            style: {
              color: "#adb5be",
              fontSize: "14px",
              fontFamily: "poppins, sans-serif",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-label",
            },
          },
          labels: {
            formatter: function (y: number) {
              return y.toFixed(0) + "";
            },
            show: true,
            style: {
              colors: "#8c9097",
              fontSize: "11px",
              fontWeight: 600,
              cssClass: "apexcharts-xaxis-label",
            },
          },
        },
        xaxis: {
          type: "categories",
          categories: categories,
          axisBorder: {
            show: true,
            color: "rgba(119, 119, 142, 0.05)",
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: true,
            borderType: "solid",
            color: "rgba(119, 119, 142, 0.05)",
            // width: 6,
            offsetX: 0,
            offsetY: 0,
          },
          labels: {
            rotate: -90,
            style: {
              colors: "#8c9097",
              fontSize: "11px",
              fontWeight: 600,
              cssClass: "apexcharts-xaxis-label",
            },
          },
        },
      },
    }),
    [series, colors, categories]
  );

  const handleResetZoom = () => {
    if (chartRef.current) {
      //@ts-ignore
      chartRef.current.chart?.resetSeries();
    }
  };
  return (
    <div>
      <button onClick={handleResetZoom}>Reset Zoom</button>
      <ReactApexChart
        ref={chartRef}
        options={initial.options as any}
        series={initial.series}
        type="line"
        height={300}
      />
    </div>
  );
};
