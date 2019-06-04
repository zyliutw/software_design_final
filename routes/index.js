var express = require('express');
var pool = require('../middleware/database.js')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/information_page', function (req, res, next) {
  res.json({ 'information': 'value' });
})

router.get('/management_page', function (req, res, next) {
  res.json({ 'management': 'value' });
})

router.get('/calendar_page', function (req, res, next) {
  res.json({ 'calendar': 'value' });
})

router.get('/board_page', function (req, res, next) {
  res.json({ 'board': 'value' });
})

router.get('/fund_management_page', function (req, res, next) {
  res.json({ 'fund_management': 'value' });
})

router.get('/file_page', function (req, res, next) {
  res.json({ 'file': 'value' });
})

router.get('/member_page', function (req, res, next) {
  res.json({ 'member': 'value' });
})


module.exports = router;
