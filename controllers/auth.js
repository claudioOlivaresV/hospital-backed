const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/usuario");
const bcrypt = require('bcrypt'); // or 'bcryptjs' if you are using that package

const login = async( req, res) => {
    const { email, password} = req.body;

    try {
        const usuarioBD = await Usuario.findOne({email})
        if(!usuarioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'email no encontrado'
            })
        }
        // varificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioBD.password)
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'password no encontrado'
            })
        }
        const token = await generarJWT(usuarioBD.id)
        res.json({
            msn: 'ok',
            token
        })
        
    } catch (error) {
        console.log('aqio');
        res.status(500).json({
            ok: false,
            msg: error
        })
        
    }
}

module.exports = {
    login
}