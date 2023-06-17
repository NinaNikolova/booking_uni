const { hasUser } = require('../middlewares/guards');
const { getByUserBooking } = require('../services/hotelService');

const profileController = require('express').Router();

// TODO replace with real controller by assignment
profileController.get('/', hasUser(), async(req,res)=>{
    const hotels = await getByUserBooking(req.user._id)
    console.log(hotels)
    res.render('profile', {
              hotels
    })
})


module.exports = profileController;