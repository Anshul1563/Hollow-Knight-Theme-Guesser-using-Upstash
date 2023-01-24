import AudioInterface from "../AudioInterface";
import "../../../styles/quiz.css";



async function FetchThemes() {
	const res = await fetch("https://hk-themes.vercel.app/api/SearchThemes");
	const result = await res.json();
	return result;
}

export default async function App() {
	let data = await FetchThemes();
	
	
	return (
		<>
			<AudioInterface Themes={data.themes} Filter="themes" />
		</>
	);
}
