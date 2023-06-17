const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i;
const hotelSchema = new Schema({
    name: {
        type: String,
        required: [true,'Hotel name is required'],
        unique: true,
        minlength: [4, 'Hotel name should be at least 4 characters long']
    },
    city: {
        type: String,
        required: [true,'City is required'],
        minlength: [3, 'City should be at least 3 characters long']
    },
    imageUrl: {
        type: String,
        required: [true,'ImageUrl is required'],
        validate:{
            validator: (value)=>{URL_PATTERN.test(value)},
            message: 'Image URL is not valid'
        }

        // match:[/^https?.+/, 'Inccorect image URL']

    },
    rooms:{
        type: Number,
        required: [true,'Rooms are required'],
       min:[1, 'Rooms should be beetwen 1 and 100'],
       max:[100, 'Rooms should be beetwen 1 and 100']
    },
    usersBooked: {
        type: [Types.ObjectId],
        ref: 'User',
        default:[]
    },
    owner:{
        type: Types.ObjectId,
        ref: 'User',
        required: [true,'Owner is required'],
    }

})
hotelSchema.index({ name: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})
const Hotel = model('Hotel', hotelSchema);
module.exports = Hotel;