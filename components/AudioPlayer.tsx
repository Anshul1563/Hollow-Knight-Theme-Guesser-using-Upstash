"use client";

import React, { useState, useRef, useEffect } from "react";
import MusicPlayerSlider from "./MaterialAP";

const useAudio = (url: string) => {
	const [audio] = useState(() => new Audio(url));
	const [playing, setPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [current, setCurrent] = useState(0);
	const toggle = () => setPlaying(!playing);
	

	useEffect(() => {
		audio.src = url;
		setPlaying(false);
		setCurrent(0);
		setDuration(0)
	}, [url]);

	useEffect(() => {
		if (playing) setTimeout(() => setCurrent(audio.currentTime), 100);
	}, [current, playing]);

	function skipTime(position: number) {
		setCurrent(position);
		audio.currentTime = position;
	}

	useEffect(() => {
		playing ? audio.play() : audio.pause();
	}, [playing]);

	useEffect(() => {
		audio.addEventListener("ended", () => setPlaying(false));
		return () => {
			audio.pause();
			audio.removeEventListener("ended", () => setPlaying(false));
		};
	}, []);

	audio.oncanplay = () => setDuration(audio.duration);

	function SetVolume(volume: number) {
		audio.volume = volume / 100;
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
	function directLinkFromDropboxLink(dropboxLink: string) {
		return dropboxLink
			.replace("www.dropbox.com", "dl.dropbox.com")
			.replace("?dl=0", "?dl=1");
	}

	const [playing, toggle, duration, current, skipTime, SetVolume] = useAudio(
		directLinkFromDropboxLink(directLinkFromDropboxLink(link))
	);

	const time = secToTime(Number(duration));
	const currentTime = secToTime(Number(current));

	return (
		<MusicPlayerSlider
			SetVolume={SetVolume}
			skipTime={skipTime}
			playing={playing}
			duration={duration}
			current={current}
			toggle={toggle}
		/>
	);
}

export { AudioPlayer };
