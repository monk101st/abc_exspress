const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require("bcryptjs")


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

  const findUser = Users
    .find({loginName: body.login})
    .select('loginName userPassword');


  findUser.exec((err, data) => {
    console.log(body.login);
    
      const logpass = body.password;
      const hash = !data[0].userPassword ? 'xxxx' : data[0].userPassword;
    
      bcrypt.compare(logpass, hash, function(error, isMatch) {
        if (error) {
          throw error
        } else if (!isMatch) {
          console.log("Password doesn't match!")
          res.redirect('/login');
        } else {
          console.log("Password matches!")
          req.session.admin = 1;
          req.session.user = body.login;
          console.log(req.session);
          res.redirect('/admin');
        }
      })

  })


});



module.exports = router;
