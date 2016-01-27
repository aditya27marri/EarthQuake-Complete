var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/statistics', function(req, res) {
  res.render('statistics');
});

// exports.statistics = function(req, res){
//   res.render('statistics', { title: 'Statistics' });
// };



module.exports = router;
