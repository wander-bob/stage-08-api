exports.up = knex => knex.schema.createTable('users', (table)=>{
  table.uuid('uuid').primary().default(knex.fn.uuid());
  table.string('name');
  table.string('email').unique();
  table.string('password');
  table.string('avatar');
  table.datetime('created_at').defaultTo(knex.raw(`(datetime('now', 'localtime'))`));
  table.datetime('updated_at').defaultTo(knex.raw(`(datetime('now', 'localtime'))`));
});
exports.down = knex => knex.schema.dropTable('users');