require("dotenv").config();

module.exports = {
  development: {
    username: process.env.FM_DB_USER,
    password: process.env.FM_DB_PASSWORD,
    database: process.env.FM_DB_NAME,
    host: process.env.FM_DB_HOST,
    port: process.env.FM_DB_PORT,
    dialect: process.env.FM_DB_CONNECTOR,
  },
  test: {
    username: process.env.FM_DB_USER,
    password: process.env.FM_DB_PASSWORD,
    database: "test_" + process.env.FM_DB_NAME,
    host: process.env.FM_DB_HOST,
    port: process.env.FM_DB_PORT,
    dialect: process.env.FM_DB_CONNECTOR,
  },
};
