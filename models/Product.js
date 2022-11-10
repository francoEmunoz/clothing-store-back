const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 50
    },
    category: {
        type: String,
        required: true,
        min: 4,
        max: 40
    },
    subcategory: {
        type: String,
        required: true,
        min: 4,
        max: 40
    },
    price: {
        type: Number,
        required: true,
        min: 0.01,
        max: 1000
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    photo: {
        type: String,
        required: true,
        validate: function (value) {
            if (!value.startsWith('http')) {
                throw new Error('The URL must start with http')
            }
        }
    }
})

const Product = mongoose.model('products', productSchema)
module.exports = Product