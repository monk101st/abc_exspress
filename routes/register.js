const express = require('express');
const router = express.Router();

const Users = require('../models/users');


router.get('/', (req, res, next) => {
  res.render('register', { title: 'Rejestracja', errors: {} });
});

router.post('/', (req, res, next) => {
  const body = req.body;

  const usersData = new Users(body);
  const errors = usersData.validateSync(); //walidacja pól w formularzu.

  usersData.save((err) => {
    if(err) {
      res.render('register', { title: 'Rejestracja', errors, body });
      return;
    }

    res.redirect('/');
    });
});

module.exports = router;