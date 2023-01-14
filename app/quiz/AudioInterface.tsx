"use client";
import { useEffect, useState } from "react";
import { AudioPlayer } from "../../components/AudioPlayer";

type Data = {
	name: string;
	attempts: string;
	success: string;
	url: string;
	entityId: string;
};

export default function AudioInterface({ Themes }: { Themes: Data[] }) {
	const [selection, setSelection] = useState("");
	const [index, setIndex] = useState(0);
	const [status, setStatus] = useState("Submit Answer");

	async function Update(entityId: string, process: string) {
		const res = await fetch("/api/UpdateTheme", {
			body: JSON.stringify({ entityId: entityId, process: process }),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		});
		const result = await res.json();
		console.log("Updated", result);
	}

	function SearchFiles() {
		const names = Themes.map((theme) => theme.name);
		if (names.includes(selection)) {
			return Themes;
		}
		let keywords = selection.split(" ");
		let temp = Themes.filter((theme) => {
			const name = theme.name;
			return keywords.every((key) =>
				name.toLowerCase().includes(key.toLowerCase())
			);
		});
		return temp;
	}

	async function handleChange(e: any) {
		const text: string = e.target.value;
		setSelection(text);
	}

	function handleClick() {
		const length = Themes.length;
		setIndex((index + 1) % length);
		setStatus("Submit Answer");
		setSelection("");
	}

	function Validate(name: string, id: string) {
		if (selection == name) {
			setStatus("Correct");
			Update(id, "correct");
		} else {
			setStatus("Incorrect");
			Update(id, "incorrect");
		}
	}

	function ThemeSelect(name: string) {
		setSelection(name);
	}

	const themeList = SearchFiles();
	const themeElements = themeList.map((theme) => {
		return (
			<div
				className={
					"cursor-pointer transition-all text-white p-6 py-4 flex items-center justify-center text-xl hover:scale-110 active:scale-100 " +
					(theme.name.toLowerCase() == selection.toLowerCase()
						? "bg-green-800"
						: "bg-black")
				}
				onClick={() => ThemeSelect(theme.name)}
				key={theme.entityId}
			>
				{theme.name}
			</div>
		);
	});
	const [audioElements, setAudioElements]: [any, any] = useState([]);

	useEffect(() => {
		setAudioElements(
			Themes.map((theme) => {
				return (
					<div
						key={theme.entityId}
						className="flex flex-col gap-4 w-full items-start"
					>
						<AudioPlayer link={theme.url} />
					</div>
				);
			})
		);
	}, []);

	return (
		<div className="flex justify-center w-full items-start gap-4 flex-col">
			<div className="flex gap-4">
				<input
					type="text"
					className="bg-[hsl(0,0%,5%)] w-[30%] min-w-[300px] py-2 p-6 text-white rounded-md"
					placeholder="Search Theme Here..."
					onChange={handleChange}
					value={selection}
				/>
				<button className="transition-all bg-[hsl(0,93%,30%)] text-white py-2 p-6 rounded-md hover:scale-105 active:scale-100 active:text-[hsl(0,93%,30%)]" onClick={()=> setSelection("")}> Reset</button>
			</div>
			<div className="flex flex-wrap gap-4">{themeElements}</div>
			{audioElements[index]}
			<button
				className={
					"transition-all text-lg bg-[#72ff7e] text-white rounded-lg p-3 hover:scale-105 active:scale-100 " +
					(status != "Submit Answer" &&
						"pointer-events-none  border-4  text-black " +
							(status == "Correct"
								? "border-[hsl(120,100%,50%)] bg-[hsl(120,100%,82%)]"
								: "border-[hsl(0,100%,50%)] bg-[hsl(0,100%,82%)]"))
				}
				onClick={() => Validate(Themes[index].name, Themes[index].entityId)}
			>
				{status}
			</button>
			<button
				className="transition-all text-xl bg-[#ff7272] text-white rounded-lg p-3 hover:scale-105 active:scale-100 "
				onClick={handleClick}
			>
				Play Next Song{" "}
			</button>
		</div>
	);
}
