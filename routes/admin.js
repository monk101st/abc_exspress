const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const News = require('../models/news');
const { findById } = require('../models/users');
const Users = require('../models/users');
const Roles = require('../models/roles');

const router = express.Router();


/* Poniżej metoda dla wszystkich routów w admin. Każdy zostanie sprawdzony czy jest sesja */

router.all('*', (req, res, next) => {
  if(!req.session.admin) {
    res.redirect('/login');

    return; //jeśli nie ma sesji następuje przekierowanie i kod nie idzie dalej
  }

  next();
});

/* ------ Storage do Media */
var avatarsStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/images/avatars");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});
 
var uploadAvatar = multer({
  storage: avatarsStorage,
}).single("image"); //Field name and max count

/* --------------------- End Storage----------------- */
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

    /* ############ ADMIN - MEDIA ############ */
    router.get('/media', (req, res, next) => {

  
      res.render('admin/media/index', { title: 'Media - Panel' });
    });

    /* ############ ADMIN - SETTINGS ############ */
    router.get('/settings', (req, res, next) => {

      Roles.find({}, (err, data) => {
        console.log(data)
        res.render('admin/settings/index', { title: 'Ustawienia - Panel', data });
      })

    });

    router.get('/settings/roles/add', (req, res, next) => {

  
      res.render('admin/settings/roles-add', { title: 'Dodawania roli - Panel', errors: {}, body: {} });
    });

    router.post('/settings/roles/add', (req, res, next) => {
      const body = req.body;
      
      const rolesData = new Roles(body);
      const errors = rolesData.validateSync();
    
      rolesData.save((err) => {
          if(err) {
            res.render('admin/settings/roles-add', {
              title: 'Dosdawanie roli',
              errors,
              body
            });
            return;
          }
          res.redirect('/admin/settings')
      });
      
    });
    router.get('/settings/roles/show/:id', (req, res, next) => {
      const id = req.params.id
      Roles.findById(id, (errors, data) => {
        res.render('admin/settings/roles-show', { title: 'Wyświetlanie roli', errors, data });
      })
    });

    router.get('/settings/roles/edit/:id', (req, res, next) => {
      const id = req.params.id
      Roles.findById(id, (errors, data) => {
        res.render('admin/settings/roles-edit', { title: 'Edycja roli', errors, data });
      })
    });

    router.post('/settings/roles/update', (req, res, next) => {
      const body = req.body
      Roles.findByIdAndUpdate(body.id, {
        roleName: body.roleName,
        description: body.description,
      }, (err) => {
        res.redirect('/admin/settings')
      })
    });
    router.get('/settings/roles/delete/:id', (req, res, next) => {
      const id = req.params.id
      Roles.findByIdAndDelete(id, (err) => {
        res.redirect('/admin/settings')
      })
    });

    /* ############ ADMIN - USERS ############ */
    router.get('/users', (req, res, next) => {

      Users.find({}, (err, data) => {
        console.log(data)
        res.render('admin/users/index', { title: 'Użytkownicy - Panel', data });
      })
    });

    router.get('/users/add', (req, res, next) => {
      res.render('admin/users/users-add', { title: 'Dodawanie użytkownika', body:{}, errors:{} });
    });

    router.post('/users/add', (req, res) => {
      
      uploadAvatar(req, res, function (err) {
        const body = req.body;
        const file = req.file
    
        if (err) {
          console.log(err);
          return res.end("Something went wrong");
        } else {
    
          if (file !== undefined) {
            const usersData = new Users({
              loginName: body.loginName, 
              userPassword: body.userPassword,
              firstName: body.firstName,
              familyName: body.familyName,
              userEmail: body.userEmail,
              bornDate: body.bornDate,
              ruleActepted: body.ruleActepted,
              created: body.created,
              userAvatar: file.filename,
              userRole: body.userRole,
              userCompany: body.userCompany,
              userNip: body.userNip,
              userRegon: body.userRegon,
              userAdress: body.userAdress,
              userCity: body.userCity,
              userPostal: body.userPostal, 
            });
            const errors = usersData.validateSync();
          
            usersData.save((err) => {
                if(err) {
                  res.render('admin/users-add', {
                    title: 'Dosdawanie użytkownika',
                    errors,
                    body
                  });
                  return;
                }
                res.redirect('/admin/users')
            });
          } else {
            const usersData = new Users(body);
            const errors = usersData.validateSync();
          
          
            usersData.save((err) => {
                if(err) {
                  res.render('admin/users-add', {
                    title: 'Dosdawanie użytkownika',
                    errors,
                    body
                  });
                  return;
                }
                res.redirect('/admin/users')
            });
          }
          }
        })
    });

    router.get('/users/show/:id', (req, res, next) => {
      const id = req.params.id

      console.log(id);

      Users.findById(id, (err, data) => {
        console.log(data);
        res.render('admin/users/users-show', { title: 'Użytkownik', data});
      });
      

    }); 

    router.get('/users/edit/:id', (req, res, next) => {
      const id = req.params.id

      console.log(id);

      Users.findById(id, (err, data) => {
        console.log(data);
        res.render('admin/users/users-edit', { title: 'Edycja użytkownika', data});
      });
      

    }); 


    router.post('/users/update', (req, res) => {
      uploadAvatar(req, res, function (err) {
        const body = req.body;
        const file = req.file;
        
        console.log(file);
        console.log(body);
        if (err) {
          console.log(err);
          return res.end("Coś poszło nie tak");
        } else {
          
          if (file !== undefined) {
    
    
              if(req.body.oldpicture !== undefined && req.body.oldpicture !== 'nopicture') {
                const path = `/images/avatars/${body.oldpicture}`;
                console.log(path);
                fs.unlinkSync("public"+path);
                Users.findByIdAndUpdate(body.id, {
                  loginName: body.loginName, 
                  userPassword: body.userPassword,
                  firstName: body.firstName,
                  familyName: body.familyName,
                  userEmail: body.userEmail,
                  bornDate: body.bornDate,
                  created: body.created,
                  userAvatar: file.filename,
                  userRole: body.userRole,
                  userCompany: body.userCompany,
                  userNip: body.userNip,
                  userRegon: body.userRegon,
                  userAdress: body.userAdress,
                  userCity: body.userCity,
                  userPostal: body.userPostal, 
                }, (err) => {
                  res.redirect('/admin/users')
                })
              }else if(req.body.oldpicture === 'nopicture'){
                Users.findByIdAndUpdate(body.id, {
                  loginName: body.loginName, 
                  userPassword: body.userPassword,
                  firstName: body.firstName,
                  familyName: body.familyName,
                  userEmail: body.userEmail,
                  bornDate: body.bornDate,
                  created: body.created,
                  userAvatar: file.filename,
                  userRole: body.userRole,
                  userCompany: body.userCompany,
                  userNip: body.userNip,
                  userRegon: body.userRegon,
                  userAdress: body.userAdress,
                  userCity: body.userCity,
                  userPostal: body.userPostal, 
                }, (err) => {
                  res.redirect('/admin/users')
                })
              }else {
                Users.findByIdAndUpdate(body.id, {
                  loginName: body.loginName, 
                  userPassword: body.userPassword,
                  firstName: body.firstName,
                  familyName: body.familyName,
                  userEmail: body.userEmail,
                  bornDate: body.bornDate,
                  created: body.created,
                  userRole: body.userRole,
                  userCompany: body.userCompany,
                  userNip: body.userNip,
                  userRegon: body.userRegon,
                  userAdress: body.userAdress,
                  userCity: body.userCity,
                  userPostal: body.userPostal, 
                }, (err) => {
                  res.redirect('/admin/users')
                })
              }
          }else {
            Users.findByIdAndUpdate(body.id, {
              loginName: body.loginName, 
              userPassword: body.userPassword,
              firstName: body.firstName,
              familyName: body.familyName,
              userEmail: body.userEmail,
              bornDate: body.bornDate,
              created: body.created,
              userRole: body.userRole,
              userCompany: body.userCompany,
              userNip: body.userNip,
              userRegon: body.userRegon,
              userAdress: body.userAdress,
              userCity: body.userCity,
              userPostal: body.userPostal, 
            }, (err) => {
              res.redirect('/admin/users')
            })
          }
    }
    });
    
    });

module.exports = router;