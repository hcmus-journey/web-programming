import dotenv from 'dotenv';
import Sequelize from 'sequelize';


dotenv.config();

// Database connection configuration
export const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
  dialect: 'postgres',
  logging: false,

});


