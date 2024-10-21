const express=require('express');
const categoriaController = require('../controllers/categoriaController');
const router=express.Router();

router.get('/', categoriaController.obtenerCategorias);
router.get('/:id', categoriaController.obtenerCategoriaPorId);
router.post('/', categoriaController.crearCategoria);
router.put('/:id', categoriaController.actualizarCategoria);
router.delete('/:id',categoriaController.eliminarCategoria);

module.exports=router;