import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";

const Widget = styled("div")(({ theme }) => ({
	padding: 16,
	width: "100%",
	maxWidth: "100%",
	margin: "auto",
	position: "relative",
	zIndex: 1,
	backgroundColor: "hsl(273,93%,10%)",
	backdropFilter: "blur(40px)",
	display: "flex",
	flexDirection: "column",
	alignItems: "end",
	flexWrap: "wrap"
}));

const TinyText = styled(Typography)({
	fontSize: "0.75rem",
	color: "rgba(255,255,255,0.4)",
	opacity: 1,
	fontWeight: 500,
	letterSpacing: 0.2,
});

export default function MusicPlayerSlider({
	skipTime,
	playing,
	duration,
	toggle,
	current,
	SetVolume,
}: {
	skipTime: number | boolean | ((position: number) => void);
	playing: number | boolean | (() => void);
	duration: number | boolean | (() => void);
	current: number | boolean | (() => void);
	toggle: number | boolean | (() => void);
	SetVolume: number | boolean | (() => void);
}) {
	const theme = useTheme();
	const [position, setPosition] = React.useState(0);
	const [paused, setPaused] = React.useState(true);
	function formatDuration(value: number) {
		const minute = Math.floor(value / 60);
		const secondLeft = Math.floor(value - minute * 60);
		return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
	}
	const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
	const lightIconColor = "white";

	React.useEffect(() => {
		setPosition(Number(current));
	}, [current, duration, playing, toggle]);

	return (
		<Box sx={{ width: "100%", overflow: "hidden", position : "sticky", bottom : 0 }}>
			<Widget>
				<Slider
					className = ""
					aria-label="time-indicator"
					size="small"
					value={position}
					min={0}
					step={1}
					max={Number(duration)}
					onChange={(_, value) => {
						skipTime(value as number);
						setPosition(value as number);
					}}
					sx={{
						color: "white",
						height: 4,
						"& .MuiSlider-thumb": {
							width: 8,
							height: 8,
							transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
							"&:before": {
								boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
							},
							"&:hover, &.Mui-focusVisible": {
								boxShadow: `0px 0px 0px 8px ${
									theme.palette.mode === "dark"
										? "rgb(255 255 255 / 16%)"
										: "rgb(0 0 0 / 16%)"
								}`,
							},
							"&.Mui-active": {
								width: 20,
								height: 20,
							},
						},
						"& .MuiSlider-rail": {
							opacity: 0.28,
						},
					}}
				/>
				<Box
					sx={{
						width: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						mt: -1,
					}}
				>
					<TinyText>{formatDuration(position)}</TinyText>
					<TinyText>-{formatDuration(Number(duration) - position)}</TinyText>
				</Box>
				<div className="flex w-full flex-wrap justify-center phone:justify-between ">
				<Stack
						spacing={2}
						alignItems="center"
						className = "sm:block hidden mb-1 px-1 invisible "
					>
						<VolumeDownRounded htmlColor={lightIconColor} />
						<Slider
							aria-label="Volume"
							defaultValue={100}
							onChange={(_, value) => {
								SetVolume(value as number);
							}}
							className = "phone:w-[150px]"
							sx={{
								color: "white",
								"& .MuiSlider-track": {
									border: "none",
								},
								"& .MuiSlider-thumb": {
									width: 24,
									height: 24,
									backgroundColor: "#fff",
									"&:before": {
										boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
									},
									"&:hover, &.Mui-focusVisible, &.Mui-active": {
										boxShadow: "none",
									},
								},
							}}
						/>
						<VolumeUpRounded htmlColor={lightIconColor} />
					</Stack>
					<Box
						sx={{
							display: "flex",
							alignSelf: "center",
							alignItems: "center",
							justifyContent: "center",
							mt: -1,
						}}
					>
						{duration > 0? <IconButton
							aria-label={paused ? "play" : "pause"}
							onClick={() => {
								toggle();
								setPaused(!paused);
							}}
						>
							{!playing ? (
								<PlayArrowRounded
									sx={{ fontSize: "3rem" }}
									htmlColor={lightIconColor}
								/>
							) : (
								<PauseRounded
									sx={{ fontSize: "3rem" }}
									htmlColor={lightIconColor}
								/>
							)}
						</IconButton> : <div className="h-16 text-white flex justify-center items-center">Loading</div>}
					</Box>
					<Stack
						spacing={2}
						direction="row"
						sx={{ mb: 1, px: 1, }}
						alignItems="center"
					>
						<VolumeDownRounded htmlColor={lightIconColor} />
						<Slider
							aria-label="Volume"
							defaultValue={100}
							onChange={(_, value) => {
								SetVolume(value as number);
							}}
							sx={{
								width: "150px",
								color: "white",
								"& .MuiSlider-track": {
									border: "none",
								},
								"& .MuiSlider-thumb": {
									width: 24,
									height: 24,
									backgroundColor: "#fff",
									"&:before": {
										boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
									},
									"&:hover, &.Mui-focusVisible, &.Mui-active": {
										boxShadow: "none",
									},
								},
							}}
						/>
						<VolumeUpRounded htmlColor={lightIconColor} />
					</Stack>
				</div>
			</Widget>
		</Box>
	);
}
