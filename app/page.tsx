// "use client";

// import { useState } from "react";
// import { v4 as uuid } from "uuid";
// import { Theme } from "../typings";
// import Themes from "./quiz/themes";

// type Data = {
// 	name: string;
// 	attempts: string;
// 	success: string;
// 	url: string;
// 	entityId: string;
// };

// function HomePage() {
// 	const [themeElements, setThemeElements] = useState<React.ReactNode[]>([]);

// 	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		
// 		e.preventDefault();
// 		const id = uuid();
// 		const formData = new FormData(e.currentTarget);
// 		const data = Object.fromEntries(formData.entries());
// 		const theme: Theme = { id, ...data };
// 		theme.attempts = Number(theme.attempts);
// 		theme.success = Number(theme.success);
// 		console.log(theme);

// 		async function ThemeToUpstash() {
// 			const res = await fetch("/api/CreateTheme", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({ theme }),
// 			});

// 			const data = await res.json();
// 			console.log("Theme Added>>>", data);
// 		}

// 		ThemeToUpstash()
// 	}

// 	async function fetchThemes() {
// 		const res = await fetch("/api/SearchThemes");
// 		const result = (await res.json()) as { themes: Data[] };
// 		const themes = result.themes as Data[];
// 		const elements = themes.map((theme) => {
// 			return (
// 				<div key={theme.entityId}>
// 					<div>{theme.name}</div>
// 					<div>{theme.attempts}</div>
// 					<div>{theme.success}</div>
// 					<div>{theme.url}</div>
// 				</div>
// 			);
// 		});
// 		setThemeElements(elements);
// 	}

// 	return (
// 		<div>
// 			<div>{themeElements}</div>
// 			<button onClick={fetchThemes}>Fetch Themes</button>
// 			<form
// 				onSubmit={handleSubmit}
// 				className="flex flex-col gap-4 p-4 border border-black rounded-lg w-fit m-4"
// 			>
// 				<input className="border border-black " name="name" type="text" />
// 				<input
// 					className="border border-black "
// 					value={0}
// 					name="attempts"
// 					type="number"
// 				/>
// 				<input
// 					className="border border-black "
// 					value={0}
// 					name="success"
// 					type="number"
// 				/>
// 				<input className="border border-black " name="url" type="text" />
// 				<button type="submit">Create Theme</button>
// 			</form>
// 		</div>
// 	);
// }

function HomePage(){
	return (
		<div>HomePage</div>
	)
}

export default HomePage;
