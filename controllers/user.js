const { response, request } = require('express');
const bryptsjs = require('bcryptjs');


const Usuario = require('../models/usuario.js');


const userGet = (req = request, res = response) => {

    const { 
        q, 
        nombre = "no name", 
        apikey, 
        page = 1, 
        limit = 10 
    } = req.query;


    res.status(200).json({
        msg: 'get Api - controlador',
        q,
        nombre,
        apikey,
        page,
        limit,
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


    // verficar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail) return res.status(400).json({
        msg: 'Este correo ya esta registrado',
    });


    // encriptar la contraseña 
    const salt = bryptsjs.genSaltSync(10);
    usuario.password = bryptsjs.hashSync(password, salt);

    //guardar en la base de datos
    await usuario.save();

    res.status(201).json({
        msg: 'post Api - controlador',
        usuario,
    });
}


const userPut = (req, res = response) => {

    const { id } = req.params;


    res.status(201).json({
        msg: 'put Api - controlador',
        id,
    });
}

const userPatch = (req, res = response) => {
    res.status(200).json({
        msg: 'patch Api - controlador'
    });
}

const userDelete = (req, res = response) => {
    res.status(201).json({
        msg: 'delete Api - controlador'
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete,
}