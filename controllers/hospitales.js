const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales =  async (req, res = response) => {
    const hospitales = await Hospital.find().populate('usuario', 'nombre email img')

    try {
        res.json({
            ok: true,
            hospitales,
        })
        
    } catch (error) {
        
    }

}
const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({usuario: uid, ...req.body});
    
    try {
        await hospital.save()
        res.json({
            ok: true,
            hospital,
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        })
        
    }

}
const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'put'
    })

}
const eliminarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete'
    })

}
module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}