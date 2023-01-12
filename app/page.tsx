"use client";

import { useState } from "react";

type Data = {
	name: string;
	attempts: string;
	success: string;
	url: string;
	entityId: string;
};

function HomePage() {
	const [themeElements, setThemeElements] = useState<React.ReactNode[]>([]);

	async function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData.entries());
		console.log(data);

		const res = await fetch("/api/CreateTheme", {
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		});
		const result = await res.json();
		console.log(result);

	}

	async function fetchThemes() {
		const res = await fetch("http://localhost:3000/api/SearchThemes");
		const result = await res.json() as { themes: Data[] };
		const themes = result.themes as Data[];
		const elements = themes.map((theme) => {
			return (
				<div key = {theme.entityId}>
					<div>{theme.name}</div>
					<div>{theme.attempts}</div>
					<div>{theme.success}</div>
					<div>{theme.url}</div>
				</div>
			);
		});
		setThemeElements(elements)
	}

	return (
		<div>
			<div>{themeElements}</div>
			<button onClick={fetchThemes}>Fetch Themes</button>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 p-4 border border-black rounded-lg w-fit m-4"
			>
				<input className="border border-black " name="name" type="text" />
				<input className="border border-black " value={0} name="attempts" type="number" />
				<input className="border border-black " value={0} name="success" type="number" />
				<input className="border border-black " name="url" type="text" />
				<button type="submit">Create Theme</button>
			</form>
		</div>
	);
}

export default HomePage;
