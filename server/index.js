const path = require('path');

const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
const cors = require("cors");
const app = express();

const mongoose = require("mongoose")
mongoose.set("strictQuery", true); // recommended by mongoose when downgraded to mongoose@6.10.0
const uri =
	`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.eza8a2n.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

async function connect() {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(
			`Successfully connected to the database: ${process.env.DB}`
		);
	} catch (error) {
		console.log(error)
	}
}

connect();

// Need a middleware to be able to take in body data from the request
// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
	cors({
		credentials: true,
		origin: "http://localhost:3000",
	})
);
// Set static folder
app.use(express.static(path.join(__dirname, 'client')));

app.use("/event", require("./routes/eventRoutes"));

app.listen(port, () => console.log(`server started on ${port}`));
