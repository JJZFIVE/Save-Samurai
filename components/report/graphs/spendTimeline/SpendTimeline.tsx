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

type TooltipData = {
    date: string;
    totalSpend: number;
    decreasedSpend: number;
  } | null;
  
  type TooltipState = {
    show: boolean;
    x: number;
    y: number;
    data: TooltipData;
  };
  

import React, { useMemo, useState } from "react";
import { scaleTime, scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { LinePath, AreaClosed } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { useGlobalState } from "../../../../contexts/GlobalState";
const width = 650;
const height = 320;
const margin = { top: 40, right: 40, bottom: 50, left: 60 };
const tooltipWidth = 120;

const titleDx = width / 2 ;
const titleDy = margin.top / 1 + 0;
const xLabelDx = width / 2;
const xLabelDy = height - 10;
const yLabelDx = 80;
const yLabelDy = margin.top / 2 + 8;

export default function SpendTimeline() {
	const [tooltip, setTooltip] = useState<TooltipState>({ show: false, x: 0, y: 0, data: null });
	const { darkMode } = useGlobalState();

	const accumulatedData = useMemo(() => {
		let totalSpendAccumulated = 0;
		let decreasedSpendAccumulated = 0;
		return data.map(d => {
			totalSpendAccumulated += d.totalSpend;
			decreasedSpendAccumulated += d.decreasedSpend;
			return {
				date: d.date,
				totalSpend: totalSpendAccumulated,
				decreasedSpend: decreasedSpendAccumulated
			};
		});
	}, [data]);
    
	// @ts-ignore
	const handleMouseMove = (event) => {
		const pointerX = event.clientX - event.target.getBoundingClientRect().left;
		const date = xScale.invert(pointerX);
		const nearestPointIndex = accumulatedData.findIndex((d, i, array) => {
			if (i === array.length - 1) return true;
			return new Date(d.date) <= date && date < new Date(array[i + 1].date);
		});
		const d = accumulatedData[nearestPointIndex];
		setTooltip({
			show: true,
			x: pointerX,
			y: event.clientY - event.target.getBoundingClientRect().top,
			data: d
		});
	};

	const handleMouseLeave = () => {
		setTooltip({ show: false, x: 0, y: 0, data: null });
	};
	// Scales
	const xScale = scaleTime({
		domain: [new Date(data[0].date), new Date(data[data.length - 1].date)],
		range: [margin.left, width - margin.right],
	});

	const yScale = scaleLinear({
		domain: [0, Math.max(...accumulatedData.map(d => d.totalSpend))],
		range: [height - margin.bottom, margin.top],
	});
    
	const totalSpendGradientStart = darkMode ? "#5C255C" : "#A868A8";
	const totalSpendGradientEnd = darkMode ? "#BDADFF" : "#DACBFF";
    
	const decreasedSpendGradientStart = darkMode ? "#96290D" : "#C05629";
	const decreasedSpendGradientEnd = darkMode ? "#FF9980" : "#FFB8A8";
    
	const tooltipFillColor = darkMode ? "#333" : "white";
	const tooltipTextColor = darkMode ? "#fff" : "black";


	const totalSpendGradientFrom = darkMode ? "#BDADFF" : "#5C255C";
	const totalSpendGradientTo = darkMode ? "#5C255C" : "#BDADFF";

	const decreasedSpendGradientFrom = darkMode ? "#004D46" : "#7AE1D8";
	const decreasedSpendGradientTo = darkMode ? "#7AE1D8" : "#004D46";

	const textColor = darkMode ? "white" : "black";
	const axisColor = darkMode ? "white" : "black";
	const tooltipBgColor = darkMode ? "#333333" : "white";
    
	return (
		<svg width={width} height={height} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
			{/* Gradient for Accumulated Total Spend */}
			<LinearGradient
				id="totalSpend-gradient"
				from={totalSpendGradientFrom}
				to={totalSpendGradientTo}
				fromOpacity={0.8}
				toOpacity={0.8}
			/>
			{/* Gradient for Accumulated Decreased Spend */}
			<LinearGradient
				id="decreasedSpend-gradient"
				from={decreasedSpendGradientFrom}
				to={decreasedSpendGradientTo}
				fromOpacity={0.8}
				toOpacity={0.8}
			/>
			{/* Area for Accumulated Total Spend */}
			<AreaClosed
				data={accumulatedData}
				x={d => xScale(new Date(d.date))}
				y={d => yScale(d.totalSpend)}
				yScale={yScale}
				strokeWidth={1}
				stroke="transparent"
				fill="url(#totalSpend-gradient)"
				curve={curveMonotoneX}
			/>
			{/* Area for Accumulated Decreased Spend */}
			<AreaClosed
				data={accumulatedData}
				x={d => xScale(new Date(d.date))}
				y={d => yScale(d.decreasedSpend)}
				yScale={yScale}
				strokeWidth={1}
				stroke="transparent"
				fill="url(#decreasedSpend-gradient)"
				curve={curveMonotoneX}
			/>
			<AxisBottom top={height - margin.bottom} scale={xScale} numTicks={5} stroke={axisColor} tickStroke={axisColor} tickLabelProps={() => ({       // Set properties for the tick labels
				fill: textColor,
				fontSize: 10,
				dx: "-1.5em",
				dy: "0.33em"
			})} />
			<AxisLeft left={margin.left} scale={yScale} stroke={axisColor} tickStroke={axisColor} tickLabelProps={() => ({       // Set properties for the tick labels
				fill: textColor,
				fontSize: 10,
				dx: "-3em",
			})} />

			{tooltip.show && tooltip.data && (
				<g transform={`translate(${tooltip.x - tooltipWidth - 10}, ${tooltip.y + 100})`}>
					<rect x={10} y={-55} width={tooltipWidth} height={60} fill={tooltipBgColor} stroke={axisColor} rx={5} ry={5} />
					<text x={15} y={-35} fontSize={12} fill={textColor}>
            Date: {new Date(tooltip.data.date).toLocaleDateString()}
					</text>
					<text x={15} y={-20} fontSize={12} fill={textColor}>
            Real: {tooltip.data.totalSpend.toFixed(2)}
					</text>
					<text x={15} y={-5} fontSize={12} fill={textColor}>
            Optimized: {tooltip.data.decreasedSpend.toFixed(2)}
					</text>
				</g>
			)}
			{/* Title */}
			<text
				x={titleDx}
				y={titleDy}
				fontSize={18}
				fontWeight="bold"
				textAnchor="middle"
				fill={textColor}
			>
        Real Spending vs Optimal Spending
			</text>

			{/* X-axis label */}
			<text
				x={xLabelDx}
				y={xLabelDy}
				fontSize={12}
				textAnchor="middle"
				fill={textColor}
				fontWeight={700}
			>
        Date
			</text>

			{/* Y-axis label */}
			<text
				x={yLabelDx}
				y={yLabelDy}
				fontSize={12}
				textAnchor="end"
				fill={textColor}
				fontWeight={700}
				// transform="rotate(-90, 25, 15)"
			>
            Amout ($)
			</text>
		</svg>
	);
}
