const autoBind = require('auto-bind');
const { validationResult } = require('express-validator/check');
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const isMongoId = require('validator/lib/isMongoId')
const sprintf = require('sprintf-js').sprintf;

module.exports = class Csontroller {
    constructor() {
        autoBind(this);
        this.RecaptchaConfig()
    }


    // Show view recaptcha
    RecaptchaConfig() {
        this.recaptcha = new Recaptcha(
            '6LeQE2QdAAAAAB7JT9Ys6f3aj-OcLrgPUn0BsJDa',
            '6LeQE2QdAAAAABMcNv-lUFOqjBnQKNPniuHEv-p6',
            { hl: 'fa' }
        );
    }


    // Check validation recaptcha
    RecaptchaValidation(req, res) {
        return new Promise((resolve, reject) => {
            this.recaptcha.verify(req, (err, data) => {
                if (err) {
                    req.flash('errors', 'من رباط نیستم را بزنید');
                    this.Back(req, res)
                } else {
                    resolve(true)
                }
            })
        })
    }


    // Validation fields
    async ValidationData(req) {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            const errors = result.array();
            let msg = [];
            errors.forEach(item => msg.push(item.msg));
            req.flash('errors', msg);
            return true;
        };
        return false;
    }


    // Go back page
    Back(req, res) {
        req.flash('formData', req.body)
        return res.redirect(req.header('Referer') || '/');
    }


    // Check mongo id
    IdMongoId(params) {
        if (!isMongoId(params)) {
            throw new Error('ایدی وارد شده صحیح نیست');
        }
    };


    // Error message handel
    Error(message, status = 500) {
        let err = new Error(`${message}`);
        err.status = status;
        throw err;
    };


    // 
    async getTime(episode) {
        let second = 0;
        await episode.forEach(item => {
            let splitList = item.time.split(':')
            if (splitList.length == 2) {
                second += parseInt(splitList[0]) * 60;
                second += parseInt(splitList[1]);
            } else if (splitList.length == 3) {
                second += parseInt(splitList[0]) * 3600;
                second += parseInt(splitList[1]) * 60;
                second += parseInt(splitList[2]);
            }
        });
        let hours = Math.floor(second / 60 / 60);;
        let minuts = Math.floor((second / 60 / 60) % 1 * 60);
        let secend = Math.floor(((second / 60 / 60) % 1 * 60) % 1 * 60);

        return sprintf('%02d:%02d:%02d', hours, minuts, secend);
    };


    Alert(req, data) {
        let title = data.title || '',
            icon = data.icon || 'info',
            message = data.message || '',
            button = data.button || null,
            timer = data.timer || 2000;
        req.flash('sweetalert', { title, icon, message, button, timer });
    };


    AlertAndBack(req, res, data) {
        this.Alert(req, data);
        this.Back(req, res);
    }
};