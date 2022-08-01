const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const Helper = require('./helper');
const rememberLogin = require('./http/middleware/rememberLogin');
const methodOverride = require('method-override');
const gate = require('./gate');
const i18n = require('i18n');

module.exports = class Application {
    constructor() {
        this.setupExpress();
        this.setMongoConnection();
        this.setConfig();
        this.setRouters();
    }

    setupExpress() {
        const server = http.createServer(app);
        server.listen(3000, () => console.log('Listening on port 3000'));
    }

    setMongoConnection() {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/xaitien', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    }

    setConfig() {
        require('./passport/passport-local');
        require('./passport/google-passport');
        app.use(express.static(path.join(__dirname, 'public')));
        app.set('view engine', 'ejs');
        app.set('views', __dirname + '/resource/views');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(expressLayouts)
        app.set('layout', 'master');
        app.set('layout extractScripts', true);
        app.set('layout extractStyle', true);
        app.use(methodOverride('_method'))
        app.use(validator());
        app.use(session({
            secret: 'mysecretkey',
            resave: true,
            saveUninitialized: true,
            cookie: { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), signed: true },
            store: MongoStore.create({
                mongoUrl: 'mongodb://localhost/xaitien',
            })
        }));
        app.use(cookieParser('qwerttyuiopasdfghjklzxcbnmQWERASDFZXCVTYUIGHJKBNM<OP123456798'));
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(rememberLogin.handel)
        app.use((req, res, next) => {
            app.locals = new Helper(req, res).getObjects()
            next()
        })
        app.use(gate.middleware());



        i18n.configure({
            locales: ['en', 'fa'],
            directory: path.join(__dirname, '/resource/lang'),
            defaultLocale: 'fa',
            cookie: 'lang',
            objectNotation: true,
        });
        app.use(i18n.init)

    }
    setRouters() {
        app.use(require('app/routes/api'));
        app.use(require('app/routes/web'));
    }
}