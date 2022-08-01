const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');
const mongoosePaginate = require('mongoose-paginate');


const CourseSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    title: { type: String, require: true },
    slug: { type: String, require: true },
    type: { type: String, require: true },
    description: { type: String, require: true },
    images: { type: Object, require: true },
    thumbnail: { type: String, require: true },
    price: { type: String, require: true },
    tags: { type: String, require: true },
    time: { type: String, default: '00:00:00' },
    viewCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    lang: { type: String, default: 'fa' },
}, { timestamps: true, toJSON: { virtuals: true } })

CourseSchema.plugin(mongoosePaginate);

CourseSchema.virtual('episodes', { ref: 'Episodes', localField: '_id', foreignField: 'course' });
CourseSchema.virtual('comment', { ref: 'Commetn', localField: '_id', foreignField: 'course' });


CourseSchema.methods.typeToPersion = function () {
    switch (this.type) {
        case 'cash':
            return 'نقدی'
        case 'vip':
            return 'ویژه'
        default:
            return 'رایگان'
    };
};


module.exports = mongoose.model('Course', CourseSchema);