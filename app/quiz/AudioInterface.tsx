"use client";
import { useState } from "react";
import { AudioPlayer } from "../../components/AudioPlayer";

type Data = {
	name: string;
	attempts: string;
	success: string;
	url: string;
	entityId: string;
};

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

export default function AudioInterface({ Themes }: { Themes: Data[] }) {
	const [hits, setHits]: [hits: Data[], setHits: any] = useState([]);
	const [selection, setSelection] = useState("");
	const [index, setIndex] = useState(0);

	const length = Themes.length;

	async function handleChange(e: any) {
		const text: string = e.target.value;
		setSelection(text);

		if (text.length != 1 && text.charAt(text.length - 1) != " ") {
			const data = { text: text };
			const res = await fetch("/api/SearchTerm", {
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			});
			const result = await res.json();
			setHits(result["themes"]);
		}
	}

	function handleClick() {
		setIndex((index + 1) % length);
	}

	function Validate(name: string, id: string) {
		if (selection == name) {
			console.log(selection, "Correct");
			Update(id, "correct");
		} else {
			console.log(selection, "Incorrect");
			Update(id, "incorrect");
		}
	}

	const hitElements = hits?.map((hit) => {
		return (
			<div
				className=" cursor-pointer"
				onClick={() => setSelection(hit.name)}
				key={hit.entityId}
			>
				{hit.name}
			</div>
		);
	});

	const audioElements = Themes.map((theme) => {
		return (
			<div key={theme.entityId} className= "flex flex-col gap-4">
				<input
					type="text"
					onFocus={handleChange}
					onChange={handleChange}
					value={selection}
				/>
				{hitElements}
				<AudioPlayer link={theme.url} />
				<div className="flex gap-16">
					<button
						className="transition-all text-xl bg-[#72ff7e] text-white rounded-lg p-3 hover:scale-105 active:scale-100 "
						onClick={() => Validate(theme.name, theme.entityId)}
					>
						Submit Answer
					</button>
					<button
						className="transition-all text-xl bg-[#ff7272] text-white rounded-lg p-3 hover:scale-105 active:scale-100 "
						onClick={handleClick}
					>
						Play Next Song{" "}
					</button>
				</div>
			</div>
		);
	});

	return (
		<div className="flex justify-center items-end flex-col">
			{audioElements[index]}
		</div>
	);
}
