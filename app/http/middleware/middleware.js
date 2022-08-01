const autoBind = require("auto-bind")


module.exports = class Middleware {
    // Main middleware
    constructor() {
        autoBind(this);
    }
}