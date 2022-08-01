const mongoose = require('mongoose');
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate');

const RoleSchema = Schema({
    name: { type: String, default: '' },
    lable: { type: String, default: '' },
    permission: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
}, { timestamps: true, toJSON: { virtuals: true } })

RoleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Role', RoleSchema);