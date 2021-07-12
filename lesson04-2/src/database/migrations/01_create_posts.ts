import { Knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary();
    table.string('title', 30).notNullable();
    table.string('content', 140).notNullable();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('id').inTable('users');
    table.timestamp('created_at').defaultTo(knex.fn.now())
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('posts');
}
