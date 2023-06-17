const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const hotelController = require('../controllers/hotelController');
const profileController = require('../controllers/profileController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController)
    app.use('/hotel', hotelController)
    app.use('/profile', profileController)


}