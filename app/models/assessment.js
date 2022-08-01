const mongoose = require('mongoose');
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate');


const assessmentSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    class: { type: Schema.Types.ObjectId, ref: 'Course' },
    number: { type: String, default: '' },
    date: { type: String, default: '' },
}, { timestamps: true, toJSON: { virtuals: true } })


// User palgin paginate
assessmentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Assessment', assessmentSchema);