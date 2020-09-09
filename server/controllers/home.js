const db = require('../model')

module.exports.get = (req, res) => {
  res.render('pages/index', {
    skills: db.get('skills').value(),
    products: db.get('products').value(),
  });
};

module.exports.post = (req, res) => {
  req.flash('msgemail', `Ваше сообщение было получено, ${req.body.name}`);
  db.get('messages').push(req.body).write();
  res.render('pages/index', {
    msgemail: req.flash("msgemail"),
    skills: db.get('skills').value(),
    products: db.get('products').value(),
  });
}