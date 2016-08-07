////////////////////////////////////////
// Delete.js -- HTTP-DELETE-Verb route handler.
//
// Export constructor function.

// Include object id definition from mongo.
var ObjectId = require("mongodb").ObjectId;

// Define constructor function.
module.exports = function Delete(app) {

	var self = this;					// Über closure.

	// Hold reference to application.
	self.app = app;

	// Route handles GET-type HTTP requests.
	self.routeHandler = function (req, res) {

		 try {

			// Entry log:
			console.log("Enter: Delete.routeHandler.\n  req.body: " + 
				JSON.stringify(req.body) +
				",\n  req.query: " +
				JSON.stringify(req.query));

			// Extract the mongo collection.
			var mongoCollection = self.app.get("MongoDB").collection(req.body.collection);

			// Remove the collection tag--it is a system tag.
			delete req.body.collection;

			// Extract the id to delete.
			var str_id = req.body._id;
			if (str_id) {

				// Delete existing document.
				console.log("Delete: " + 
					str_id);
				var wcRet = mongoCollection.remove({

					_id: ObjectId(str_id)
				});

				// Output result object.
				console.log(JSON.stringify(wcRet));

				// Return success.
				console.log("Success.");
				res.json({

					success: true,
					payload: str_id
				});
			} else {

				// Return error.
				console.log("Error: No id specified for delete.");
				res.json({

					success: false,
					payload: "No id specified for delete."
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
