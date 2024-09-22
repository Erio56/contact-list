import { Sequelize } from 'sequelize-typescript';

import User from '../models/User';
import Contact from '../models/Contact';

const sequelize = new Sequelize({
  database: 'ContactApp',
  dialect: 'sqlite',
  storage: './database.sqlite',
  models: [ User, Contact ],
});

console.log(__dirname + '/models');

export const initDatabase = async () => {
   try {
      await sequelize.authenticate();
      sequelize.sync();
      console.log('Connection has been established successfully.');
   } catch (error) {
      console.error('Unable to connect to the database:', error);
   }
}


