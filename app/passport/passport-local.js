const passport = require('passport');
const User = require('../models/user');
const localStrategy = require('passport-local');


passport.serializeUser(function (user, done) {
    done(null, user.id)
})


passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    })
})


// Strategy Register
passport.use('local.register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    let user = await User.findOne({ 'email': email });
    if (user) return done(null, false, req.flash('errors', 'اطلاعات وارد شده وجود دارد'));
    // Create new user
    const newUser = await new User({
        name: req.body.name,
        lastName: req.body.lastName,
        ...req.body
    })
    await newUser.save(err => {
        if (err) return done(err, false, req.flash('errors', 'عملیات ناموفق بود دوباره امتحان کنید'))
        done(null, newUser);
    });
}));


// Strategy Login
passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    let user = await User.findOne({ 'email': email });
    if (!user) return await done(null, false, req.flash('errors', 'نام کاربری یا ایمیل مطابقط ندارد'))
    if (!user) {
        return done(null, false, req.flash('errors', 'اطلاعات وارد شده مطابقت ندارد'));
    };
    if (!await user.comparePassword(password)) {
        return done(null, false, req.flash('errors', 'اطلاعات وارد شده مطابقت ندارد'));

    }
    return done(null, user);
}));
