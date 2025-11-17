const { Router } = require('express');
const { check } = require('express-validator');


const { userGet, userPut, userPost, userDelete } = require('../controllers/user');

const { esRolValido, existeEmail, existeUsuarioConId } = require('../helpers/db-validators.js');
const { validarJWT, validarCampos, tieneRol } = require('../middlewares/index.js');


const routes = Router();

routes.get('/',[
    check('desde', 'debe ser un numero entero positivo').isInt({ min: 1 }),
    check('limite', 'debe ser un numero entero positivo').isInt({ min: 1 }),
    validarCampos,
], userGet);

routes.put('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioConId),
    check('rol').custom(esRolValido),
    validarCampos,
], userPut);

routes.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(existeEmail),
    check('password', 'La contraseña es obligatoria y debe tener mas de 6 letras').isLength({min: 6}),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos,
], userPost);

routes.delete('/:id',[
    validarJWT,
    // esAdminRol,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioConId),
    validarCampos,
], userDelete);



module.exports = routes;