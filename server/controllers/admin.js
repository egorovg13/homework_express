const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const { nextTick } = require('process');
const db = require('../model');

module.exports.get = (req, res) => {
  res.render('pages/admin');
  console.log('---', req.url);
};

module.exports.post = (req, res) => {
  if (req.body.age) {
    console.log('age entered');
    db.get('skills').find({ text: 'Возраст начала занятий на скрипке' }).assign({
      number: req.body.age,
    }).write();
  }
  if (req.body.concerts) {
    console.log('concerts entered');
    db.get('skills').find({ text: 'Концертов отыграл' }).assign({
      number: req.body.concerts,
    }).write();
  }
  if (req.body.cities) {
    console.log('cities entered');
    db.get('skills').find({ text: 'Максимальное число городов в туре' }).assign({
      number: req.body.cities,
    }).write();
  }
  if (req.body.years) {
    console.log('age entered');
    db.get('skills').find({ text: 'Лет на сцене в качестве скрипача' }).assign({
      number: req.body.years,
    }).write();
  }
  res.render('pages/admin', {
    msgskill: 'Навыки обновлены',
  });
};

module.exports.upload = (req, res) => {
  const form = new formidable.IncomingForm();
  const upload = path.join('./public/assets', 'img');

  const validation = (fields, files) => {
    if (files.photo.name === '' || files.photo.size === 0) {
      return { status: 'Не загружена картинка!', err: true };
    }
    if (!fields.name) {
      return { status: 'Не указано описание картинки!', err: true };
    }
    if (!fields.price) {
      return { status: 'Не указана цена картинки!', err: true };
    }
    return { status: 'Ok', err: false };
  };

  form.uploadDir = path.join(process.cwd(), upload);

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
    }

    const valid = validation(fields, files);

    if (valid.err) {
      fs.unlinkSync(files.photo.path);
      console.log(valid.err.status);
    }

    const fileName = path.join(upload, files.photo.name);

    fs.rename(files.photo.path, fileName, (err) => {
      if (err) {
        console.log(err);
      }
      const publicPath = fileName.substr(fileName.indexOf('/assets'));

      const productObj = {
        src: publicPath,
        name: fields.name,
        price: fields.price,
      };

      db.get('products').push(productObj).write();
    });

    res.render('pages/admin', {
      msgfile: 'Файл успешно загружен',
    });
  });
};