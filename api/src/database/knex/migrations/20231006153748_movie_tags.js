exports.up = knex => knex.schema.createTable('movie_tags', (table)=>{
  table.uuid('uuid').primary().default(knex.fn.uuid());
  table.string('name').unique();
  table.uuid('user_id').references('uuid').inTable('users');
  table.uuid('note_id').references('uuid').inTable('movie_notes').onDelete('CASCADE');
});
;

exports.down = knex => knex.schema.dropTable('movie_tags');
