const express = require('express');
const PendienteController = require('../controllers/pendiente.controller');
const TokenValidation = require('../verifyToken');

const router = express.Router();

router.get('/:id_usuario', PendienteController.getPendientes);


module.exports = router;
