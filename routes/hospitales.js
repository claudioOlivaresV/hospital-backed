const { Router } = require('express');
const { validarJWT } = require('../middelwares/validar-jwt');
const { getHospitales, crearHospital, actualizarHospital, eliminarHospital } = require('../controllers/hospitales');
const { check } = require('express-validator');
const { validarCampos } = require('../middelwares/validar-campo');

const router = Router();
router.get('/' , getHospitales);

// agregar
router.post('/',[
    validarJWT,
    check('nombre', 'el nombre del hispital es neesario').not().isEmpty(),
    validarCampos,

] ,  crearHospital);
// modificar

router.put('/:id',[
    // validarJWT,
], actualizarHospital)


// elminar
router.delete('/:id', eliminarHospital);


module.exports = router