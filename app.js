// IMPORT MODULES
const express = require('express')
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

// CONFIG MODULES
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));									// set static files 
app.use(bodyParser.urlencoded({extended: true}));

// SET UP ROUTING

//GET homepage 
app.get('/', function (req, res) {
	res.render('index');
});

//POST like
app.post('/liked', function(req, res) {
	let like = req.body;
	console.log(like);
})

// SET UP PORT
app.listen(3000, function () {
  console.log('User Information App listening on port 3000.')
});