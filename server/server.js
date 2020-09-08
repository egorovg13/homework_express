const express = require('express');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');

app.set('views', './source/template/');
app.set('view engine', 'pug');

app.use(session({
  secret: 'happy dog',
  saveUninitialized: true,
  resave: true,
}));

app.use(flash());

app.use(express.static(path.join(process.cwd(), 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/index'));

app.use((req, res, next) => {
  const err = new Error('Not Found');

  err.status = 404;

  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('pages/error', { message: err.message, error: err });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
