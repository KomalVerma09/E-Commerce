const path = require('path')
const express = require('express')
const router = express.Router();

const shopController = require('../controllers/shop')
// router.get('/products/all',);
router.get('/', shopController.getHome)
// router.get('/products/all', shopController.getProductsAll);
router.get('/products/:id', shopController.getSpecificProductById);
// router.get('/cart',)
router.get('/cartPage', shopController.getCart);
router.get('/cartPage/add/:id', shopController.getAddToCartById);
// router.get('/cart/add',)
router.get('/cartPage/increase/:id', shopController.getIncreaseQuantity)
router.get('/cartPage/decrease/:id', shopController.getDecreaseQuantity)

router.get('/cart/buy', shopController.getCartBuy)

module.exports=router; 