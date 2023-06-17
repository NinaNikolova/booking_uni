const { create, getAll, getById, update, deleteById, bookRoom } = require('../services/hotelService');
const { parseError } = require('../util/parser');
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

hotelController.post('/create', async (req, res) => {
    const hotel = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: req.body.rooms,
        owner: req.user._id
    }

    try {
        if (Object.values(hotel).some(v => !v)) {
            throw new Error('All fields are required')
        }
        await create(hotel);
        res.redirect('/')
    } catch (error) {
        const errors = parseError(error)
        res.render('create', {
            errors,
            body: hotel
        })
    }

});

hotelController.get('/:id/edit', (req, res) => {
    res.render('edit', {
        user: req.user
    })
});
module.exports = hotelController;