const express = require('express');
const News = require('../models/news');
const { findById } = require('../models/users');
const Users = require('../models/users');

const router = express.Router();


/* Poniżej metoda dla wszystkich routów w admin. Każdy zostanie sprawdzony czy jest sesja */

router.all('*', (req, res, next) => {
  if(!req.session.admin) {
    res.redirect('/login');

    return; //jeśli nie ma sesji następuje przekierowanie i kod nie idzie dalej
  }

  next();
});

/*######### ADMIN-index ############# */
router.get('/', (req, res, next) => {
  res.render('admin/index', { title: 'Admin' });
});

  /* ############ ADMIN - HOME ############ */
  router.get('/home', (req, res, next) => {

    res.render('admin/homepage/index', { title: 'Strona główna - Panel' });
  });

/* ############ ADMIN - NEWS ############ */

router.get('/news', (req, res, next) => {

  News.find({}, (err, data) => {
    console.log(data)
    res.render('admin/news/index', { title: 'Aktualności - Panel', data });
  })
});


router.get('/news/add', (req, res, next) => {
  res.render('admin/news/news-form', { title: 'Dodawanie aktualności', body:{}, errors:{} });
});

router.post('/news/add', (req, res, next) => {

  const body = req.body;

  const newsData = new News(body);
  const errors = newsData.validateSync(); //walidacja pól w formularzu.

  newsData.save((err) => {
    if(err) {
      res.render('admin/news/news-form', { title: 'Dodawanie aktualności', errors, body });
      return;
    }

    res.redirect('/admin/news');
    });
  });

  router.get('/news/show/:id', (req, res, next) => {
    const id = req.params.id
    News.findById(id, (err, data) => {
      res.render('admin/news/news-show', { title: 'Podgląd Aktualności', data});
    })
  }); 

  router.get('/news/edit/:id', (req, res, next) => {
    const id = req.params.id
    News.findById(id, (err, data) => {
      res.render('admin/news/news-edit', { title: 'Podgląd Aktualności', data});
    })
  }); 


  router.get('/news/delete/:id', (req, res, next) => {
    News.findByIdAndDelete(req.params.id, (err) => {
      res.redirect('/admin/news');
    })
  });  

  /* ############ ADMIN - API ############ */
  router.get('/apis', (req, res, next) => {

    res.render('admin/apis/index', { title: 'API - Panel' });
  });

  /* ############ ADMIN - HELP ############ */
  router.get('/help', (req, res, next) => {

  
    res.render('admin/help/index', { title: 'Pomoc - Panel' });
  });

  /* ############ ADMIN - RULES ############ */
  router.get('/rules', (req, res, next) => {

  
    res.render('admin/rules/index', { title: 'Regulamin - Panel' });
  });

        /* ############ ADMIN - CATEGORY ############ */
    router.get('/category', (req, res, next) => {

  
      res.render('admin/category/index', { title: 'Kategorie - Panel' });
    });

    /* ############ ADMIN - PRODUCTS ############ */
    router.get('/products', (req, res, next) => {

  
      res.render('admin/products/index', { title: 'Produkty - Panel' });
    });

    /* ############ ADMIN - PROMOTION ############ */
    router.get('/promotion', (req, res, next) => {

  
      res.render('admin/promotion/index', { title: 'Promocje - Panel' });
    });

    /* ############ ADMIN - SETTINGS ############ */
    router.get('/settings', (req, res, next) => {

  
      res.render('admin/settings/index', { title: 'Ustawienia - Panel' });
    });

    /* ############ ADMIN - SETTINGS ############ */
    router.get('/users', (req, res, next) => {

      Users.find({}, (err, data) => {
        console.log(data)
        res.render('admin/users/index', { title: 'Użytkownicy - Panel', data });
      })
    });

    router.get('/users/show/:id', (req, res, next) => {
      const id = req.params.id

      Users.findById({id}, (err, data) => {
        console.log(data);
        res.render('admin/users/users-show', { title: 'Użytkownik',id, data});
      });
      

    }); 

module.exports = router;