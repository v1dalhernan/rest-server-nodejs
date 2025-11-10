const Role = require('../models/rol.js');
const Usuario = require('../models/usuario.js');


const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol) throw new Error(`el rol ${rol} no está registrado en la base de datos.`);
}



// verficar si el correo existe
const existeEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail) throw new Error(`El correo ${correo} no está registrado en la base de datos.`);
}


// verficar si el correo existe
const existeUsuarioConId = async (id = '') => {
    const existeUser = await Usuario.findById(id);
    if(!existeUser) throw new Error(`El usuario no existe ${id}.`);
}


module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioConId,
}