// const { query } = require('express')
const Product = require('../models/Product')
const Joi = require('joi')

const validator = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    category: Joi.string().min(4).max(40).required(),
    subcategory: Joi.string().min(4).max(40).required(),
    price: Joi.number().min(1).max(500).required(),
    stock: Joi.number().integer().min(0).required(),
    photo: Joi.string().uri().message('INVALID_URL').required(),
})
const validator2 = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().min(4).max(50).required(),
    category: Joi.string().min(4).max(40).required(),
    subcategory: Joi.string().min(4).max(40).required(),
    price: Joi.number().min(1).max(500).required(),
    stock: Joi.number().integer().min(0).required(),
    photo: Joi.string().uri().message('INVALID_URL').required(),
})

const productController = {
    create: async (req, res) => {
        try {
            let result = await validator.validateAsync(req.body)
            let product = await new Product(req.body).save()
            if (product) {
                res.status(201).json({
                    message: 'Product created',
                    success: true,
                })
            } else {
                res.status(404).json({
                    message: "Product not created",
                    success: false
                })
            }

        } catch (error) {
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },
    readAll: async (req, res) => {
        let products;
        let query = {};
        let sort;
        if (req.query.product) {
            const queryString = new RegExp(`${req.query.product}`)
            query.name = { $regex: queryString, $options: 'ix' }
        }
        if (req.query.sort) {
            sort = req.query.sort
        }
        if (req.query.category) {
            const queryString = new RegExp(`${req.query.category}`)
            query.category = { $regex: queryString, $options: 'ix' }
            
        }
        if (req.query.subcategory) {
            const queryString = new RegExp(`^${req.query.subcategory}`)
            query.subcategory = { $regex: queryString, $options: 'i' }       
        }
        try {
            products = await Product.find(query).sort({ price: sort })
            if (products) {
                let subcategories = []
                if (req.query.category) {
                    let productsc = await Product.find({category: req.query.category})
                    subcategories = [... new Set(productsc.map(item => item.subcategory))]
                }
                console.log(subcategories)
                res.json({
                    message: "You get products",
                    response: {products: products, subcategories: subcategories},
                    success: true
                })
            }else {
                res.status(404).json({
                    message: "We couldn't find your products",
                    success: false
                })
            }
            
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "Error",
                success: false
            })
        }
    },
    readOne: async (req, res) => {
        const { id } = req.params
        try {
            let product = await Product.findOne({ _id: id })
            if (product) {
                res.status(200).json({
                    message: "You get one product",
                    response: product,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "We couldn't find your product",
                    success: false
                })
            }
        } catch (error) {
            res.status(400).json({
                message: "Error",
                success: false
            })
        }
    },
    update: async (req, res) => {
        const { id } = req.params
        const product = req.body
        console.log(product)
        try {
            let result = await validator2.validateAsync(req.body)
            let newProduct = await Product.findOneAndUpdate({ _id: id }, product, { new: true })
            if (newProduct) {
                res.status(200).json({
                    message: "Your product is update",
                    response: newProduct,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "We couldn't update your product",
                    success: false
                })
            }
        } catch (error) {
            console.log(error.message)
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },
    destroy: async (req, res) => {
        const { id } = req.params
        try {
            let product = await Product.findOneAndDelete({ _id: id })
            if (product) {
                res.status(200).json({
                    message: "Product deleted",
                    response: product,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Product not deleted",
                    success: false
                })
            }
        } catch (error) {
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    }
}
module.exports = productController