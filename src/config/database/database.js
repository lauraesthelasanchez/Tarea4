import { Sequelize } from 'sequelize';
import { envs } from './../environments/environments.js';

export const sequelize = new Sequelize(envs.DB_URI, {
  logging: false,
});

export async function auth() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been authenticated successfully');
  } catch (error) {
    console.log(error);
  }
}

export async function sync() {
  try {
    await sequelize.sync(); // { force: true }
    console.log('Connection has been synchronized successfully');
  } catch (error) {
    console.log(error);
  }
}
