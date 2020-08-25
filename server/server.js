const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.set('views', './source/template/');
app.set('view engine', 'pug');

app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', require('./routes/index'));

app.use (function(req, res, next) {
    let err = new Error('Not Found');

    err.status = 404;

    next(err);  
})


app.use( (err, req, res, next) => {
    res.status(err.status || 500);
    res.render('pages/error', {message: err.message, error: err})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});