////////////////////////////////////////
// Get.js -- HTTP-GET-Verb route handler.
//
// Export constructor function.

// Include object id definition from mongo.
var ObjectId = require("mongodb").ObjectId;

// Define constructor function.
module.exports = function Get(app) {

	var self = this;					// Über closure.

	// Hold reference to application.
	self.app = app;

	// Route handles GET-type HTTP requests.
	self.routeHandler = function (req, res) {

		 try {

			// Entry log:
			console.log("Enter: Get.routeHandler.\n  req.body: " + 
				JSON.stringify(req.body) +
				",\n  req.query: " +
				JSON.stringify(req.query));

			// Extract the mongo collection.
			var mongoCollection = self.app.get("MongoDB").collection(req.query.collection);

			// Remove the collection tag--it is a system tag.
			delete req.body.collection;

			// Extract the id, the existence of which determines if this is a
			// "get-all-id's"-type request or a "get single item"-type request.
			var str_id = req.query._id;
			if (str_id) {

				// Find the document.
				console.log("mongoCollection.findOne: " + 
					str_id);
				mongoCollection.findOne({ 

						"_id": ObjectId(str_id)
					}, function(err, doc) {

						// Handle error if err, else...
						if (err) {

							// Return error.
							console.log("Error: " + 
								err);
							res.json({

								success: false,
								payload: err
							});
						} else if (doc) {

							// ...return document.
							console.log("Success: " + 
								JSON.stringify(doc));
							res.json({

								success: true,
								payload: doc
							});
						} else {

							// Return error.
							console.log("Document not found: " + 
								str_id);
							res.json({

								success: false,
								payload: "Document not found: " + 
								str_id
							});
						}
					});
			} else {

				// Get all id's.
				console.log("mongoCollection.find()");
				var arrayIds = [];
				var cursor = mongoCollection.find();
				cursor.each(function(err, doc) {

					if (err) {

						// Return error.
						console.log("Error: " + 
							err);
						res.json({

							success: false,
							payload: err
						});
						return;
					}
					if (doc != null) {

						// Push next id onto the collection.
						console.log("Found id: " + 
							doc._id);
						arrayIds.push(doc._id);
					} else {

						// Invoked as the last call in each.
						// Return collection of id's.
						console.log("Success: " + 
							JSON.stringify(arrayIds));
						res.json({

							success: true,
							payload: arrayIds
						});
					}
				});
			}
		 } catch(e) {

			// Return error.
			console.log("Error: " + 
				e.message);
			res.json({

				success: false,
				payload: e.message
			});
		 }
	 };
};
