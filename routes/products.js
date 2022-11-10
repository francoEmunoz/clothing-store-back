var express = require('express');
var router = express.Router();
const { create, readAll, readOne, update, destroy } = require('../controllers/productController')

router.post('/', create)
router.get('/', readAll)
router.get('/:id', readOne)
router.patch('/:id', update)
router.delete('/:id', destroy)

module.exports = router;