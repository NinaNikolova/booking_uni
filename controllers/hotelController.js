const hotelController = require('express').Router();
hotelController.get('/:id/details', (req, res) => {
    res.render('details', {
        user: req.user
    })
});

hotelController.get('/create', (req, res) => {
    res.render('create', {
        user: req.user
    })
});

hotelController.get('/:id/edit', (req, res) => {
    res.render('edit', {
        user: req.user
    })
});
module.exports = hotelController;