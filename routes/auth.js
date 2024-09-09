const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middelwares/validar-campo');
const { login } = require('../controllers/auth');
const router = Router();

router.post('/', [
     check('password', 'Password obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio y el formato correcto').isEmail(),
    validarCampos
], login)

module.exports = router