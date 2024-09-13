const Usuario = require("../models/usuario");

const getTodo = async (req, res) => {
    const busqueda = req.params.arg;
    const regex = new RegExp(busqueda, 'i')
    
    const usuarios = await  Usuario.find({nombre: regex})

    res.json({
        ok: true,
        busqueda,
        usuarios
    })

}

module.exports = {
    getTodo
}