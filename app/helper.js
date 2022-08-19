const autoBind = require('auto-bind');
const path = require('path');
const moment = require('jalali-moment');
moment.locale('fa');


module.exports = class Helper {
    constructor(req, res) {
        autoBind(this);
        this.req = req;
        this.res = res;
        this.formData = req.flash('formData')[0]
    }


    // Send add configorations for global
    getObjects() {
        return {
            auth: this.auth(),
            viewPath: this.viewPath,
            ...this.getObgect(),
            old: this.old,
            req: this.req,
            date: this.date,
            getTime: this.getTime,
            getJTime: this.getJTime
        };
    };


    // Check user for online
    auth() {
        return {
            check: this.req.isAuthenticated(),
            user: this.req.user,
        }
    }


    // Get view path
    viewPath(dir) {
        return path.join(__dirname + '/' + dir)
    }


    // Get all flash massage : errors
    getObgect() {
        return {
            errors: this.req.flash('errors')
        }
    }


    old(field, defaultValue = '') {
        return this.formData && this.formData.hasOwnProperty(field) ? this.formData[field] : defaultValue;
    };

    date(time) {
        // var d = new persianDate([1391]);  
        return moment(time).startOf('hour').fromNow();
    }

    getTime(time) {
        return moment(time).format('YYYY/MM/DD');
    }

    getJTime(time) {
        return moment(time).format('YYYY/M/D')
    }
}