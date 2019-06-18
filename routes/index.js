var express = require('express');
var router = express.Router();
var UserModel = require('../model/user')
var path = require('path');



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
    if(docs[0]!=null && docs[0].pwd == pass){
      req.session.account = user;
      req.session.isLogin = 1;
      res.redirect('/');
    }

    else if (user == 'admin' && pass == 'admin') { // 開發方便用，完成後記得刪除ㄛ
      req.session.username = user;                 // .
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

router.get('/information_page', function (req, res, next) {
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

router.get('/board_page', function (req, res, next) {
  if (req.session.isLogin != 1) { //if not login
    res.redirect('/login');
  }
  else {
    res.json({'board': 'value'});
  }
})

router.get('/fund_management_page', function (req, res, next) {
  if (req.session.isLogin != 1) { //if not login
    res.redirect('/login');
  }
  else {
    res.json({'fund_management': 'value'});
  }
})

router.get('/file_page', function (req, res, next) {
  if (req.session.isLogin != 1) { //if not login
    res.redirect('/login');
  }
  else {
    res.json({'file': 'value'});
  }
})

router.get('/member', function (req, res, next) {
  if (req.session.isLogin != 1) { //if not login
    res.redirect('/login');
  }
  else {
    res.render(path.join(__dirname, '../public/member.html') ,  {name: 'hihi,bbb', date: '11,22', info: 'a,b'});
    /*
    UserModel
      .find({
        name: 'user1'   // search query
      })
      .then(doc => {
        console.log('ff')
        console.log(doc)
      })
      .catch(err => {
        console.error(err)
      })
    res.json({'member': 'value'});*/
  }
})

router.post('/add_member', function (req, res, next) {

  let name = req.body.name;
  let date = req.body.date;
  let info = req.body.info;

  let msg = new UserModel({
    name: name,
    pwd: '0000',
    date: date,
    info: info
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
  let info = req.body.aboutme;

  let msg = new UserModel({
    name: name,
    email: email,
    info: info
  });

  let acc = req.session.account;
  UserModel.where().
    findOneAndReplace(
    {account: acc},
    msg,
    function (err, docs) {
      if(err) return handleError(err);
    })

});

module.exports = router;
