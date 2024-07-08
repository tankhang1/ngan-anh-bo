import { ApexOptions } from "apexcharts";
import { Component } from "react";
import ReactApexChart from "react-apexcharts";

interface spark3 {
    options?: ApexOptions,
    width?: string | number,
    height?: string | number,
    series?: ApexOptions['series'],
    label?: XAxisAnnotations
    endingShape?: string
	color?:string | undefined
}

export class Filestore extends Component<{},spark3> {
	constructor(props: {} | Readonly<{}>) {
		super(props);

		this.state = {
			series: [70],
			options: {
				chart: {
					type: "radialBar",
					offsetY: -20,
					sparkline: {
						enabled: true,
					},
					events: {
						mounted: (chart) => {
							chart.windowResizeHandler();
						}
					},
				},
				//   colors: ["rgba(" + myVarVal + ", 0.95)", "rgba(" + myVarVal + ", 0.15)"],
				colors: ["#8e54e9",],
				plotOptions: {
					radialBar: {
						startAngle: -90,
						endAngle: 90,
						track: {
							background: "#e7e7e7",
							strokeWidth: "80%",
							margin: 5, // margin is in pixels
							dropShadow : {
								enabled: false,
								top: 2,
								left: 0,
								// color: ["#fff"], // Static color value
								opacity: 1,
								blur: 1,
							  }
						},
						dataLabels: {
							name: {
								show: false,
							},
							value: {
								offsetY: -2,
								fontSize: "22px",
							},
						},
					},
				},
				grid: {
					padding: {
						top: -10,
					},
				},
				labels: ["Average Results"],
			}

		};
	}

	render() {
		return (
			<ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={250} />

		);
	}
}
