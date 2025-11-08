const { response, request } = require('express');

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

const userPost = (req, res = response) => {

    const {nombre, edad } = req.body;

    res.status(201).json({
        msg: 'post Api - controlador',
        nombre,
        edad,
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