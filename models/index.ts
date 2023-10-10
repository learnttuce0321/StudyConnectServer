import { Sequelize } from 'sequelize';
// const process = require('process');
const env = 'development';
import { cfg } from '../config/config';
import { Config } from '../types/types';
import { initUser } from './user';

const configs: Config = cfg
const config = configs[env]

interface DB {
  [key: string]: any;
  sequelize?: Sequelize;
}

const db: DB = {};

const sequelize = new Sequelize(
    config.database, 
    config.username, 
    config.password === null ? undefined : config.password, 
    {
        host: config.host,
        dialect: "mysql",
        timezone: "+09:00",
    }
);

initUser(sequelize)

// import TodosTable from './todosTable.js';
// const tempTodosTable = TodosTable(sequelize)
// db.TodosTable = tempTodosTable

db.sequelize = sequelize;

export default sequelize
