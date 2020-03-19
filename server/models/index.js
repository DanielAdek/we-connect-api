import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import configPath from '../config/config.json';

dotenv.config();

const basename = path.basename(__filename);
const config = configPath[process.env.NODE_ENV];
const db = {};

const sequelize = new Sequelize(process.env[config.use_env_variable], { logging: false });

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0)
    && (file !== basename)
    && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.authenticate().then(() => {
  console.log(' Database connected');
  console.log(process.env.LINE);
}).catch((err) => {
  console.log(' Unable to connect ', err.message);
  console.log(process.env.LINE);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
