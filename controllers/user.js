const { response } = require('express');

const userGet = (req, res = response) => {
    res.status(200).json({
        msg: 'get Api - controlador'
    });
}

const userPost = (req, res = response) => {
    res.status(201).json({
        msg: 'post Api - controlador'
    });
}


const userPut = (req, res = response) => {
    res.status(201).json({
        msg: 'put Api - controlador'
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