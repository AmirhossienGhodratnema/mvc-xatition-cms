const autoBind = require('auto-bind');

module.exports = class Validations {
    // Main class validation for extends
    constructor() {
        autoBind(this);
    }
}