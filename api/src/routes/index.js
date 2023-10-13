const {Router} = require('express');
const userRoutes = require('./routes_indexer/user.routes');
const movieNotesRoutes = require('./routes_indexer/notes.routes')
const movieTagsRoutes = require('./routes_indexer/tags.routes')
const routes = Router();
routes.use('/user', userRoutes);
routes.use('/notes', movieNotesRoutes);
routes.use('/tags', movieTagsRoutes);

module.exports = routes;