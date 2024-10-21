const express = require('express');
const compraController = require('../controllers/compraController');
const router = express.Router();

router.post('/', compraController.crearCompra);
router.get('/:id', compraController.getCompraById);
router.get('/', compraController.getAllCompras);
router.put('/:id', compraController.updateCompra);
router.delete('/:id', compraController.deleteCompra);

module.exports = router;
