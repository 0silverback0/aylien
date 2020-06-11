//get contents from .env file
const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

// require aylien and get env variables
const aylien = require("aylien_textapi");
var textapi = new aylien({
application_id: process.env.API_ID,
application_key: process.env.API_KEY
});

console.log(process.env.API_KEY);

//dependencies

const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


const getData = async(req, res) => {
	 res = await fetch(`https://api.aylien.com/api/v1/sentiment ${process.env.API_KEY}`)
	try{
		const data = await res.json();
		console.log(data)
		return data;
	} catch(error) {
		console.log("error at getData", error);
	}
}

app.get('/api', getData)
