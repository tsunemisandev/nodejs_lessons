import knex from 'knex';
import path from 'path';

const connection = knex({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_BASE_NAME,
  },
});
export default connection;
