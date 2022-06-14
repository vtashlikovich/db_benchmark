const { Sequelize } = require('@sequelize/core');
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.Console({ level: 'warn' }),
      new winston.transports.File({ filename: './logs/all.log' }),
    ],
  });

const sequelizeInstance = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        operatorsAliases: false,
        port: process.env.DB_PORT,
        logging: false,
        operatorsAliases: 0
    }
);
  
const db = {Sequelize, sequelizeInstance};
module.exports = db;