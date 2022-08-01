const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');
const mongoosePaginate = require('mongoose-paginate');


const BuySchema = Schema({
    user: { type: Schema.Types.ObjectId, ref:'User'},
    name: { type: String, default: '' },
    price: { type: String, default: '0' },
    date: { type: String, default: null },
    number: { type: String, default: '' },
    nameStore: { type: String, default: '' },
}, { timestamps: true, toJSON: { virtuals: true } })

BuySchema.plugin(mongoosePaginate);



module.exports = mongoose.model('Buy', BuySchema);