const mongoose = require('mongoose');




const url ="mongodb+srv://vibhashdwivedi:root@cluster0.6qvouo6.mongodb.net/rentifydb?retryWrites=true&w=majority"


mongoose.connect(url)
.then((result) => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose;