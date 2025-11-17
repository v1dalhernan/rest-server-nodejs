const { response, request } = require('express');
const bryptsjs = require('bcryptjs');


const Usuario = require('../models/usuario.js');
const { generarJwt } = require('../helpers/generar-jwt.js');



const login = async  (req = request, res = response) => {

    const {correo, password} = req.body;

    try {

        //verificar si el email existe 

        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg: "Usuario / Password incorrectos"
            })
        }

        //si el usuario esta activo 

        if(!usuario.estado){
            return res.status(400).json({
                msg: "Usuario / Password incorrectos"
            })
        }

        //verificar la contraseña 
        const validPasword =  bryptsjs.compareSync(password, usuario.password);

        if(!validPasword){
            return res.status(400).json({
                msg: "Usuario / Password incorrectos"
            })
        }

        //generar el jwt
        const token = await generarJwt(usuario.id);






        return res.json({
            usuario,
            token,
        });

    }catch(error) {
        console.log(error);
        return res.status(500).json({
            msg: "Ha ocurrido un error inesperado"
        });
    }
}




module.exports = {
    login,
}