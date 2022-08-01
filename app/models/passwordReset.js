const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');


const PasswordReset = Schema({
    email: { type: String, require: true },
    token: { type: String, require: true },
    use: { type: Boolean, default: false },
}, { timestamps: true, toJSON: { virtuals: true } })



module.exports = mongoose.model('PasswordReset', PasswordReset);