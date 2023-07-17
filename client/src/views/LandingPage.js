/* This is landing page of vibe-it application */

import { useState } from "react";
import backgroundVideo from "../assets/lightning.mp4";
import Stack from "@mui/material/Stack";
import EventDescriptionInputField from "../components/EventDescriptionInputField.js";
import Button from "../components/Button";
import theme from "../theme";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/css";

const styles = {
	container: {
		margin: 0,
		padding: 0,
		boxSizing: "border-box",
		textAlign: "center",
		width: "100%",
		height: "100%",
	},
	backgroundVideo: {
		width: "100%",
		height: "100%",
		objectFit: "cover",
		position: "fixed",
		top: "0",
		left: "0",
	},
	appNameText: {
		fontFamily: "Roboto, sans-serif",
		fontStyle: "normal",
		fontWeight: "700",
		fontSize: "128px",
		lineHeight: "150px",
		color: "#FFFFFF",
		textShadow: "5px 5px 0px #8330FB",
		marginTop: "100px",
		marginBottom: "0px",
	},
	appSloganText: {
		fontFamily: "Roboto Slab",
		fontStyle: "normal",
		fontWeight: "400",
		fontSize: "40px",
		color: "#FFFFFF",
		letterSpacing: "-0.019em",
		marginTop: "30px",
		marginBottom: "10px",
		textShadow: "2px 1px 0px #8330FB",
	},
	appSloganText2: {
		background: "#8336EE",
		boxShadow: "6px 5px 0px #000000",
		width: "187px",
		height: "58px",
		fontFamily: "Roboto Slab",
		fontStyle: "normal",
		fontWeight: "700",
		fontSize: "40px",
		color: "#FFFFFF",
		display: "flex",
		justifyContent: "center",
		marginTop: "20px",
		marginBottom: "50px",
	},
};

const AppNameText = () => <p style={styles.appNameText}>Vibe-it.ai</p>;

const AppSloganText = () => (
	<div>
		<p style={styles.appSloganText}>
			<span>🚀</span> Instant vibes, epic events in
		</p>
		<p style={styles.appSloganText2}> minutes</p>
	</div>
);

function LandingPage() {
	const navigate = useNavigate();
	const [eventDescriptionInput, setEventDescriptionInput] = useState("");
	// Yijing - need to add a loading window/spinner using the state below
	const [isLoading, setIsLoading] = useState(false);

	const submitHandler = (e) => {
		e.preventDefault();
		const prompt = eventDescriptionInput;

		if (prompt === "") {
			alert("Please briefly describe your event.");
			return;
		}

		// invoke the image generator
		generateAIresponse(prompt);
	};

	async function generateAIresponse(prompt) {
		try {
			setIsLoading(true);
			const response = await fetch(
				"http://localhost:8000/event/generateresponse",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						prompt,
					}),
				}
			);

			// check if response is ok
			if (!response.ok) {
				setIsLoading(false);
				throw new Error("That image could not be generated");
			}

			const result = await response.json();
			// console.log(result);

			const eventId = result.eventId;

			setIsLoading(false);

			// Navigate to the event page with the generated eventId
			navigate(`/event/${eventId}`);
		} catch (error) {
			alert(error);
		}
	}

	return (
		<div className="main" styles={styles.container}>
			<div className="bg-video-container" style={styles.backgroundVideo}>
				<video src={backgroundVideo} autoPlay loop muted />
			</div>
			<Stack
				direction="column"
				spacing={0}
				position={"absolute"}
				width={"100%"}
				height={"100%"}
				paddingTop={3}
			>
				{/* <Stack // Don't need these for now
					direction="row"
					justifyContent="right"
					alignItems="start"
					position={"absolute"}
					width={"100%"}
					height={"100%"}
					spacing={2}
					marginLeft={-3}
				>
					<Button title={"Sign Up"} style={theme.themeButton} />
					<Button title={"Login"} style={theme.altButton} />
				</Stack> */}
				<Stack
					direction="column"
					justifyContent="center"
					alignItems="center"
					spacing={0}
					position={"absolute"}
					width={"100%"}
					height={"100%"}
				>
					<AppNameText />
					<AppSloganText />
					<EventDescriptionInputField
						{...{
							eventDescriptionInput,
							setEventDescriptionInput,
							generateAIresponse,
						}}
					/>

					<Button
						title={"Vibe It!"}
						style={css`
							${theme.themeButton};
							&:hover {
								background-color: #8336EE;
								color: #FFFFFF;
							}
						`}
						onClick={submitHandler}
						loading={isLoading}
					/>
				</Stack>
			</Stack>
		</div>
	);
}

export default LandingPage;
