const { Router } = require('express');
const { userGet, userPatch, userPut, userPost, userDelete } = require('../controllers/user');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.js');

const routes = Router();

routes.get('/', userGet);

routes.put('/:id', userPut);

routes.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria y debe tener mas de 6 letras').isLength({min: 6}),
    check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos,
], userPost);

routes.delete('/', userDelete);


routes.patch('/', userPatch);


module.exports = routes;