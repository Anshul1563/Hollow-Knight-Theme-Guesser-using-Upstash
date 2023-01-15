import BarGraph from "./BarGraph";
import Data from "../quiz/themes";

async function FetchThemes() {
	const res = await fetch("/api/SearchThemes",{ next: { revalidate: 60 }});
	const { themes } = await res.json();
	return themes;
}

async function Results() {
	// const Themes = await FetchThemes();
	let Themes = Data.themes;

	return (
		<div className="h-screen w-full bg-[hsl(273,93%,17%)] flex flex-col justify-center items-center p-12 pt-6 gap-6">
            <h1 className="text-4xl p-2 rounded-md bg-[#FF9F5F] text-[hsl(273,93%,27%)] font-medium ">Which are Hollow Knight&apos;s Most Recognizable Themes ?</h1>
			<BarGraph Themes = {Themes} />
		</div>
	);
}

export default Results;
