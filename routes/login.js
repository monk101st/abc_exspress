const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('login', { title: 'Logowanie' });
});

module.exports = router;