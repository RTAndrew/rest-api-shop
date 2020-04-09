const express = require('express');
const router = express.Router();

const SaleController = require('../Controllers/Sale.controller');


router.get('/', SaleController.getAllSales);

router.post('/', SaleController.createNewSale);

router.get('/:id', SaleController.findSaleById)

router.patch('/:id', SaleController.updateSaleById)

router.delete('/:id', SaleController.deleteSaleById);





module.exports = router;