////////////////////////////////////////
// app.js -- node.js web server.
//

////////////////////////////////////////
// Allocate core objects.
console.log("\nRequire application components:");

console.log("assert...");
var assert = require('assert');
console.log("body-parser...");
var bodyParser = require('body-parser');
console.log("express...");
var express = require("express");
console.log("mongodb...");
var mongoClient = require('mongodb').MongoClient;
console.log("path...");
var path = require("path");

console.log("Get...");
var Get = require("./modules/Get");
console.log("Post...");
var Post = require("./modules/Post");
console.log("Delete...");
var Delete = require("./modules/Delete");
console.log("Put...");
var Put = require("./modules/Put");

////////////////////////////////////////
// Read command line arguments.
console.log("\nRead command line arguments:");
if (process.argv.length != 6) {

	console.log("Usage: 'node app.js [EXPRESS PORT] [EXPRESS PUBLIC FOLDER] [MONGODB LISTENING PORT] [MONGODB NAME]'");
	return;
}

console.log("Express port...");
var strPort = process.argv[2];
console.log("Express port <= " + 
	strPort);
console.log("Express public folder...");
var strPublicFolder = path.join(path.dirname(require.main.filename), 
		process.argv[3]);
console.log("Express public folder <= " + 
	strPublicFolder);
console.log("MongoDB listening port...");
var strMongoDBListeningPort = process.argv[4];
console.log("MongoDB listening port <= " + 
	strMongoDBListeningPort);
console.log("MongoDB name...");
var strMongoDBName = process.argv[5];
console.log("MongoDB name <= " + 
	strMongoDBName);

////////////////////////////////////////
// Allocate the express web server.
console.log("\nAllocate express application...");
var app = express();

////////////////////////////////////////
// Allocate the rest handlers.
console.log("\nAllocate rest handlers:");

console.log("Get...");
var get = new Get(app);
console.log("Post...");
var post = new Post(app);
console.log("Delete...");
var deleteRoute = new Delete(app);
console.log("Put...");
var putRoute = new Put(app);

////////////////////////////////////////
// Wire middlewhere.
console.log("\nWire middleware:");

console.log("body-parser...");
app.use(bodyParser.json());
console.log("express.errorHandler...");
app.use(express.errorHandler());
console.log("express.favicon...");
app.use(express.favicon());
console.log("express.logger...");
app.use(express.logger("dev"));

////////////////////////////////////////
// Wire routes.
console.log("\nWire routes:");

console.log("CORS...");
app.use(function(req, res, next) {

	res.header("Access-Control-Allow-Origin", 
		"*");
	res.header("Access-Control-Allow-Headers", 
		"Content-Type, Authorization");

	// Pass to next route.
	next();
});
console.log("express.static...");
app.use(express.static(strPublicFolder));
console.log("express.directory...");
app.use(express.directory(strPublicFolder));
console.log("REST POST (/rest)...");
app.post("/rest", 
	post.routeHandler);
console.log("REST GET (/rest)...");
app.get("/rest", 
	get.routeHandler);
console.log("REST DELETE (/rest)...");
app.delete("/rest", 
	deleteRoute.routeHandler);
console.log("REST PUT (/rest)...");
app.put("/rest", 
	putRoute.routeHandler);

////////////////////////////////////////
// Connect to mongo.
console.log("\nConnect to mongodb...");
mongoClient.connect("mongodb://localhost:" + 
		strMongoDBListeningPort + 
		"/" + 
		strMongoDBName, 
	function(err, db) {

		if (err) {

			return console.log("\n***ASYNC***\nError: " + 
				err + 
				"\n***ASYNC***\n");
		}

		console.log("\n***ASYNC***\nGot MongoDB object.\n***ASYNC***\n");

		// Store in app so route handlers can access.
		app.set("MongoDB", 
			db);
	});

////////////////////////////////////////
// Start the server.
console.log("\nStart express server...");
app.listen(strPort,
	function () {

		console.log("\n***ASYNC***\nServer listening on port: " + 
			strPort + 
			".\n***ASYNC***\n");
	});

