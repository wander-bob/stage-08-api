const { Router } = require('express');
const MovieTagsController = require('../../controller/MovieTagsController');

const movieTagsRoutes = Router();
const movieTagsController = new MovieTagsController();

movieTagsRoutes.get('/list/:user_id', movieTagsController.read)
movieTagsRoutes.get('/list/', movieTagsController.show)

module.exports = movieTagsRoutes;