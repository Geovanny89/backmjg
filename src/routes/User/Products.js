const express = require("express");
const { productoUser, productxName, productId ,productByTipoId} = require("../../controller/User/producto.controller");

const router = express();

router.get('/user/allProducts', productoUser)
router.get('/user/product/:name', productxName)
router.get('/user/products/:id',productId)
router.get('/user/product/category/:id', productByTipoId)

module.exports = router