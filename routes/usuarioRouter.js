const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.post('/', usuarioController.crearUsuario);
router.get('/:id', usuarioController.getUsuarioById);
router.get('/', usuarioController.getAllUsuarios);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;
