const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    register_data: Date,
    walletAddress: String
});

User = mongoose.model('User', UserSchema);

module.exports = {
  User
};