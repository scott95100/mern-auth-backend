const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passport: {
        type: String,
        required: true,
        minLength: 8
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const user = mongoose.model('User', userSchema)

modeles.exports = user