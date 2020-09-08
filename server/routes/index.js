const express = require('express');

const router = express.Router();

module.exports = router;

const ctrlHome = require('../controllers/home');
const ctrlLogin = require('../controllers/login');
const ctrlAdmin = require('../controllers/admin');

router.get('/', ctrlHome.get);
router.post('/', ctrlHome.post);

router.get('/login.html', (req, res) => {
  res.redirect('/login');
});

router.get('/login', ctrlLogin.get);
router.post('/login', ctrlLogin.post);


router.get('/admin.html', (req, res) => {
  res.redirect('/admin');
});

router.get('/admin', ctrlAdmin.get);
router.post('/admin/skills', ctrlAdmin.post);
router.post('/admin/upload', ctrlAdmin.upload);