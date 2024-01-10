const { DataTypes } = require('sequelize');
const sequelize = require('../connect');

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER, // Use INTEGER for auto-incrementing primary key
    allowNull: false,
    primaryKey: true, // Set userId as the primary key
    autoIncrement: true, // Enable auto-increment
  },
  walletAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // Set the default value to the current timestamp
  },
});

module.exports = User;