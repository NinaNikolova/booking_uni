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

async function update(id, hotel) {
    const existing = await Hotel.findById(id);
    existing.name = hotel.name;
    existing.city = hotel.city;
    existing.imageUrl = hotel.imageUrl;
    existing.rooms = hotel.rooms;
    await existing.save();
}



function deleteById(id) {
    return Hotel.findByIdAndDelete(id)
}
async function bookRoom(hotelId, userId) {
    const hotel = await Hotel.findById(hotelId);
    if (hotel.usersBooked.includes(userId)) {
        throw new Error('Cannot book twice')
    }
    hotel.usersBooked.push(userId);
    await hotel.save()
}
module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    bookRoom
}