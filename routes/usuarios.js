const { Router } = require('express');
const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuario');
const { check } = require('express-validator');
const { validarCampos } = require('../middelwares/validar-campo');
const { validarJWT } = require('../middelwares/validar-jwt');
const router = Router();
// get
router.get('/',validarJWT , getUsuarios);

// agregar
router.post('/',[
    validarJWT,
    check('nombre', 'Nombre Obligatorio').not().isEmpty(),
    check('password', 'Password obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio y el formato correcto').isEmail(),
    // middelware personalizado
    validarCampos,

] ,  crearUsuario);
// modificar

router.put('/:id',[
    validarJWT,
    check('nombre', 'Nombre Obligatorio').not().isEmpty(),
    check('role', 'El rol es obligatiro').not().isEmpty(),
    check('email', 'El email es obligatorio y el formato correcto').isEmail(),
    validarCampos,
], actualizarUsuario)


// elminar
router.delete('/:id',validarJWT,  eliminarUsuario);


module.exports = router