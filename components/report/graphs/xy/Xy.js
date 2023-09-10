const data = [
	{
		"date": "2023-09-04T11:25:00.000Z",
		"totalSpend": 10.75,
		"decreasedSpend": 0
	},
	{
		"date": "2023-09-05T13:50:00.000Z",
		"totalSpend": 50.42,
		"decreasedSpend": 0
	},
	{
		"date": "2023-09-07T19:45:00.000Z",
		"totalSpend": 37.49,
		"decreasedSpend": 11.990000000000002
	},
	{
		"date": "2023-09-08T18:10:00.000Z",
		"totalSpend": 28.75,
		"decreasedSpend": 0
	},
	{
		"date": "2023-09-10T18:55:00.000Z",
		"totalSpend": 116.75,
		"decreasedSpend": 116.75
	},
	{
		"date": "2023-09-11T15:55:00.000Z",
		"totalSpend": 135.89,
		"decreasedSpend": 135.89
	},
	{
		"date": "2023-09-12T16:45:00.000Z",
		"totalSpend": 35.62,
		"decreasedSpend": 35.62
	},
	{
		"date": "2023-09-13T20:40:00.000Z",
		"totalSpend": 18.25,
		"decreasedSpend": 0
	},
	{
		"date": "2023-09-14T12:50:00.000Z",
		"totalSpend": 27.24,
		"decreasedSpend": 27.24
	},
	{
		"date": "2023-09-15T10:55:00.000Z",
		"totalSpend": 22.49,
		"decreasedSpend": 22.49
	},
	{
		"date": "2023-09-16T08:45:00.000Z",
		"totalSpend": 62.34,
		"decreasedSpend": 62.34
	},
	{
		"date": "2023-09-17T19:05:00.000Z",
		"totalSpend": 56.78,
		"decreasedSpend": 56.78
	},
	{
		"date": "2023-09-18T09:15:00.000Z",
		"totalSpend": 78.45,
		"decreasedSpend": 78.45
	},
	{
		"date": "2023-09-19T10:10:00.000Z",
		"totalSpend": 14.99,
		"decreasedSpend": 14.99
	},
	{
		"date": "2023-09-20T20:15:00.000Z",
		"totalSpend": 171.35,
		"decreasedSpend": 125.6
	},
	{
		"date": "2023-09-21T15:10:00.000Z",
		"totalSpend": 159.99,
		"decreasedSpend": 159.99
	},
	{
		"date": "2023-09-22T19:30:00.000Z",
		"totalSpend": 356.88,
		"decreasedSpend": 299.99
	},
	{
		"date": "2023-09-23T14:50:00.000Z",
		"totalSpend": 749.99,
		"decreasedSpend": 749.99
	},
	{
		"date": "2023-09-24T17:30:00.000Z",
		"totalSpend": 72.9,
		"decreasedSpend": 0
	},
	{
		"date": "2023-09-25T12:45:00.000Z",
		"totalSpend": 42.75,
		"decreasedSpend": 42.75
	},
	{
		"date": "2023-09-26T17:25:00.000Z",
		"totalSpend": 116.23,
		"decreasedSpend": 9.990000000000002
	},
	{
		"date": "2023-09-27T12:20:00.000Z",
		"totalSpend": 55.6,
		"decreasedSpend": 0
	},
	{
		"date": "2023-09-28T16:15:00.000Z",
		"totalSpend": 135.68,
		"decreasedSpend": 67.23
	},
	{
		"date": "2023-09-29T08:30:00.000Z",
		"totalSpend": 22.439999999999998,
		"decreasedSpend": 0
	},
	{
		"date": "2023-09-30T09:40:00.000Z",
		"totalSpend": 7.99,
		"decreasedSpend": 0
	}
];

