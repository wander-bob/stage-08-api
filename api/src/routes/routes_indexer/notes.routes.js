const { Router } = require('express');
const MovieNotesController = require('../../controller/MovieNotesController');

const movieNotesRouter = Router();
const movieNotesController = new MovieNotesController();

movieNotesRouter.get('/search/', movieNotesController.index);
movieNotesRouter.get('/list', movieNotesController.read);
movieNotesRouter.post('/new/:id', movieNotesController.create);
movieNotesRouter.delete('/new/:id', movieNotesController.delete);

module.exports = movieNotesRouter;