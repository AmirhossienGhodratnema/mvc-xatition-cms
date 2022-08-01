const mongoose = require('mongoose');
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate');

const PremissionSchema = Schema({
    name: { type: String, default: '' },
    lable: { type: String, default: '' },
}, { timestamps: true, toJSON: { virtuals: true } })


PremissionSchema.plugin(mongoosePaginate);
PremissionSchema.virtual('roles', { ref: 'Role', localField: '_id', foreignField: 'permission' });

module.exports = mongoose.model('Permission', PremissionSchema);