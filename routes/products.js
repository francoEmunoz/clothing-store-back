var express = require('express');
var router = express.Router();
let passport = require("../config/passport");
const { create, readAll, readOne, update, destroy } = require('../controllers/productController')

router.post('/', create)
router.get('/', readAll)
router.get('/:id', readOne)
router.patch('/:id', passport.authenticate("jwt", { session: false }), update)
router.delete('/:id', passport.authenticate("jwt", { session: false }), destroy)

module.exports = router;