// IMPORT MODULES
const express = require('express')
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

// CONFIG MODULES
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));												// set static files 
app.use(bodyParser.urlencoded({extended: true}));

// SET UP ROUTING

//GET homepage 
app.get('/', function (req, res) {
	res.render('index');
});

// GET likes
app.get('/likes', function (req, res) {
	let name = req.query.cactus;												// store the object send from clientside into 'name'

	fs.readFile('./likes.json', function(err, data) {							// read current JSON file on server
		if(err) {
			throw err;
		} 
		const parsed = JSON.parse(data);										// parse the data from the JSON file
		let nameLikedCactus = parsed.find(element => element.cactusname === name); // find the element that contains our liked cactus
		let numberOfLikes = nameLikedCactus.likes;								// store the number of likes into variable

		res.send({number: numberOfLikes});										// send object with number of likes to clientside
	}); 
});


//POST likes
app.post('/liked', function(req, res) {
	
	let name = req.body.cactus;													// store the object send from clientside into 'name'
	
	fs.readFile('./likes.json', function(err, data) {							// read current JSON file on server
		if(err) {
			throw err;
		} 
		let parsed = JSON.parse(data);											// parse the data from the JSON file

		let likedCactus = parsed.find(element => element.cactusname === name);	// find the element that contains our liked cactus
		++likedCactus.likes;													// add +1 to the objectprop 'likes'
		let updated = JSON.stringify(parsed);									// parse data back to JSON

		fs.writeFile('./likes.json', updated, function(err) {
			if(err) {
				throw err;
			}
		}); 
	});
})

// SET UP PORT
app.listen(3000, function () {
  console.log('User Information App listening on port 3000.')
});