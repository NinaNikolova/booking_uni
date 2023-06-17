const profileController = require('express').Router();

// TODO replace with real controller by assignment
profileController.get('/', (req,res)=>{
    res.render('profile', {
              user: req.user
    })
})


module.exports = profileController;