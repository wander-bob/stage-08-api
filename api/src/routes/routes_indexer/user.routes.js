const { Router } = require('express');
const UserController = require('../../controller/UserController');

const usersRoutes = Router();
const usersController = new UserController();

usersRoutes.get('/', usersController.show);
usersRoutes.post('/', usersController.create);
usersRoutes.put('/:id', usersController.update);

module.exports = usersRoutes;