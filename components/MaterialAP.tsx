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

const WallPaper = styled("div")({
	position: "absolute",
	width: "100%",
	height: "100%",
	top: 0,
	left: 0,
	overflow: "hidden",
	background: "linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)",
	transition: "all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s",
	"&:before": {
		content: '""',
		width: "140%",
		height: "140%",
		position: "absolute",
		top: "-40%",
		right: "-50%",
		background:
			"radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)",
	},
	"&:after": {
		content: '""',
		width: "140%",
		height: "140%",
		position: "absolute",
		bottom: "-50%",
		left: "-30%",
		background:
			"radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)",
		transform: "rotate(30deg)",
	},
});

const Widget = styled("div")(({ theme }) => ({
	padding: 16,
	borderRadius: 16,
	width: 343,
	maxWidth: "100%",
	margin: "auto",
	position: "relative",
	zIndex: 1,
	backgroundColor:
		theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
	backdropFilter: "blur(40px)",
}));

const CoverImage = styled("div")({
	width: 100,
	height: 100,
	objectFit: "cover",
	overflow: "hidden",
	flexShrink: 0,
	borderRadius: 8,
	backgroundColor: "rgba(0,0,0,0.08)",
	"& > img": {
		width: "100%",
	},
});

const TinyText = styled(Typography)({
	fontSize: "0.75rem",
	opacity: 0.38,
	fontWeight: 500,
	letterSpacing: 0.2,
});

export default function MusicPlayerSlider({
	skipTime,
	playing,
	duration,
	toggle,
	current,
    SetVolume
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
	const lightIconColor =
		theme.palette.mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";

	React.useEffect(() => {
		setPosition(Number(current));
	}, [current, duration, playing, toggle]);

	return (
		<Box sx={{ width: "100%", overflow: "hidden" }}>
			<Widget>
				<Slider
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
						color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
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
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						mt: -2,
					}}
				>
					<TinyText>{formatDuration(position)}</TinyText>
					<TinyText>-{formatDuration(Number(duration) - position)}</TinyText>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						mt: -1,
					}}
				>
					<IconButton
						aria-label={paused ? "play" : "pause"}
						onClick={() => {
							toggle();
							setPaused(!paused);
						}}
					>
						{paused ? (
							<PlayArrowRounded
								sx={{ fontSize: "3rem" }}
								htmlColor={mainIconColor}
							/>
						) : (
							<PauseRounded
								sx={{ fontSize: "3rem" }}
								htmlColor={mainIconColor}
							/>
						)}
					</IconButton>
				</Box>
				<Stack
					spacing={2}
					direction="row"
					sx={{ mb: 1, px: 1 }}
					alignItems="center"
				>
					<VolumeDownRounded htmlColor={lightIconColor} />
					<Slider
						aria-label="Volume"
						defaultValue={100}
                        onChange = {(_, value) => {
                            SetVolume(value as number);
                        }}
						sx={{
							color:
								theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
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
			</Widget>
		</Box>
	);
}
