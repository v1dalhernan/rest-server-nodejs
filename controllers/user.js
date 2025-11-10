const { response, request } = require('express');
const bryptsjs = require('bcryptjs');


const Usuario = require('../models/usuario.js');


const userGet = async  (req = request, res = response) => {

    const { limite = 5, desde= 0 } = req.query;
    const query= {estado:true};


   const [usuarios, total]= await Promise.all([
        Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
        Usuario.countDocuments(query),
   ])

   return res.status(200).json({
    usuarios,
    total
   });
}

const userPost = async  (req, res = response) => {

    

    const {
        nombre,
        correo,
        password,
        rol,
        imagen ='', 
    } = req.body;

    const usuario = new Usuario({
        nombre, correo, password, rol, imagen
    });

    // encriptar la contraseña 
    const salt = bryptsjs.genSaltSync(10);
    usuario.password = bryptsjs.hashSync(password, salt);

    //guardar en la base de datos
    await usuario.save();

    return res.status(201).json({
        msg: 'post Api - controlador',
        usuario,
    });
}


const userPut = async (req, res = response) => {

    const { id } = req.params;

    const {password, google, correo, _id,  ...resto} = req.body;



    if(password){
        // encriptar la contraseña 
        const salt = bryptsjs.genSaltSync(10);
        resto.password = bryptsjs.hashSync(password, salt);
    }

        const usuario = await Usuario.findByIdAndUpdate(id, resto);


    return res.status(201).json(usuario);
}


const userDelete = async (req, res = response) => {

    const { id } = req.params;

    // const usuario  = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});


    return res.status(201).json({
        usuario,
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
}