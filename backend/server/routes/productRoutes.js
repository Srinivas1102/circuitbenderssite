const express = require('express');
const router = express.Router();
const {getAllProducts, getProductbyId} = require('../controller/productController')
//@route GET /api/products
router.get('/', getAllProducts)

//@route GET /api/id
router.get('/:id', getProductbyId)

module.exports = router;