const express = require('express');
const juegosController = require('../controllers/juegosController');
const router = express.Router();

router.post('/', juegosController.crearJuego);
router.get('/:id', juegosController.getJuegoById);
router.get('/', juegosController.getAllJuegos);
router.put('/:id', juegosController.updateJuego);
router.delete('/:id', juegosController.deleteJuego);

module.exports = router;
