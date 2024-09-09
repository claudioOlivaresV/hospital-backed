const jwt = require('jsonwebtoken')

const validarJWT = (req, res, next) => {
    // leer el token
    const token = req.header('x-token')
    console.log(token);
    if(!token) {
        res.status(401).json ({
            ok: false,
            msg: 'No existe token'
        })
    }
    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET)
        console.log(uid);
        req.uid = uid;
        next()
        
    } catch (error) {
        res.status(401).json ({
            ok: false,
            msg: 'No token valido'
        })
        
    }

}

module.exports = {
    validarJWT
}