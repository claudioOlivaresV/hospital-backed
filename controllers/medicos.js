const { response } = require("express");
const Medicos = require("../models/medicos");

const getMedicos =  async (req, res = response) => {
    const medicos  = await Medicos.find().populate('usuario', 'nombre email img').populate('hospital', 'nombre')

    res.json({
        ok: true,
        medicos
    })

}
const crearMedico = async (req, res = response) => {
    const uid = req.uid;
    const medico = new Medicos({usuario: uid, ...req.body});
    await medico.save()
    res.json({
        ok: true,
        medico,
    })

}
const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'put'
    })

}
const eliminarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete'
    })

}
module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}