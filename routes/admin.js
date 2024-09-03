const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
// GET request
router.get('/', adminController.getAdminDashboard);
router.get('/products/all', adminController.getProductsAll)
router.get('/products/add',adminController.getProductsAdd)
router.get('/products/update/:id', adminController.getProductsUpdate)
router.get('/products/delete/:id', adminController.getProductsDelete)
// router.get('products/:id')
// router.get('products/delete/:id')

router.post('/products/add',adminController.postProductsAdd)
router.post('/products/update',adminController.postProductUpdate)
// router.post('/products/update')

module.exports=router