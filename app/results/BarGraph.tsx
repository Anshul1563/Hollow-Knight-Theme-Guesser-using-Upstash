"use client";

import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Theme } from "../../typings";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
	},
	maintainAspectRatio: false,
	scales: {
		x: {
			stacked: true,
			  grid: {
			    color: 'hsl(273,93%,15%)',
			    borderColor: 'black',
			    tickColor: 'yellow'
			  }
		},
		y: {
			stacked: true,
			ticks: {
				color : "#FF9F5F",
                padding : 8,
                // backdropColor : "hsl(0,100%,50%)",
                // showLabelBackdrop : true,
			},
            grid: {
			    color: 'hsl(273,93%,15%)',
			    borderColor: 'black',
			    tickColor: 'yellow'
			  }
		},
	},
	layout: {
		padding: {
			left: 30,
			right: 30,
			top: 30,
			bottom: 30,
		},
	},
	indexAxis: "y",
};

export default function App({ Themes }: { Themes: Theme[] }) {
	
	const newThemes = Themes.map((theme) => {
		
		theme.errors = -(theme.attempts - theme.success);
		theme.Sratio = theme.success / theme.attempts;
		theme.Fratio = theme.errors / theme.attempts;
		return theme;
	});

	const labels = newThemes.map((theme) => theme.name);

	const data = {
		labels,
		datasets: [
			{
				label: "Incorrect Responses",
				data: newThemes.map((theme) => theme.errors),
				backgroundColor: "rgb(153,27,27)",
			},
			{
				label: "Correct Responses",
				data: newThemes.map((theme) => theme.success),
				backgroundColor: "rgb(22,101,52)",
			},
		],
	};

	

	return (
		<div className="flex-1 w-full bg-[hsl(273,93%,10%)] rounded-md">
			<Bar color="red" options={options} data={data} />
		</div>
	);
}
