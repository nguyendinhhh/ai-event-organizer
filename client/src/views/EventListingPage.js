/* 
    This is event final page displaying AI-generated 
    title, description, time, location, image.
*/
import Stack from "@mui/material/Stack";

import backgroundVideo from "../assets/lightning.mp4";
import {
	FacebookShareButton,
	FacebookIcon,
	TwitterShareButton,
	TwitterIcon,
	EmailShareButton,
	EmailIcon,
	WhatsappShareButton,
	WhatsappIcon,
} from "react-share";
import { css } from "@emotion/css";
import Button from "../components/Button";
import theme from "../theme";

const styles = {
	container: {
		display: "flex",
		flexDirection: "column",
		margin: 0,
		padding: 0,
		boxSizing: "border-box",
		width: "100%",
		justifyContent: "center",
		// height: "100%",
	},
	backgroundVideo: {
		width: "100%",
		height: "100%",
		objectFit: "cover",
		position: "fixed",
		top: "0",
		left: "0",
		zIndex: -1,
	},
	event: {
		fontFamily: "Spectral, serif",
	},
	eventTitle: {
		fontSize: "60px",
		margin: "10px",
	},
	eventTime: {
		fontSize: "30px",
		margin: "10px",
	},
	eventLocation: {
		fontSize: "25px",
		margin: "10px",
	},
	eventDescription: {
		fontSize: "18px",
		margin: "10px",
	},
};

function EventListingPage(props) {
	return (
		<div styles={styles.container}>
			<div className="bg-video-container" style={styles.backgroundVideo}>
				<video src={backgroundVideo} autoPlay loop muted />
			</div>
			{/* <Button
				style={css`
					${theme.themeButton};
					margin-top: 10px;
					margin-left: 10px;
					&:hover {
						background-color: #8336EE;
						color: #FFFFFF;
					}
				`}
        title="Shuffle Vibe"
			/> */}
			<Stack
				direction="row"
				spacing={0}
				position={"absolute"}
				justifyContent="center"
				alignItems="start"
				width={"100%"}
				// height={"100%"}
				paddingTop={3}
				color={"#FFFFFF"}
				marginTop={10}
			>
				<Stack direction="column" spacing={20} minWidth={300} maxWidth={550}>
					<div style={styles.event}>
						<h2 style={styles.eventTitle}>{props.title}</h2>
						<p style={styles.eventDescription}>{props.description}</p>
					</div>
				</Stack>
				<Stack direction="column" marginLeft={15}>
					<img src={props.img} alt="Event Img" />
				</Stack>
				<div
					className={css`
						display: flex;
						flex-direction: column;
					`}
				>
					<div>
						<FacebookShareButton
							url="https://example.com"
							// url={props.url} // This wouldn't work now due to not having a legit domain yet
							quote={"Dummy text!"}
							hashtag="#YouAreInvited!"
						>
							<FacebookIcon size={32} round />
						</FacebookShareButton>
					</div>
					<div>
						<TwitterShareButton
							url="https://example.com"
							// url={props.url} // This wouldn't work now due to not having a legit domain yet
							quote={"Dummy text!"}
							hashtag="#YouAreInvited!"
						>
							<TwitterIcon size={32} round />
						</TwitterShareButton>
					</div>
					<div>
						<EmailShareButton
							url="https://example.com"
							// url={props.url} // This wouldn't work now due to not having a legit domain yet
							quote={"Dummy text!"}
							hashtag="#YouAreInvited!"
						>
							<EmailIcon size={32} round />
						</EmailShareButton>
					</div>
					<div>
						<WhatsappShareButton
							url="https://example.com"
							// url={props.url} // This wouldn't work now due to not having a legit domain yet
							quote={"Dummy text!"}
							hashtag="#YouAreInvited!"
						>
							<WhatsappIcon size={32} round />
						</WhatsappShareButton>
					</div>
				</div>
			</Stack>
		</div>
	);
}

export default EventListingPage;
