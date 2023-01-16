"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AudioPlayer } from "../../components/AudioPlayer";
import { Theme } from "../../typings";
import HKlogo from "../../public/HKlogo.png";
import Header from "./Header";
import { duration } from "@mui/material";

export default function AudioInterface({ Themes }: { Themes: Theme[] }) {
	const [selection, setSelection] = useState("");
	const [index, setIndex] = useState(0);
	const [count, setCount] = useState(0);
	const [status, setStatus] = useState("Submit Answer");
	const [randoms, setRandoms]: [number[], any] = useState([]);

	async function Update(id: string, process: string) {
		const update = { id, process };
		const res = await fetch("/api/UpdateTheme", {
			body: JSON.stringify({ update }),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		});
		const result = await res.json();
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
		setIndex(randoms[(count + 1) % Themes.length]);
		setCount(count + 1);
		setStatus("Submit Answer");
		setSelection("");
	}

	function Validate(name: string, id: string) {
		if (status == "Submit Answer") {
			if (selection == name) {
				setStatus("Correct");
				Update(id, "Correct");
			} else {
				setStatus("Incorrect");
				Update(id, "Incorrect");
			}
		}
		else{
			console.log("Already Answered")
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
					"cursor-pointer transition-all text-white p-6 py-[12px] rounded-md flex items-center justify-center text-sm phone:text-lg hover:scale-110 active:scale-100 " +
					(theme.name.toLowerCase() == selection.toLowerCase()
						? status == "Submit Answer"
							? "bg-[#FF9F5F] text-[hsl(273,93%,17%)]"
							: status == "Incorrect"
							? "bg-red-800"
							: "bg-green-800"
						: Themes[index].name == theme.name && status != "Submit Answer"
						? "bg-green-800"
						: "bg-[hsl(273,93%,10%)]") +
					(status == "Submit Answer" ? "" : " pointer-events-none")
				}
				onClick={() => ThemeSelect(theme.name)}
				key={theme.id}
			>
				{theme.name}
			</div>
		);
	});

	function shuffle(array: number[]) {
		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle.
		while (currentIndex != 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}

		return array;
	}

	useEffect(() => {
		let arr = Array.from(Array(Themes.length).keys());
		shuffle(arr);
		setIndex(arr[0]);
		setRandoms(arr);
	}, []);

	return (
		<div>
			<div className="spacer bg-[hsl(273,93%,17%)] pb-[350px] phone:pb-[150px] text-xs phone:text-base items-center flex flex-col gap-12">
				<Header />
				<Image
					className="phone:block hidden"
					priority={true}
					src={HKlogo}
					width={400}
					height={100}
					alt="HK logo"
				></Image>
				<div className="flex flex-col gap-6 self-start w-full flex-1">
					<div className="flex flex-wrap gap-4 mx-8">
						<input
							type="text"
							className={
								"bg-[hsl(273,93%,10%)] w-[100%] phone:w-[30%] phone:min-w-[300px] text-lg py-2 p-6 text-white rounded-md"
							}
							disabled={status == "Submit Answer" ? false : true}
							placeholder="Search Theme Here..."
							onChange={handleChange}
							value={selection}
						/>
						<button
							className={
								"transition-all bg-[hsl(0,93%,30%)] text-white py-[12px] phone:py-2 p-6 rounded-md hover:scale-105 active:scale-100 active:text-[hsl(0,93%,30%)]" +
								(status == "Submit Answer" ? "" : " pointer-events-none")
							}
							onClick={() => setSelection("")}
							disabled={status == "Submit Answer" ? false : true}
						>
							{" "}
							Reset
						</button>
						<button
							className={
								"transition-all bg-[#FFAADC] text-[hsl(273,92%,10%)] font-medium py-[12px] phone:py-2 p-6 rounded-md hover:scale-105 active:scale-100 " +
								(status != "Submit Answer" ? "pointer-events-none" : "")
							}
							onClick={() => Validate(Themes[index].name, Themes[index].id)}
						>
							{status}
						</button>
						<button
							className="transition-all bg-[#FF9F5F] py-[12px] phone:py-2 p-6 rounded-md hover:scale-105 active:scale-100 text-[#300356] font-medium "
							onClick={handleClick}
						>
							Play Next Song{" "}
						</button>
					</div>
					<div className="flex flex-wrap gap-4 px-8 w-full  justify-start items-start">
						{themeElements}
					</div>
				</div>
			</div>
			<AudioPlayer link={Themes[index].url} />
		</div>
	);
}
