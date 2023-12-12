const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    username: String,
    password: String,
    phone_number: String,
    register_date: Date,
    referral_code: String,
    referred_code: String,
    invited_list: Array,
    privateKey: String,
    publicKey: String,
    mnemonic: String,
});

User = mongoose.model('User', UserSchema);

module.exports = {
  User
};