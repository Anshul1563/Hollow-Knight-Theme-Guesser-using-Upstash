import BarGraph from "../BarGraph";
import { Theme } from "../../../typings";
import ResultsHeader from "../ResultsHeader";

async function FetchThemes() {
	const res = await fetch("https://hk-themes.vercel.app/api/SearchThemes", {
		next: { revalidate: 10 },
	});
	const { themes } = await res.json();
	return themes;
}

async function Results() {
	const Themes: Theme[] = await FetchThemes();
	let count = 0;
	Themes.forEach((theme) => {
		count += theme.attempts;
	});

	return (
		<div className="w-full min-w-[700px] bg-[hsl(273,93%,17%)] flex flex-col justify-center items-center">
			<div className=" flex flex-col justify-center items-center phone:p-12 p-2 pt-6 gap-6 flex-1 w-full ">
				<ResultsHeader />
				<h1 className="text-4xl p-4 bg-[#FFAADC] text-[hsl(273,93%,27%)] font-medium self-start ">
					Which are Hollow Knight&apos;s Most Recognizable Themes ?
				</h1>
				<h2 className="text-xl p-4 bg-[#FFAADC] text-[hsl(273,93%,27%)] font-medium self-start">
					Total Responses : {count}
				</h2>
			</div>
			<BarGraph Themes={Themes} />
		</div>
	);
}

export default Results;
