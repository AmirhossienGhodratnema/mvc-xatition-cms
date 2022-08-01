let ConnectRoles = require('connect-roles');
const Premission = require('./models/premission')

let gate = new ConnectRoles({
    failureHandler: function (req, res, action) {
        // optional function to customise code that runs when
        // user fails authorisation
        var accept = req.headers.accept || '';
        res.status(403);
        if (accept.indexOf('html')) {
            res.render('errors/403', { action: action, title: 'اجازه دسترسی ندارید' });
        } else {
            res.send('Access Denied - You don\'t have permission to: ' + action);
        }
    }
});


const permissions = async () => {
    return await Premission.find({}).populate('roles').exec();

}




permissions()
    .then(permissions => {
        permissions.forEach(permission => {
            let roles = permission.roles.map(item => item.id);
            gate.use(permission.name, (req) => {
                let auth = req.isAuthenticated()
                return auth ? req.user.hasRoles(roles) : false;
            })

        })
    })


module.exports = gate;