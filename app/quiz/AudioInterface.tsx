"use client";
import { useEffect, useState } from "react";
import { AudioPlayer } from "../../components/AudioPlayer";


function shuffle(array: number[]) {
	var i = array.length,
		j = 0,
		temp;

	while (i--) {
		j = Math.floor(Math.random() * (i + 1));

		// swap randomly chosen element with current element
		temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}

	return array;
}

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

type Data = {
	name: string;
	attempts: string;
	success: string;
	url: string;
	entityId: string;
};

export default function AudioInterface({ Themes }: { Themes: Data[] }) {

	const audioElements = Themes.map((theme) => {
		return (
			<div key={theme.entityId}>
				<AudioPlayer link={theme.url} />
				<button onClick={() => Update(theme.entityId, "correct")}>
					{" "}
					Correct Answer
				</button>
				<button onClick={() => Update(theme.entityId, "incorrect")}>
					{" "}
					Incorrect Answer
				</button>
			</div>
		);
	});
	const length = Themes.length;
	const [index, setIndex] = useState(0);

	function handleClick() {
		setIndex((index + 1) % length);
	}

	return (
		<div className="flex justify-center items-end flex-col">
			{audioElements[index]}
			<button className="transition-all text-xl bg-[#ff7272] text-white rounded-lg p-3 hover:scale-105 active:scale-100 " onClick={handleClick}>Play Next Song </button>
		</div>
	);
}
