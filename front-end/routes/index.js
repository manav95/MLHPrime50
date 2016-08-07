var express = require('express');
var router = express.Router();

/* GET Index (Home) page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'YouSnipper.com' });
});

/* GET Contact page. */
router.get('/contact', function (req, res) {
  res.render('contact');
});

module.exports = router;
