const express = require('express');
const { verifyToken } = require('../utils/jwt');
const categoriaController = require('../controllers/categoriaController');
const router = express.Router();

router.get('/', verifyToken, categoriaController.obtenerCategorias);
router.get('/:id', categoriaController.obtenerCategoriaPorId);
router.post('/', verifyToken, categoriaController.crearCategoria);
router.put('/:id', verifyToken, categoriaController.actualizarCategoria);
router.delete('/:id', verifyToken, categoriaController.eliminarCategoria);

module.exports = router;