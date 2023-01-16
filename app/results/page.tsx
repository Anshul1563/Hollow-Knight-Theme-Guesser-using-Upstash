import Header from "../quiz/Header";
import BarGraph from "./BarGraph";

async function FetchThemes() {
	const res = await fetch("https://hk-themes.vercel.app/api/SearchThemes", {
		next: { revalidate: 10 },
	});
	const { themes } = await res.json();
	return themes;
}

async function Results() {
	const Themes = await FetchThemes();
	return (
		<div className="h-[150vh] w-full bg-[hsl(273,93%,17%)] flex flex-col justify-center items-center">
			<Header />
			<div className=" flex flex-col justify-center items-center p-12 pt-6 gap-6 flex-1 w-full ">
				<h1 className="text-4xl p-2 rounded-md bg-[#FF9F5F] text-[hsl(273,93%,27%)] font-medium ">
					Which are Hollow Knight&apos;s Most Recognizable Themes ?
				</h1>
				<BarGraph Themes={Themes} />
			</div>
		</div>
	);
}

export default Results;
