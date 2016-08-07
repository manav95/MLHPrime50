////////////////////////////////////////
// Post.js -- HTTP-POST-Verb route handler.
//
// Export constructor function.

// Define constructor function.
module.exports = function Post(app) {

	var self = this;					// Über closure.

	// Hold reference to application.
	self.app = app;

	// Route handles GET-type HTTP requests.
	self.routeHandler = function (req, res) {

		 try {

			// Entry log:
			console.log("Enter: Post.routeHandler.\n  req.body: " + 
				JSON.stringify(req.body) +
				",\n  req.query: " +
				JSON.stringify(req.query));

			// Extract the mongo collection.
			var mongoCollection = self.app.get("MongoDB").collection(req.body.collection);

			// Remove the collection tag--it is a system tag.
			delete req.body.collection;

			// Insert new document then return to client.
			// How to handle error?  Not sure....
			console.log("Insert: " + 
				JSON.stringify(req.body));
			mongoCollection.insertOne(req.body).then(function (r) {

				// Log result.
				console.log(JSON.stringify(r));

				// Return standard result object.
				res.json({

					success: true,
					payload: req.body._id
				});
			});
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
