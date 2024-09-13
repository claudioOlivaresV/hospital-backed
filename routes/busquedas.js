const { Router } = require('express');
const { validarJWT } = require('../middelwares/validar-jwt');
const { getTodo } = require('../controllers/busqueda');


const router = Router();
router.get('/:arg',validarJWT , getTodo);




module.exports = router