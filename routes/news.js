const express = require('express');
const router = express.Router();
const News = require('../models/news');
const defaultSort =-1;

/* GET home page. */
router.get('/', (req, res, next) => {
  const search = req.query.search || '';
  let sorte = req.query.sorte || defaultSort;

  console.log(req.query);

  if(sorte !==1 || sorte !==-1) {
    sorte = defaultSort;
  }

  const findNews = News
    .find({title: new RegExp(search.trim(), 'i')})
    .sort({created: sorte})

  findNews.exec((err, data) => {
    res.render('news', { title: 'News', data, search });
  })
});

router.get('/show/:id', (req, res, next) => {
  const id = req.params.id
  
  News.findById(id, (err, data) => {
    
    console.log(data);
    res.render('news-show', { title: 'Podgląd Aktualności', data});

  })
  
}); 
 

module.exports = router;