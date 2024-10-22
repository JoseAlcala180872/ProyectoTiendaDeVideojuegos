const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const { verifyToken } = require('../utils/jwt');
const router = express.Router();

router.post('/login', usuarioController.login);
router.post('/', verifyToken, usuarioController.crearUsuario);
router.get('/:id', verifyToken, usuarioController.getUsuarioById);
router.get('/', verifyToken, usuarioController.getAllUsuarios);
router.put('/:id', verifyToken, usuarioController.updateUsuario);
router.delete('/:id', verifyToken, usuarioController.deleteUsuario);

module.exports = router;
