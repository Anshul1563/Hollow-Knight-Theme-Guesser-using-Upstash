import { AudioPlayer } from "../../components/AudioPlayer";
import AudioInterface from "./AudioInterface";
import "../../styles/quiz.css";
import Image from "next/image";
import HKlogo from "../../public/HKlogo.svg"

async function FetchThemes() {
	const res = await fetch("http://localhost:3000/api/SearchThemes");
	const result = await res.json();
	return result;
}

export default async function App() {
	let data = await FetchThemes();

	return (
		<div
			className={
				"flex flex-col gap-8 justify-start items-center p-8 spacer bg-[hsl(0,0%,10%)]"
			}
		>
			<Image className="filter-white" src={HKlogo} width = {400} height = {100}  alt = "HK logo"></Image>
			<AudioInterface Themes={data.themes} />
		</div>
	);
}
