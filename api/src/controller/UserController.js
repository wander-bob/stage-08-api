const AppError = require('../utils/AppError');
const crypto = require('node:crypto');
const knex = require('../database/knex');


class UserController {
  async create(req, res){
    try {
      const {name, email, password} = req.body;
      const checkIfEmailExists = await knex('users').select('email').where({email});
      if(checkIfEmailExists.length){
        throw new AppError('O e-mail informado já está cadastrado.');
      }
      const passwordHashed = await crypto.createHash('sha256').update(password).digest('hex');
      await knex('users').insert({name, email, password: passwordHashed});
      return res.json({
        message: 'User created.'
      });
    }catch(error) {
      console.log(error)
      return res.status(400).json({
        error,
      });
    }
  };
  async show(req, res){
    try {
        const sourceIp = req.socket.remoteAddress;
        const isInternal = sourceIp.includes('127.0.0') || sourceIp.includes('::1');
        if(!isInternal){
          console.log(`Unauthorized access from ${isInternal}`)
          throw new AppError(`Route not found`);
        }
        const result = await knex('users');
        
        return res.status(200).json({
          result
        });  
    } catch (error) {
      res.status(error.statusCode).json({message: error.message});
    }
    
  };
  async update(req, res){
    try {
      const {email, old_password, new_password} = req.body;
      const oldPasswordHashed = crypto.createHash('sha256').update(old_password).digest('hex');
      const newPasswordHashed = crypto.createHash('sha256').update(new_password).digest('hex');
      const user = await knex('users').where({email}).first();
      if(!user){
        throw new AppError('Usuário não encontrado')
      };
      if(oldPasswordHashed !== user.password){
        throw new AppError('Senha atual inválida.')
      };
      await knex('users').update({
        password: newPasswordHashed,
        updated_at: knex.raw(`(datetime('now', 'localtime'))`)
      }).where({email});
  
      return res.json({
        message: 'User was been updated.'
      });
    } catch(error) {
      console.log(error)
      return res.json({error})
    }
  };
}
module.exports = UserController;