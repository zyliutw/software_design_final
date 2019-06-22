var express = require('express');
var router = express.Router();
var UserModel = require('../model/user');
var BulletinModel = require('../model/bulletin');
var FileUploadModel = require('../model/fileupload');
var path = require('path'); 
var multer  = require('multer')
var upload = multer({ dest: path.join(__dirname + '../../public/uploads/') })



router.get('/', function (req, res, next) {
  if (req.session.isLogin != 1) { //if not login
    res.redirect('/login');
  }
  else {
    res.render(path.join(__dirname, '../public/home.html'))
  }
});

router.get('/login', function (req, res, next) {
    if (req.session.isLogin == 1) { //user already login
      res.redirect('/');
    } else { // user not login yet
      res.render(path.join(__dirname, '../public/log_in.html'))
    }
});

// user login
router.post('/login', function (req, res) {
  let user = req.body.username;
  let pass = req.body.pass;

  UserModel.find({account: user}, 'pwd', function (err, docs){
    if(err) return handleError(err);
    //console.log(docs);
    if(docs[0]!=null && docs[0].pwd == pass){
      req.session.account = user;
      req.session.isLogin = 1;
      res.redirect('/');
    }

    else if (user == 'admin' && pass == 'admin') { // 開發方便用，完成後記得刪除ㄛ
      req.session.account = user;                 // .
      req.session.isLogin = 1;                     // .
      res.redirect('/');                           // .
    }                                              // 刪到這邊 :D

    else res.json({ ret_code: 1, ret_msg: '帳號或密碼錯誤' });
  });
});

// user logout
router.post('/logout', function (req, res, next) {
  if (req.session){
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else{
        return res.redirect('/login');
      }
    });
  }
});

router.get('/information', function (req, res, next) {
  if (req.session.isLogin != 1) { //if not login
    res.redirect('/login');
  }
  else {
    res.render(path.join(__dirname, '../public/information.html'))
  }
})

router.get('/management_page', function (req, res, next) {
  if (req.session.isLogin != 1) { //if not login
    res.redirect('/login');
  }
  else {
    res.json({'management': 'value'});
  }
})

router.get('/calendar_page', function (req, res, next) {
  if (req.session.isLogin != 1) { //if not login
    res.redirect('/login');
  }
  else {
    res.json({ 'calendar': 'value' });
  }
})

// board page render
router.get('/board', function (req, res, next) {
  if (req.session.isLogin != 1) { //if not login
    res.redirect('/login');
  }
  else {
      BulletinModel.find({}, function(err, docs) {
          if (!err) {
              let user = [];
              let date = [];
              let body = [];

              docs.forEach(post => {
                  user.push(post.userName);
                  date.push(post.date);
                  body.push(post.body);
              })
              //res.render(path.join(__dirname, '../public/board.html'),  {'user': user.toString(), 'date': date.toString(), 'body': body.toString()});
              // waiting for frontend page
          } else { throw err; }
      });
      res.json({'board': 'value'});
  }
});

// add a new post on bulletin
router.post('/board', function (req, res, next) {
    let userAcc = req.session.account;
    let body = req.body.body;
    UserModel.findOne({account: userAcc}, 'name', function (err, docs) {
        if(err) throw err;
        console.log(docs);
        if(docs==null) res.json({ ret_code: 1, ret_msg: '無效的使用者' });
        else{
            let userName = docs.name;
            let msg = new BulletinModel({
                userAcc: userAcc,
                userName: userName,
                body: body
            });
            msg.save()
                .then(doc => {
                    console.log(doc)
                })
                .catch(err => {
                    console.error(err)
                });
            res.json({ 'state': 'ok' });
        }
    });
});

router.get('/fund_management_page', function (req, res, next) {
  if (req.session.isLogin != 1) { //if not login
    res.redirect('/login');
  }
  else {
    res.json({'fund_management': 'value'});
  }
})

router.get('/file', function (req, res, next) {
  if (req.session.isLogin != 1) { //if not login
    res.redirect('/login');
  }
  else {
    res.json({'file': 'value'});
  }
})

router.post('/file', upload.single('file'), function (req, res, next) {
            console.log('f')
            let msg = new FileUploadModel({
                userAcc: 'a',
                userName: 'b',
                description: 'b',
                path: req.file.filename,
            });
            msg.save()
                .then(doc => {
                    console.log(doc)
                })
                .catch(err => {
                    console.error(err)
                });
            res.json({ 'state': 'ok' });
/*
    let userAcc = req.session.account;
    let description = req.body.description;
    FileUploadModel.findOne({account: userAcc}, 'name', function (err, docs) {
        if(err) throw err;
        if(docs==null) res.json({ ret_code: 1, ret_msg: '無效的使用者' });
        else{
            
        }
    });
    */
})


router.get('/member', function (req, res, next) {
  if (req.session.isLogin != 1) { //if not login
    res.redirect('/login');
  }
  else {
    UserModel.find({}, function(err, users) {
        if (!err) {
            let name = []
            let date = []
            let info = []

            users.forEach(user => {
                name.push(user.name);
                date.push(user.date);
                info.push(user.info);
            })
            res.render(path.join(__dirname, '../public/member.html'),  {'name': name.toString(), 'date': date.toString(), 'info': info.toString()});

        } else { throw err; }
    });

  }
})

router.post('/addMember', function (req, res, next) {

  let account = req.body.account;
  let name = req.body.name;
  let date = req.body.date;
  let info = req.body.info;
  let email = req.body.email;

  let msg = new UserModel({
    account: account,
    name: name,
    pwd: '0000',
    date: date,
    email: email,
    info: info,
    manager: false,
  });
  msg.save()
    .then(doc => {
      console.log(doc)
    })
    .catch(err => {
      console.error(err)
    });

  res.json({ 'state': 'ok' });
});

router.post('/updateAccount', function (req, res, next) {

  let name = req.body.name;
  let email = req.body.email;
  let info = req.body.info;

  let msg = {
    name: name,
    email: email,
    info: info
  };
  console.log(msg);

  let acc = req.session.account;
  UserModel.updateOne(
    {account: acc},
    msg,
    function (err, docs) {
        if(err) throw err;
    })

});

module.exports = router;
