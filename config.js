require('dotenv').config();
module.exports = {
  mongoOptions: {
    // auth: { authSource: 'admin' },
    // user: 'admin',
    // pass: 'test',
    connectTimeoutMS: 30000,
    keepAlive: 1000,
    reconnectTries: Number.MAX_VALUE,
    autoReconnect: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  database: process.env["DB_HOST"] || 'mongodb://localhost:27017/test',
  port: process.env.PORT || 8111,
};
