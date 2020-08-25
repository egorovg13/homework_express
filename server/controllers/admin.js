module.exports.get = (req, res) => {
    res.render('pages/admin');
    console.log('---', req.url);
}