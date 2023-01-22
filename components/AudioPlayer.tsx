"use client";

import React, { useState, useRef, useEffect } from "react";
import MusicPlayerSlider from "./MaterialAP";

const useAudio = (url: string) => {
	const [audio] = useState(() => {
		try {
			return new Audio(url);
		} catch (e) {
			return null;
		}
	});
	const [playing, setPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [current, setCurrent] = useState(0);
	const toggle = () => setPlaying(!playing);

	// function handleKeyPress(e: KeyboardEvent) {
	// 	console.log(e.key);
	// 	console.log(e.key == "ArrowRight")
	// 	console.log(duration)
	// 	if (duration == 0) return;
	// 	console.log("Inside")
	// 	if (e.code === "Space") {
	// 		console.log("Here")
	// 		setPlaying(!playing);
	// 	}
	// 	if (e.key == "ArrowRight") {
	// 		console.log("Here")
	// 		if (current + 5 > duration) return;
	// 		setCurrent(current + 5);
	// 	}
	// 	if (e.key == "ArrowLeft") {
	// 		if (current - 5 < 0) return;
	// 		skipTime(current - 5);
	// 	}
	// }

	useEffect(() => {
		audio!.src = url;
		setPlaying(false);
		setCurrent(0);
		setDuration(0);
		// document.addEventListener("keydown",handleKeyPress)
	}, [url]);

	useEffect(() => {
		if (playing) {
			setTimeout(() => {
				if (current == audio!.currentTime) setCurrent(current + 0.000005);
				else {
					setCurrent(audio!.currentTime);
				}
			}, 300);
		}
	}, [current, playing]);

	function skipTime(position: number) {
		setCurrent(position);
		audio!.currentTime = position;
	}

	useEffect(() => {
		playing ? audio!.play() : audio!.pause();
	}, [playing]);

	useEffect(() => {
		audio!.addEventListener("ended", () => setPlaying(false));
		return () => {
			audio!.pause();
			audio!.removeEventListener("ended", () => setPlaying(false));
		};
	}, []);

	if (audio)
		audio.oncanplay = () => {
			setDuration(audio.duration);
		};

	function SetVolume(volume: number) {
		audio!.volume = volume / 100;
	}
	return [playing, toggle, duration, current, skipTime, SetVolume];
};

function secToTime(duration: number) {
	var hrs = ~~(duration / 3600);
	var mins = ~~((duration % 3600) / 60);
	var secs = ~~duration % 60;

	// Output like "1:01" or "4:03:59" or "123:03:59"
	var ret = "";

	if (hrs > 0) {
		ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
	}

	ret += "" + mins + ":" + (secs < 10 ? "0" : "");
	ret += "" + secs;
	return ret;
}

function AudioPlayer({ link }: { link: string }) {
	const [playing, toggle, duration, current, skipTime, SetVolume] =
		useAudio(link);
	const time = secToTime(Number(duration));
	const currentTime = secToTime(Number(current));
	return (
		<MusicPlayerSlider
			duration={duration}
			current={current}
			SetVolume={SetVolume}
			skipTime={skipTime}
			playing={playing}
			toggle={toggle}
		/>
	);
}

export { AudioPlayer };
