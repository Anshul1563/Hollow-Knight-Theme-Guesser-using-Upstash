import { AudioPlayer } from "../../components/AudioPlayer";
import AudioInterface from "./AudioInterface";
import themes from "./themes";
import "../../styles/quiz.css"

type Data = {
	name: string;
	attempts: string;
	success: string;
	url: string;
	entityId: string;
};



async function Fetch(localThemes: Data[]) {
	const res = await fetch("http://localhost:3000/api/SearchThemes");
	const result = (await res.json()) as { themes: Data[] };
	const themes = result.themes as Data[];
	console.log(themes);
	return themes;
}

export default async function app() {
	let Themes = await Fetch(themes);

	return (
		<div className={"flex justify-center items-center layer1 spacer"}>
			<AudioInterface Themes={Themes} />
		</div>
	);
}
