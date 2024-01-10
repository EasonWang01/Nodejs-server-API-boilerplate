const { Sequelize } = require('sequelize');

// Initialize Sequelize with your MySQL connection details
const sequelize = new Sequelize('theDB', 'root', 'example', {
  host: 'localhost',
  dialect: 'mysql',
});

// Synchronize the model with the database (creates tables if they don't exist)
sequelize.sync({ force: true }).then(() => {
  console.log('Database and tables have updated!');
}).catch((error) => {
  console.error('Error synchronizing the database:', error);
});


// const User = require('./schemas/User');

// Define models and associations here

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Sync your models with the database (create tables if they don't exist)
    await sequelize.sync();
    console.log('Database synchronization complete.');

    // Perform database operations here

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;