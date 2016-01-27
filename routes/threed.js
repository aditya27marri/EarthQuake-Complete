var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/threed', function(req, res) {
  res.render('threed');
});

// exports.statistics = function(req, res){
//   res.render('statistics', { title: 'Statistics' });
// };



module.exports = router;
