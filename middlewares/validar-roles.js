const { request, response } = require("express")




const esAdminRol = (req = request, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se requiere verificar el role para validar el token primero',
        });
    }

    const {rol} = req.usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: 'Este usuario no cuenta con los permisos para realizar esta acción'
        });
    }

    next();
} 


const tieneRol = (...roles) => {

    return (req = request, res = response, next) => {
        if(!req.usuario){
        return res.status(500).json({
            msg: 'Se requiere verificar el role para validar el token primero',
        });
    }

    const {rol} = req.usuario;

    if(!roles.includes(rol)){
        return res.status(401).json({
            msg: 'Este usuario no cuenta con los permisos para realizar esta acción'
        });
    }

    next();
    }

}



module.exports = {
    esAdminRol,
    tieneRol,
}