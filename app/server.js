var express = require("express");
var bodyParser = require('body-parser');
var fs = require('fs');
var dotenv = require('custom-env').env()
var Cloudant = require('@cloudant/cloudant');
const fileupload = require('express-fileupload')
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

var app = express();
var port = process.env.PORT;

var VR_API = process.env.VR_API;
var CLOUDANT_URL = process.env.CLOUDANT_URL;

// init express app
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(fileupload());

// answer a API post request from the html form
app.post('/fileupload', function (req, res) {
	// get file from html
	console.log(JSON.stringify('{"date": ' + new Date() + ' ,"log":"Got uploadfile Post request"}', undefined, 2));

	const image = req.files.myFile
	const path = __dirname + '/public/' + image.name

	// save the image
	image.mv(path, (err) => {
		if (err) {
			console.log(JSON.stringify('{"date": ' + new Date() + ' ,"error":' + err + '}', undefined, 2));
			res.writeHead(500, {
				'Content-Type': 'application/json'
			})
			res.end(JSON.stringify({ status: 'error', message: err }))
			return
		}
	})

	sendToVisualRecognition(res, image);
});

function sendToVisualRecognition(res, image) {
	// onnect to visual recognition service on IBM Cloud
	const visualRecognition = new VisualRecognitionV3({
		version: '2018-03-19',
		authenticator: new IamAuthenticator({
			apikey: VR_API,
		}),
		url: 'https://gateway.watsonplatform.net/visual-recognition/api',
	});

	// put the image to be classified
	const classifyParams = {
		imagesFile: fs.createReadStream('./public/' + image.name),
	};

	// request from watson service to cassify image
	visualRecognition.classify(classifyParams)
		.then(response => {
			const classifiedImages = response.result;
			console.log(JSON.stringify('{"date": ' + new Date() + ' ,"log":"Got Response from Watson VR"}', undefined, 2));

			res.send("<p><img src=\"./" + image.name + "\"/></p> <pre id=\"json\">" + JSON.stringify(classifiedImages, undefined, 2) + "</pre>");

			// save to Cloudant
			sendToCloudant(classifiedImages);
		})
		.catch(err => {
			console.log(JSON.stringify('{"date": ' + new Date() + ' ,"error":' + err + '}', undefined, 2));
			res.send(err);
		});
}

function sendToCloudant(imagejson) {
	var cloudant = Cloudant({ url: CLOUDANT_URL });
	cloudant.db.create('imagesdb').then((data) => {
	}).catch((err) => {
	})
	var cloudantDB = cloudant.db.use('imagesdb');
	cloudantDB.insert({ imagejson }, function (err, data) {
		if (err) {
			console.log(JSON.stringify('{"date": ' + new Date() + ' ,"error":' + err + '}', undefined, 2));
		}
	});
	console.log(JSON.stringify('{"date": ' + new Date() + ' ,"log":"Saved to Cloudant"}', undefined, 2));
}

app.listen(port);
console.log(JSON.stringify('{"date": ' + new Date() + ' ,"log":"Server Started"}', undefined, 2));








