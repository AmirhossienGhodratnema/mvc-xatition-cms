const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');
const mongoosePaginate = require('mongoose-paginate');


const paymentSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    course: { type: Schema.Types.ObjectId, ref: 'Course' , default : null },
    status: { type: String, default: '' },
    price: { type: String, default: '0' },
    restnumber: { type: String, default: null },
    payment: { type: Boolean, default: false },
}, { timestamps: true, toJSON: { virtuals: true } })

paymentSchema.plugin(mongoosePaginate);



module.exports = mongoose.model('Payment', paymentSchema);