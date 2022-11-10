var express = require('express');
var router = express.Router();
const productRouter = require('./products')

router.use('/products', productRouter)

module.exports = router;
