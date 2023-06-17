const { getAll } = require('../services/hotelService');

const homeController = require('express').Router();

// TODO replace with real controller by assignment
homeController.get('/', async (req,res)=>{
    const hotels = await getAll().lean()
    res.render('home', {
        title: 'Home Page',
        user: req.user,
        hotels
    })
})


module.exports = homeController;