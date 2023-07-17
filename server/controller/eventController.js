// This is where we're gonna use the openai library


/**
 * import { customAlphabet } from "nanoid";
	const nanoid = customAlphabet("ABCDEF1234567890", 12);
	model.id = nanoid();
 * 
	// the nanoid package is an ECMAScript (ES) module, 
	// and when I try to import it in my CommonJS module (eventController.js), it throws an error.
 *  */


let customAlphabet, nanoid;
import("nanoid")
	.then((module) => {
		customAlphabet = module.customAlphabet;
		nanoid = customAlphabet("ABCDEF1234567890", 12);
	})
	.catch((error) => {
		console.error("Failed to import nanoid:", error);
		// Handle the error appropriately
	});

const Event = require("../models/eventModel.js");

// source = https://github.com/openai/openai-node
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Use an async function since the library returns a promise
const generateAIresponse = async (req, res) => {
	const { prompt } = req.body; // this only works if body parser is enabled

	try {
		const response = await openai.createImage({
			prompt, // fetch this from the user input from front end
			n: 1, // number of images - here we hardcode it to 1
			size: "512x512",
		});

		const imageUrl = response.data.data[0].url;

		const title = await getEventTitle(prompt);
		const description = await responseText(prompt);

		// Retrieve the generated event ID
		const eventId = nanoid();

		// Create a new event
		const newEvent = new Event({
			eventId: eventId,
			eventTitle: title,
			description: description,
			imageUrl: imageUrl,
		});

		// Save the event to the database
		newEvent.save((err) => {
			if (err) {
				console.error("Error saving event:", err);
				// Handle the error appropriately
			} else {
				console.log("Event saved successfully");
				// Handle the successful event creation
			}
		});

		res.status(200).json({
			success: true,
			eventId: eventId,
			eventTitle: title,
			image: imageUrl,
			description: description,
		});
	} catch (error) {
		if (error.response) {
			console.log(error.response.status);
			console.log(error.response.data);
		} else {
			console.log(error.message);
		}

		res.status(400).json({
			success: false,
			error: "The image could not be generated", // this is mostly shown if the image content is inappropriate
		});
	}
};

const responseText = async (prompt) => {
	// const { prompt } = req.body;

	const inputPrompt = `Write an event invitation for the following even: ${prompt}`
	try {
		const completion = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: inputPrompt,
			max_tokens: 500,
		});

		const response = completion.data.choices[0].text;
		return response;
		// res.status(200).json({
		// 	success: true,
		// 	data: response,
		// });
	} catch (error) {
		if (error.response) {
			console.log(error.response.status);
			console.log(error.response.data);
		} else {
			console.log(error.message);
		}

		res.status(400).json({
			success: false,
			error: "The description/invite could not be generated", // this is mostly shown if the image content is inappropriate
		});
	}
};

const getEventTitle = async (prompt) => {
	const inputPrompt = `Write a short event title for the following event: ${prompt}`;
	try {
		const completion = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: inputPrompt,
			max_tokens: 100,
		});

		const response = completion.data.choices[0].text;
		return response;
		// res.status(200).json({
		// 	success: true,
		// 	data: response,
		// });
	} catch (error) {
		if (error.response) {
			console.log(error.response.status);
			console.log(error.response.data);
		} else {
			console.log(error.message);
		}

		res.status(400).json({
			success: false,
			error: "The title could not be generated", // this is mostly shown if the image content is inappropriate
		});
	}
}

// Find event
const findEvent = async(req, res) => {
	const { eventId } = req.params;

	// Retrieve the event from the database based on the eventId
	Event.findOne({ eventId }, (err, event) => {
		if (err) {
			console.error("Error retrieving event:", err);
			return res.status(500).json({ error: "Failed to retrieve event" });
		}

		if (!event) {
			return res.status(404).json({ error: "Event not found" });
		}

		res.json(event);
	});
}

module.exports = { generateAIresponse, responseText, findEvent };
