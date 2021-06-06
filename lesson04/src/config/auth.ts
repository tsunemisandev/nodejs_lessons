export default {
  SECRET: process.env.AUTH_SECRET || '123123',
  //Token expiration date for 1 hour
  EXPIRATION: Math.floor(Date.now() / 1000) + 60 * 60,
  SALT: 8,
};
