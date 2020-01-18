const express = require('express');
const UsuarioController = require('../controllers/usuario.controller');

const router = express.Router();

router.post('/create', UsuarioController.createUsuario);
router.get('/getAll', UsuarioController.getUsuarios);
router.get('/getOne/:id', UsuarioController.getUsuario);
router.put('/update/:id', UsuarioController.updateUsuario);
router.delete('/delete/:id', UsuarioController.deleteUsuario);


module.exports = router;
