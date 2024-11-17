const express = require('express');
const { verifyToken } = require('../utils/jwt');
const juegosController = require('../controllers/juegosController');
const router = express.Router();

router.post('/', verifyToken, juegosController.crearJuego);
router.get('/:id', juegosController.getJuegoById);
router.get('/', juegosController.getAllJuegos);
router.put('/:id', verifyToken, juegosController.updateJuego);
router.delete('/:id', verifyToken, juegosController.deleteJuego);

module.exports = router;
