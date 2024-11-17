const express = require('express');
const { verifyToken } = require('../utils/jwt');
const compraController = require('../controllers/compraController');
const router = express.Router();

router.post('/', verifyToken, compraController.crearCompra);
router.get('/:id', verifyToken, compraController.getCompraById);
router.get('/', verifyToken, compraController.getAllCompras);
router.put('/:id', verifyToken, compraController.updateCompra);
router.delete('/:id', verifyToken, compraController.deleteCompra);

module.exports = router;
