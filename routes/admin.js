const express = require('express');
const News = require('../models/news');

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
    
    res.render('admin/news/news-show', { title: 'Podgląd Aktualności', id});
  }); 


  router.get('/news/delete/:id', (req, res, next) => {
    News.findByIdAndDelete(req.params.id, (err) => {
      res.redirect('/admin/news');
    })
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

    /* ############ ADMIN - PROMOTION ############ */
    router.get('/settings', (req, res, next) => {

  
      res.render('admin/settings/index', { title: 'Ustawienia - Panel' });
    });


module.exports = router;