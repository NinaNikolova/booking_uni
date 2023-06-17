const { create, getAll, getById, update, deleteById, bookRoom } = require('../services/hotelService');
const { parseError } = require('../util/parser');
const hotelController = require('express').Router();

hotelController.get('/:id/details', async (req, res) => {
    const id = req.params.id;
    const hotel = await getById(id).lean()
    // !!! new property to object
    if (hotel.owner == req.user._id) {
        // we modify object !!!
        hotel.isOwner = true;
    } else if (hotel.usersBooked.map(b=>b.toString()).includes((req.user._id).toString())) {
        hotel.isBooked = true;
    }
    res.render('details', {
        hotel
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
        rooms: Number(req.body.rooms),
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

hotelController.get('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const hotel = await getById(id).lean()
    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login')
    }
    res.render('edit', {
        hotel
    })
});
hotelController.post('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const hotel = await getById(id).lean()
    // !!! use in detail too
    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login')
    }

    const edited = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: Number(req.body.rooms),
    }
    try {
        if (Object.values(edited).some(v => !v)) {
            throw new Error('All fields are required')
        }
        await update(id, edited);
        res.redirect(`/hotel/${id}/details`)
    } catch (error) {
        const errors = parseError(error)
        res.render('edit', {
            errors,
            hotel: Object.assign(edited, { _id: id })
        })
    }


});

hotelController.get('/:id/delete', async (req, res) => {
    const id = req.params.id;
    const hotel = await getById(id)
    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login')
    }

    await deleteById(id)

    res.redirect('/')
});
hotelController.get('/:id/book', async (req, res) => {
    const id = req.params.id;
    const hotel = await getById(id)
    try {
        if (hotel.owner == req.user._id) {
            hotel.isOwner = true;
            throw new Error('Cannot book your own hotel')
        }

        await bookRoom(id, req.user._id)
        res.redirect(`/hotel/${id}/details`)

    } catch (error) {
        res.render('details', {
            hotel,
            errors: parseError(error)
        })
    }

});
module.exports = hotelController;