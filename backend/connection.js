const mongoose = require('mongoose');

require('dotenv').config({ path: '../.env' });


const url = process.env.MONGODB_URL;


mongoose.connect(url)
.then((result) => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose;