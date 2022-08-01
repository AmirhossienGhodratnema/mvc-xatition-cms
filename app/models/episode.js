const mongoose = require('mongoose');
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt');



const EpisodesSchema = Schema({
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

EpisodesSchema.plugin(mongoosePaginate);

EpisodesSchema.methods.typeToPersion = function () {
    switch (this.type) {
        case 'cash':
            return 'نقدی'
        case 'vip':
            return 'ویژه'
        default:
            return 'رایگان'
    }
}


EpisodesSchema.methods.donwload = function (req) {
    if (!req.isAuthenticated()) return '#';

    let status = false;

    switch (this.type) {
        case 'free':
            status = true;
            break;

        case 'vip':
            status = req.user.isVip();
            break;

        case 'cash':
            status = req.user.checkLearning(this.course);
            break;
        default:
            break;
    }

    // Create timeStamp Uniq
    let timeStamp = new Date().getTime() + 3600 + 1000 + 12

    // Mac addres url 
    let text = `#@%AFDG^ysd%&^$%#43FDSGAag234fadf${this.id}${timeStamp}`;

    // Hashi addres
    let sult = bcrypt.genSaltSync(15);
    let hash = bcrypt.hashSync(text, sult)


    return status ? `/download/${this.id}?mac=${hash}&t=${timeStamp}` : '#';
}

module.exports = mongoose.model('Episodes', EpisodesSchema)