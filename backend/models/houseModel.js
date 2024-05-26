const { model, Schema } = require('../connection');

const houseSchema = new Schema({
    place: String,
    area: String,
    houseNo: String,
    bedrooms: Number,
    bathrooms: Number,
    hospitalNearby: String,
    rent: Number,
    image: String,
});

module.exports = model('house', houseSchema);