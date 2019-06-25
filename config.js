module.exports = {
  mongoOptions: {
    auth: { authSource: 'admin' },
    user: 'admin',
    pass: 'bridge5',
    connectTimeoutMS: 30000,
    keepAlive: 1000,
    reconnectTries: Number.MAX_VALUE,
    autoReconnect: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  database: 'mongodb://localhost:27017/AMSS5',
  port: process.env.PORT || 3124,
};
