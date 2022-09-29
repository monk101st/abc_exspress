var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  username = req.session.user;
  
  res.render('rules', { title: 'Regulamin', username });
});

module.exports = router;