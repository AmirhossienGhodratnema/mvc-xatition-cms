const User = require('app/models/user');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

// When Change Page , Stay login
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


// Google login strategy
passport.use(new GoogleStrategy({
    clientID: '725915130890-mv84dla4dn85grib1fhq6o8f1td637jf.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://amirhosseinghodratnema.ir/auth/google/callback',
    passReqToCallback: true,
}, async (req, token, tokenSecret, profile, done) => {
    let user = await User.findOne({ 'email': profile.emails[0].value });

    // Does not log in to the account and gives an error 
    // if (user) return done(null, false , req.flash('errors', 'ایمیل وارد شده وجود دارد !'));

    // Login user.   
    if (user) {
        req.logIn(user, (err) => {
            if (err) return next(err)
            done(null, req.user);

        });
        return
    }
    const newUser = await new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: profile.id
    });
    await newUser.save(err => {
        if (err) throw err;
        done(null, newUser);
    });
}));
