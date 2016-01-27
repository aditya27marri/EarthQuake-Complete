var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/recentearthquakes', function(req, res, next) {
//   res.render('recentquakes');
// });

/* GET home page. */
router.get('/recentearthquakes', function(req, res) {
  res.render('recentquakes');
});



module.exports = router;
