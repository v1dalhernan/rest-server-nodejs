const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.js');



const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'no hay toke en la petición',
        });
    }


    try {

        const { uuid } = jwt.verify(token, process.env.JWTKEY);

        const usuario = await Usuario.findById(uuid);

        if(!usuario){
            return res.status(401).json({
                msg: 'Token no válido',
            });
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido',
            });
        }
        
        req.usuario = usuario;

        next();

    } catch(error){
        console.log(error);

        res.status(401).json({
            msg: 'Token no válido',
        });
    }


    // next();
}

module.exports = {
    validarJWT,
}