import React, { useState } from "react";
import { scaleTime, scaleLinear } from "@visx/scale";
import { LinePath, Bar } from "@visx/shape";
import { LinearGradient } from "@visx/gradient";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { Tooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { bisector } from "d3-array";
import { useGlobalState } from "../../../../contexts/GlobalState";

// eslint-disable-next-line react/prop-types
export default function Xy({ width, height, margin = { top: 20, right: 20, bottom: 50, left: 50 } }) {
	const [tooltipData, setTooltipData] = useState(null);
	const state = useGlobalState();
	const {darkMode} = state;

	let runningTotalSpend = 0;
	let runningDecreasedSpend = 0;

	data.forEach((datum) => {
		runningTotalSpend += datum.totalSpend;
		runningDecreasedSpend += datum.decreasedSpend;
        
		datum.runningTotalSpend = runningTotalSpend;
		datum.runningDecreasedSpend = runningDecreasedSpend;
	});

	const xAccessor = (d) => new Date(d.date);
	const y1Accessor = (d) => d.runningTotalSpend;
	const y2Accessor = (d) => d.runningDecreasedSpend;

	const xScale = scaleTime({
		domain: [Math.min(...data.map(xAccessor)), Math.max(...data.map(xAccessor))],
		range: [margin.left, width - margin.right],
	});

	const yScale = scaleLinear({
		domain: [0, Math.max(...data.map(y1Accessor), ...data.map(y2Accessor))],
		range: [height - margin.bottom, margin.top],
	});

	const bisectDate = bisector((d) => new Date(d.date)).left;

	const handleTooltip = (event) => {
		const { x } = localPoint(event);
		const x0 = xScale.invert(x);
		const index = bisectDate(data, x0, 1);
		const d0 = data[index - 1];
		const d1 = data[index];
		let d = d0;
		if (d1 && d1.date) {
			d = x0 - xAccessor(d0) > xAccessor(d1) - x0 ? d1 : d0;
		}
		setTooltipData(d);
	};


	return (
		<svg width={width} height={height}>
			<LinearGradient from="#4682b4" to="#87cefa" id="totalSpend-gradient" />
			<LinearGradient from="#dc143c" to="#ff7f7f" id="decreasedSpend-gradient" />

			<LinePath
				data={data}
				x={(d) => xScale(xAccessor(d))}
				y={(d) => yScale(y1Accessor(d))}
				strokeWidth={2}
				stroke="url(#totalSpend-gradient)"
			/>

			<LinePath
				data={data}
				x={(d) => xScale(xAccessor(d))}
				y={(d) => yScale(y2Accessor(d))}
				strokeWidth={2}
				stroke="url(#decreasedSpend-gradient)"
			/>

			<AxisBottom
				top={height - margin.bottom}
				scale={xScale}
				label="Date"
				stroke={darkMode ? "white" : "black"}
				tickStroke={darkMode ? "white" : "black"}
				tickLabelProps={() => ({
					fill: darkMode ? "white" : "black",
					fontSize: 10,
					textAnchor: "middle",
				})}
			/>
			<AxisLeft
				scale={yScale}
				left={margin.left}
				label="Amount"
				stroke={darkMode ? "white" : "black"}
				tickStroke={darkMode ? "white" : "black"}
				tickLabelProps={() => ({
					fill: darkMode ? "white" : "black",
					fontSize: 10,
					textAnchor: "middle",
				})}
			/>

			<Bar
				x={margin.left}
				y={margin.top}
				width={width - margin.right - margin.left}
				height={height - margin.bottom - margin.top}
				fill="transparent"
				onMouseMove={handleTooltip}
				onMouseLeave={() => setTooltipData(null)}
			/>

			{tooltipData && (
				<g>
					<circle
						cx={xScale(xAccessor(tooltipData))}
						cy={yScale(y1Accessor(tooltipData))}
						r={5}
						fill="#4682b4"
						stroke="white"
						strokeWidth={2}
					/>
					<circle
						cx={xScale(xAccessor(tooltipData))}
						cy={yScale(y2Accessor(tooltipData))}
						r={5}
						fill="#dc143c"
						stroke="white"
						strokeWidth={2}
					/>
					<TooltipWithBounds
						top={yScale(y1Accessor(tooltipData))}
						left={xScale(xAccessor(tooltipData))}
						style={defaultStyles}
					>
						{`Total Spend: ${y1Accessor(tooltipData)}`}
						<br />
						{`Saved Spend Running Total: ${y2Accessor(tooltipData)}`}
					</TooltipWithBounds>
				</g>
			)}
		</svg>
	);
}
