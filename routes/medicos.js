const { Router } = require('express');
const { validarJWT } = require('../middelwares/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, eliminarMedico } = require('../controllers/medicos');
const { check } = require('express-validator');
const { validarCampos } = require('../middelwares/validar-campo');

const router = Router();
router.get('/' , getMedicos);

// agregar
router.post('/',[
    validarJWT,
    check('nombre', 'el nombre del medico es neesario').not().isEmpty(),
    check('hospital', 'necesita un id de hospital').isMongoId(),

    validarCampos

] ,  crearMedico);
// modificar

router.put('/:id',[
    // validarJWT,
], actualizarMedico)


// elminar
router.delete('/:id', eliminarMedico);


module.exports = router