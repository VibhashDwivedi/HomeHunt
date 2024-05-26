const {model, Schema}= require('../connection');

const myschema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: String,
    profile: String,
});
module.exports = model('users', myschema);