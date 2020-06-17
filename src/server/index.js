//get contents from .env file
const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

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


projectData = {};

// require aylien and get env variables
const aylien = require("aylien_textapi");
var textapi = new aylien({
application_id: process.env.API_ID,
application_key: process.env.API_KEY
});

let word = "Hello, I love hate you.";


// post request
const data = [];

app.post('/', addData)

function addData(req,res) {
	console.log(req.body.text)
	data.push(req.body)
  //console.log(data)

  data['text'] = req.body.text

  textapi.sentiment({
  text: data.text,
  mode: 'tweet'
  }, function(error, response) {
  if (error === null) {
    //console.log(response);
    projectData['polarity'] = response.polarity
    projectData['subjectivity'] = response.subjectivity
    projectData['text'] = response.text
    projectData['polarity_confidence'] = response.polarity_confidence
    projectData['subjectivity_confidence'] = response.subjectivity_confidence
    res.send(projectData)
    console.log(projectData)
  }
  });
}


app.get('/sentiment', (req, res) => {
  res.send(projectData)
})



  
