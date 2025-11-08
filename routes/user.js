const { Router } = require('express');
const { userGet, userPatch, userPut, userPost, userDelete } = require('../controllers/user');

const routes = Router();

routes.get('/', userGet);

routes.put('/', userPut);

routes.post('/', userPost);

routes.delete('/', userDelete);


routes.patch('/', userPatch);


module.exports = routes;