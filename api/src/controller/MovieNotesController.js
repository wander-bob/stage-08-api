const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class MovieNotesController{
  async create(req, res){
    try {
      const {title, description, rating, tags} = req.body;
      const user_id = req.params.id;
      const checkIfNoteExists = await knex('movie_notes').whereLike('title', `%${title}%`);
      if(checkIfNoteExists.length){
        throw new AppError("Esse filme já foi cadastrado.");
      }
      const [note] = await knex('movie_notes').returning('uuid').insert({title, description, rating, user_id});
      
      const filterEmptyTags = tags.filter(tag => {return tag;});
      filterEmptyTags.map(async (tag) => {
        const [checkIfTagExists] = await knex('movie_tags').whereLike('name', `%${tag}%`);
        if(!checkIfTagExists?.name){
          await knex('movie_tags').insert({name: tag, note_id: note.uuid, user_id})
        }
      });
        
      res.json({
        message: 'Completed.'
      })
    }catch(error) {
      console.log(error)
      return res.status(400).json({
        error,
      });
    }
  }
  async delete (req, res){
    try {
      
    } catch (error) {
      console.log(error);
      res.json({error});
    }
  }
  async index (req, res){
    try {
      const {user_id, title, tags} = req.query;
      let notes;
      
      if(tags){
        const filteredTags = tags.split(',').map(tag => tag);
        notes = await knex('movie_tags')
        .where('movie_notes.user_id', user_id)
        .whereLike('movie_notes.title', `%${title}%`)
        .whereIn('name', filteredTags)
        .innerJoin('movie_notes', 'movie_notes.uuid', 'movie_tags.note_id')
        .orderBy('movie_notes.title');
      }else{
        notes = await knex('movie_notes')
          .where({user_id})
          .whereLike("movie_notes.title", `%${title}%`);
      }
      return res.json(notes)
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        error,
      });
    }
  }
  async read(req, res){
    try {
      const notes = await knex('movie_notes');
      const tags = await knex('movie_tags');
      const notesList = notes.map((note)=>{
        const tagsToInsert = tags.filter((tag)=>  tag.note_id === note.uuid);
        const movie_tags = tagsToInsert.map((tag)=> tag.name)
        return {
          title: note.title,
          description: note.description,
          movie_tags
        }
      })
      return res.json(notesList);
    } catch(error){
      console.log(error)
      return res.status(400).json({
        error,
      });
    }
  }
};
module.exports = MovieNotesController;