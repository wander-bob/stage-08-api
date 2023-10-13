const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class MovieTagsController{
  async read(req, res){
    try {
      const {user_id} = req.params;
      const tags = await knex('movie_tags').where({user_id});
      res.json(tags);
    }catch(error) {
      console.log(error)
      return res.status(400).json({
        error,
      });
    }
  }
  async show(req, res){
    try {
      const tags = await knex('movie_tags');
      res.json(tags);
    }catch(error) {
      console.log(error)
      return res.status(400).json({
        error,
      });
    }
  }
};
module.exports = MovieTagsController;