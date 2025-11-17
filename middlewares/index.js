const validarCampos = require('../middlewares/validar-campos.js');
const validaJWT = require('../middlewares/validar-jwt.js');
const validaRoles = require('../middlewares/validar-roles.js');



module.exports = {
    ...validarCampos,
    ...validaJWT,
    ...validaRoles
}