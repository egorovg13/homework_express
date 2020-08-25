const express = require('express');
const router = express.Router();

module.exports = router;

const ctrlHome = require('../controllers/home');
const ctrlLogin = require('../controllers/login');
const ctrlAdmin = require('../controllers/admin');

router.get('/', ctrlHome.get);
// router.get('/login', ctrlLogin.get)

router.get('/login.html', (req, res) => {
    res.redirect('/login')
})

router.get('/login', ctrlLogin.get);

router.get('/admin.html', (req, res) => {
    res.redirect('/admin');
})

router.get('/admin', ctrlAdmin.get);