router.post('/users/add', (req, res) => {
    const userName = req.session.admin.sesName;
    const userSurname = req.session.admin.sesSurname;
    const userAvatar = req.session.admin.sesAvatar;
    
    uploadMedia(req, res, function (err) {
      const body = req.body;
      const file = req.file
  
      if (err) {
        console.log(err);
        return res.end("Something went wrong");
      } else {
  
        if (file !== undefined) {
          const usersData = new Users({
            nick: body.nick,
            name: body.name,
            surname: body.surname,
            email: body.email,
            password: body.password,
            rulacc: body.rulacc,
            avatar: file.filename,
            adres: body.adres,
            kod: body.kod,
            city: body.city,
            phone: body.phone,
            mobile: body.mobile,
            fax: body.fax,
          });
          const errors = usersData.validateSync();
        
          usersData.save((err) => {
              if(err) {
                res.render('admin/users-form', {
                  title: 'Dodaj Użytkownika',
                  userName: userName,
                  userSurname: userSurname,
                  userAvatar: userAvatar,
                  errors,
                  body
                });
                return;
              }
              res.redirect('/admin/users-list')
          });
        } else {
          const usersData = new Users({
            nick: body.nick,
            name: body.name,
            surname: body.surname,
            email: body.email,
            password: body.password,
            rulacc: body.rulacc,
            avatar: 'nopicture.jpg',
            adres: body.adres,
            kod: body.kod,
            city: body.city,
            phone: body.phone,
            mobile: body.mobile,
            fax: body.fax,
          });
          const errors = usersData.validateSync();
        
        
          usersData.save((err) => {
              if(err) {
                res.render('admin/users-form', {
                  title: 'Dodaj Użytkownika',
                  userName: userName,
                  userSurname: userSurname,
                  userAvatar: userAvatar,
                  errors,
                  body
                });
                return;
              }
              res.redirect('/admin/users-list')
          });
        }
        }
      })
  });

  router.post('/users/update', (req, res) => {
    uploadMedia(req, res, function (err) {
      const body = req.body;
      const file = req.file;
      
      console.log(file);
      console.log(body);
      if (err) {
        console.log(err);
        return res.end("Something went wrong");
      } else {
        
        if (file !== undefined) {
  
  
            if(req.body.oldpicture !== undefined && req.body.oldpicture !== 'nopicture') {
              const path = `/images/media/${body.oldpicture}`;
              console.log(path);
              fs.unlinkSync("public"+path);
              Users.findByIdAndUpdate(body.id, {
                nick: body.nick,
                name: body.name,
                surname: body.surname,
                email: body.email,
                password: body.password,
                avatar: file.filename,
                adres: body.adres,
                kod: body.kod,
                city: body.city,
                phone: body.phone,
                mobile: body.mobile,
                fax: body.fax,
              }, (err) => {
                res.redirect('/admin/users-list')
              })
            }else if(req.body.oldpicture === 'nopicture'){
              Users.findByIdAndUpdate(body.id, {
                nick: body.nick,
                name: body.name,
                surname: body.surname,
                email: body.email,
                password: body.password,
                avatar: file.filename,
                adres: body.adres,
                kod: body.kod,
                city: body.city,
                phone: body.phone,
                mobile: body.mobile,
                fax: body.fax,
              }, (err) => {
                res.redirect('/admin/users-list')
              })
            }else {
              Users.findByIdAndUpdate(body.id, {
                nick: body.nick,
                name: body.name,
                surname: body.surname,
                email: body.email,
                password: body.password,
                adres: body.adres,
                kod: body.kod,
                city: body.city,
                phone: body.phone,
                mobile: body.mobile,
                fax: body.fax,
              }, (err) => {
                res.redirect('/admin/users-list')
              })
            }
        }else {
          Users.findByIdAndUpdate(body.id, {
            nick: body.nick,
            name: body.name,
            surname: body.surname,
            email: body.email,
            password: body.password,
            adres: body.adres,
            kod: body.kod,
            city: body.city,
            phone: body.phone,
            mobile: body.mobile,
            fax: body.fax,
          }, (err) => {
            res.redirect('/admin/users-list')
          })
        }
  }
  });
  
  });