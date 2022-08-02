const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');
const mongoosePaginate = require('mongoose-paginate');


const UserSchema = Schema({
    name: { type: String, require: true },
    lastName: { type: String, default: '', require: true },
    learning: [{ type: Schema.Types.ObjectId, ref: 'Course', require: true }],
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    birth: { type: String, default: '' },
    address: { type: String, default: '' },
    number: { type: String, default: '' },
    rememberToken: { type: String, default: null },
    email: { type: String, require: true },
    password: { type: String, require: true },
    admin: { type: Boolean, default: false },
    nationalCode: { type: String || Number, default: 252 },
    fatherName: { type: String, default: '' },
    fatherBirth: { type: String, default: '' },
    vipTime: { type: Date, default: new Date().toISOString() },
    vipType: { type: String, default: 'month' },
    fahterJob: { type: String, default: '' },
    fatherNumber: { type: String, default: '' },
    motherName: { type: String, default: '' },
    motherBirth: { type: String, default: '' },
    motherJob: { type: String, default: '' },
    moderNumber: { type: String, default: '' },
}, { timestamps: true, toJSON: { virtuals: true } })


// User palgin paginate
UserSchema.plugin(mongoosePaginate);


// Save hash password
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, bcrypt.genSaltSync(15), (err, hash) => {
        if (err) console.log('Error for hashing password register user ...!');
        this.password = hash;
        next();
    });
})


// Compare password login
UserSchema.methods.comparePassword = async function (password) {
    let pass = await bcrypt.compareSync(password, this.password);
    return pass;
}


// Check vip course type
UserSchema.methods.isVip = function () {
    return new Date(this.vipTime) > new Date();
}


// Check register class
UserSchema.methods.registerClass = async function (episodes, user) {

    let check = false;
    await episodes.forEach(episode => {
        if (episode.user == user) check = true;
    })

    return check
}


// Check vip course type
UserSchema.methods.isCash = function (course) {
    return false;
}


// Check cash course
UserSchema.methods.checkLearning = function (courseId) {
    return this.learning.indexOf(courseId) !== -1;
}


// Set token for remember
UserSchema.methods.setRememberToken = async function (res) {
    const token = uniqueString()
    await res.cookie('Remember_token', token, { maxAge: 1000 * 60 * 60 * 24 * 2, httpOnly: true, signed: true })
    await this.updateOne({ rememberToken: token }, err => {
        if (err) console.log('Error remember token ...!')
    });
}


// Check atorisition user
UserSchema.methods.hasRoles = function (roles) {
    let result = roles.filter(role => {
        return this.roles.indexOf(role) > -1;
    });
    return !!result.length;
}

module.exports = mongoose.model('User', UserSchema);