"use client";

import { fontSize } from "@mui/system";
import { ResponsiveBar } from "@nivo/bar";
import { Theme } from "../../typings";
import { useState } from "react";

export default function App({ Themes }: { Themes: Theme[] }) {
	const [property, setProperty] = useState("name");
	function SortThemesByProperty(property: string) {
		const sorted = Themes.sort((a, b) => {
			if (a[property] < b[property]) {
				return property=="name"? 1: -1;
			}
			if (a[property] > b[property]) {
				return property=="name"? -1: 1;
			}
			return 0;
		});
		return sorted;
	}

	let newThemes = Themes.map((theme) => {
		theme.errors = theme.attempts - theme.success;
		theme.sRatio= theme.success / theme.attempts;
		theme.fRatio = theme.errors / theme.attempts;
		return theme;
	});

	function handleProperty(option: any) {
		switch (option) {
			case "Name": {
				setProperty("name");
                return;
			}
			case "Attempts": {
				setProperty("attempts");
                return;
			}
            case "Correct Responses": {
                setProperty("success");
                return;
            }
            case "Incorrect Responses": {
                setProperty("errors");
                return;
            }
            case "Success Ratio": {
                setProperty("sRatio");
                return;
            }
            case "Failure Ratio": {
                setProperty("fRatio");
                return;
            }
		}
	}

    newThemes = SortThemesByProperty(property);


	const options = [
		"Name",
		"Attempts",
		"Correct Responses",
		"Incorrect Responses",
		"Success Ratio",
		"Failure Ratio",
	];
	const optionElements = options.map((option) => {
		return (
			<div
				key={option}
				onClick={() => handleProperty(option)}
				className="bg-[hsl(24,100%,69%)] transition-all rounded-md text-[hsl(273,93%,30%)] p-3 hover:scale-105 active:scale-100 cursor-pointer"
			>
				{option}
			</div>
		);
	});

	return (
		<div className="w-full min-w-fit bg-[hsl(273,93%,10%)]">
			<div className="flex text-white pt-8 pl-8 gap-4 items-center ">
				<div className="bg-[hsl(273,93%,0%)] p-3 rounded-md whitespace-nowrap justify-self-start self-start">Sort By :</div>
				<div className="flex gap-6 flex-wrap">{optionElements}</div>
			</div>
			<div className="h-[2500px]">
				<MyResponsiveBar data={newThemes} />
			</div>
		</div>
	);
}

// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBar = ({ data /* see data tab */ }) => (
	<ResponsiveBar
		data={data}
		keys={["success", "errors"]}
		indexBy="name"
		margin={{ top: 50, right: 150, bottom: 50, left: 250 }}
		padding={0.3}
		layout="horizontal"
		valueScale={{ type: "linear" }}
		indexScale={{ type: "band", round: true }}
		valueFormat=" >-"
		groupMode="grouped"
		colors={["#98FB98", "#FF5733 "]}
		defs={[
			{
				id: "dots",
				type: "patternDots",
				background: "inherit",
				color: "#ffffff",
				size: 4,
				padding: 1,
				stagger: true,
			},
			{
				id: "lines",
				type: "patternLines",
				background: "inherit",
				color: "#ffffff",
				rotation: -45,
				lineWidth: 6,
				spacing: 10,
			},
		]}
		fill={[
			{
				match: {
					id: "fries",
				},
				id: "dots",
			},
			{
				match: {
					id: "sandwich",
				},
				id: "lines",
			},
		]}
		borderColor={{
			from: "color",
			modifiers: [["darker", 1.6]],
		}}
		axisTop={null}
		axisRight={null}
		axisBottom={{
			tickSize: 5,
			tickPadding: 5,
			tickRotation: 0,
			// legend: 'Theme',
			// legendPosition: 'middle',
			// legendOffset: 32,
		}}
		axisLeft={{
			tickSize: 0,
			tickPadding: 5,
			tickRotation: 0,
			legend: "Responses",
			legendPosition: "middle",
			legendOffset: -40,
		}}
		labelSkipWidth={12}
		labelSkipHeight={12}
		labelTextColor="ff0000"
		legendLabel={(datum) =>
			`${datum.id == "success" ? "Correct" : "Incorrect"}`
		}
		legends={[
			{
				dataFrom: "keys",
				anchor: "top-right",
				direction: "column",
				justify: false,
				translateX: 120,
				translateY: 0,
				itemsSpacing: 2,
				itemWidth: 100,
				itemHeight: 20,
				itemDirection: "left-to-right",
				itemOpacity: 0.85,
				symbolSize: 20,
				effects: [
					{
						on: "hover",
						style: {
							itemOpacity: 1,
						},
					},
				],
			},
		]}
		role="application"
		ariaLabel="Nivo bar chart demo"
		barAriaLabel={function (e) {
			return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
		}}
		theme={{
			axis: {
				domain: {
					line: {
						stroke: "transparent",
						strokeWidth: 1,
					},
				},
				ticks: {
					line: {
						stroke: "#777777",
						strokeWidth: 1,
					},
					text: { fontSize: 15, fill: "#ffffff" },
				},
				legend: {
					text: {
						fontSize: 12,
					},
				},
			},
			legends: {
				text: {
					fontSize: 15,
					fill: "#ffffff",
				},
			},
		}}
	/>
);
