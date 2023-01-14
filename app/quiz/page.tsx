import { AudioPlayer } from "../../components/AudioPlayer";
import AudioInterface from "./AudioInterface";
import "../../styles/quiz.css";
import Image from "next/image";

async function FetchThemes() {
	const res = await fetch("http://localhost:3000/api/SearchThemes");
	const result = await res.json();
	return result;
}

export default async function App() {
	let data = await FetchThemes();

	return (
		<>
			<AudioInterface Themes={data.themes} />
		</>
	);
}
