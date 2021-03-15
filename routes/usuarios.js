const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/',
  usuarioController.nuevoUsuario
);

module.exports = router;