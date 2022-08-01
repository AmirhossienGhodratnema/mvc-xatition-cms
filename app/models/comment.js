const mongoose = require('mongoose');
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate');


const CommetnSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    parent: { type: Schema.Types.ObjectId, ref: 'Commetn', default: null },
    course: { type: Schema.Types.ObjectId, ref: 'Course' , default: undefined },
    episode: { type: Schema.Types.ObjectId, ref: 'Episodes' , default: undefined },
    approved: { type: Boolean, default: false },
    description: { type: String, require: true },
}, { timestamps: true, toJSON: { virtuals: true } })

CommetnSchema.plugin(mongoosePaginate);

CommetnSchema.virtual('comments', { ref: 'Commetn', localField: '_id', foreignField: 'parent' });


module.exports = mongoose.model('Commetn', CommetnSchema);