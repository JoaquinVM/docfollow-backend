const express = require('express');
const UsuarioController = require('../controllers/usuario.controller');

const router = express.Router();

router.post('/usuarios', UsuarioController.createUsuario);
router.get('/usuarios', UsuarioController.getUsuarios);
router.get('/usuario/:id', UsuarioController.getUsuario);
router.put('/usuario/:id', UsuarioController.updateUsuario);
router.delete('/usuario/:id', UsuarioController.deleteUsuario);


module.exports = router;
