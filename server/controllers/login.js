module.exports.get = (req, res) => {
    res.render('pages/login');
    console.log('---', req.url);
}