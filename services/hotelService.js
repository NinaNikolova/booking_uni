const Hotel = require("../models/Hotel")

function getAll() {
    return Hotel.find()
}
function getById(id) {
    return Hotel.findById(id)
}
function create(hotel) {
    return Hotel.create(hotel)
}

function update(id, hotel) {
    return Hotel.findByIdAndUpdate(id, hotel)
}
function deleteById(id) {
    return Hotel.findByIdAndDelete(id)
}
function bookRoom(hotelId, userId) {
    
}
module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    bookRoom
}