const express = require('express');
const { verifyToken } = require('../utils/jwt');
const compraController = require('../controllers/compraController');
const router = express.Router();

router.post('/', compraController.crearCompra);
router.get('/:id', verifyToken, compraController.getCompraById);
router.get('/', compraController.getAllCompras);
router.put('/:id', verifyToken, compraController.updateCompra);
router.delete('/:id', compraController.deleteCompra);

module.exports = router;
