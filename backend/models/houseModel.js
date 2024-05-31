const { model, Schema } = require('../connection');

const houseSchema = new Schema({
    locate: String,
    place: String,
    area: String,
    houseNo: String,
    bedrooms: Number,
    rent: Number,
    phone: Number,
    image: String,
    location: {
        lat: Number,
        lng: Number
    },
    UserId: String,
});

module.exports = model('houses', houseSchema);