// "use client";

import Image from "next/image";
import Link from "next/link";
import HKlogo from "../public/HKlogo.png";

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



function HomePage() {
	return (
		<div className="w-screen h-screen flex justify-center items-center bg-[#2f0354] flex-col gap-4 p-2">
			<a href="https://www.hollowknight.com/" rel="noreferrer" target="_blank">
				<Image
					priority={true}
					src="https://drive.google.com/uc?export=view&id=15laQNlHR8QmeN4C2BTepYghhJTL414k9"
					width={1000}
					height={800}
					className="md:w-[500px] phone:w-[300px] w-[200px]"
					alt="HK logo"
				></Image>
			</a>
			<h1 className="text-white text-xl phone:text-4xl flex items-center justify-center text-center">Test your Hollow Knight knowledge <br/>Guess the themes from the Kingdom of Hallownest</h1>
			<Link
				className="bg-[#ff944d] rounded-sm p-3 transition-all hover:scale-110 active:scale-100 text-2xl shadow-md text-[#C7E8F3] font-semibold mt-8"
				href="/quiz/themes"
			>
				Begin Quiz
			</Link>
		</div>
	);
}

export default HomePage;
