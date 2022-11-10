const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 40,
        min: 4,
    },
    lastName: {
        type: String,
        required: true,
        max: 40,
        min: 4,
    },
    mail: { type: String, required: true },
    password: [{
        type: String,
        required: true,
        max: 100,
        min: 3
    }],
    country: {
        type: String,
        required: true,
        max: 40,
        min: 4,
    },
    role: { type: String, required: true },
    from: [{ type: String, required: true }],
    logged: { type: Boolean, required: true },
    verified: { type: Boolean, required: true },
    code: { type: String, required: true },
})


const User = mongoose.model(
    'users',
    userSchema
)

module.exports = User