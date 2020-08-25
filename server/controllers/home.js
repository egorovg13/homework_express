module.exports.get = (req, res) => {
    res.render('pages/index');
    console.log('---', req.url);
}