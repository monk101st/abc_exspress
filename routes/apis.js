const express = require('express');
const router = express.Router();
const News = require('../models/news');
const defaultSort = -1;


router.get('/', function(req, res, next) {
  res.render('apis', { title: 'API' });
});

module.exports = router;

/* GET home page. */
router.get('/apinews', (req, res, next) => {
  const search = req.query.search || '';
  let sort = req.query.sort || defaultSort;

  if(sort !==1 || sort !==-1) {
    sort = defaultSort;
  }

  const findNews = News
    .find({title: new RegExp(search.trim(), 'i')})
    .sort({created: sort})
    .select('title author');

  findNews.exec((err, data) => {
    res.json(data);
  })
});

router.get('/apinews/:id', (req, res, next) => {
  const id = req.params.id;
  const findNews = News
    .findById(id)
    .select('title author'); //selektor pól które mają być pokazane w json

  findNews.exec((err, data) => {
    res.json(data);
  })
});

module.exports = router;