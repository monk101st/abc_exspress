const express = require('express');
const router = express.Router();


const login = 'monk101st@gmail.com';
const password = 'maciek';

/* GET home page. */
router.get('/', (req, res, next) => {
  username = req.session.user;
  res.render('index', { title: 'Home', username});
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Logowanie' });
});



router.post('/login', (req, res, next) => {
  const body = req.body


  if(body.login === login && body.password === password) {
    
    req.session.admin = 1;
    req.session.user = body.login;
    console.log(req.session);
    res.redirect('/admin');
  }else {
    res.redirect('/login');
  }

});



module.exports = router;
