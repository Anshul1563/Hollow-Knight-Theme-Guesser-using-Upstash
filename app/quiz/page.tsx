import AudioInterface from "./AudioInterface";
import "../../styles/quiz.css";
import Themes from "./themes";


async function FetchThemes() {
	const res = await fetch("/api/SearchThemes");
	const result = await res.json();
	return result;
}

export default async function App() {
	// let data = await FetchThemes();
	let data = Themes

	return (
		<>
			<AudioInterface Themes={data.themes} />
		</>
	);
}
