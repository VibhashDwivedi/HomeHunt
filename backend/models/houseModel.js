const { model, Schema } = require('../connection');

const houseSchema = new Schema({
    place: String,
    area: String,
    houseNo: String,
    bedrooms: Number,
    hospitalNearby: String,
    rent: Number,
    image: String,
    location: {
        lat: Number,
        lng: Number
    }
});

module.exports = model('houses', houseSchema);