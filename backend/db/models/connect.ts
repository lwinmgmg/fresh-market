import { Sequelize } from "sequelize";

import config from "../config/config";

const env = process.env.NODE_ENV;

export const sequelize = new Sequelize(config[env]);
