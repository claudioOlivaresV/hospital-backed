const Usuario = require("../models/usuario");
const { response } = require('express');
const bcrypt = require('bcrypt'); // or 'bcryptjs' if you are using that package
const { generarJWT } = require("../helpers/jwt");



const getUsuarios = async (req, res) => {
    const usuarios =  await Usuario.find({}, 'nombre email role google')
    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    })

}

const crearUsuario = async (req, res = response) => {
    console.log(req.body);

    const { email, password, nombre} = req.body;
    

  

    try {
        // veridifcar si existe

        const existeEmail = await Usuario.findOne({email})
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'correo ya existe'
            }
            )
        }
        const usuario = new Usuario(req.body)

        // Encriptar
        const salt = bcrypt.genSaltSync(10); // Generate salt with 10 rounds
        const hashedPassword = bcrypt.hashSync(password, salt); // Hash the password with salt
        usuario.password = hashedPassword;
        
        
        await usuario.save();
        const token = await generarJWT(usuario.id)
        res.json({
            ok: true,
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error de servidor'
        })
        
    }
}

const actualizarUsuario = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const usuarioBD = await Usuario.findById(uid)
        if(!usuarioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usaurio con ese id'
            })
        }

        // actualizaciones
        const campos = req.body;

        if(usuarioBD.email === req.body.email) {
            delete campos.email;
        } else {
            const existeEmail = await Usuario.findOne({email: req.body.email})
            if(existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email' 
                })
            }

        }
        delete campos.password;
        delete campos.google;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true})

        
        console.log(uid);
        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
        
    }

}
const eliminarUsuario = async(req, res = response) => {
    const uid = req.params.id;

    try {
          const usuarioBD = await Usuario.findById(uid)
        if(!usuarioBD) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usaurio con ese id'
            })
        }
        await Usuario.findByIdAndDelete(uid)
        res.json({
            ok: true,
            uid,
            msg: 'Usuario eleminado'
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado borrar'
        })
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}