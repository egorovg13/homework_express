const db = require('../model');

module.exports.get = (req, res) => {
  res.render('pages/login');
  console.log('---', req.url);
};

module.exports.post = (req, res) => {
  res.redirect('/admin');
  db.get('users').push(req.body).write();
};
