import knex from '../database/connection';
import User from '../models/User';

class UserDao {
  async insert(user: User) {
    const { name, email, password } = user;
    return await knex('users').insert({ name, email, password });
  }

  async exists(user: User) {
    const { name, email, password } = user;
    const registered = await knex('users').where({ name }).first();
    if (registered) {
      return true;
    } else {
      return false;
    }
  }
  async existsByEmail(email: string) {
    const user = await knex('users').where({ email }).first();
    return user;
  }
}
export default UserDao;
