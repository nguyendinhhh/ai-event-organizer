const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
	eventId: {
		type: String,
		unique: [true, "This ID has been registered"],
		required: true,
	},
	eventTitle: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;