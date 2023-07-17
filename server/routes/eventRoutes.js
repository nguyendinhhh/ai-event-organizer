const express = require('express'); // use a router
const { generateAIresponse, findEvent } = require('../controller/eventController');
const router = express.Router();

// the route will look like /event/generateimage
// add a controller function in the post request
router.post('/generateresponse', generateAIresponse); 
router.get('/:eventId', findEvent);

module.exports = router;