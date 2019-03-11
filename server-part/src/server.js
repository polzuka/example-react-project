'use strict';

const packageInfo = require('../package.json');
const log = require('bunyan').createLogger({name: packageInfo.name});


// const url = require('url');
// const lodash = require('lodash');
// const path = require('path');
const express = require('express');
require('express-async-errors');
// const session = require('express-session');
// const pgSession = require('connect-pg-simple')(session);
const cookieParser = require('cookie-parser');
const config = require('./config');
// const db = require('../db');
// const routes = load(':site/routes');
// const middlewares = load(':site/middlewares');

const logError = (err) => log.error(err);
process.on('uncaughtException', logError);
process.on('unhandledRejection', logError);

const main = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(cookieParser());

  // app.use(session({
  //   store: new pgSession({
  //     pgPromise: db,
  //     tableName: 'sessions',
  //   }),
  //   secret: config.get('web.express.sessionSecret'),
  //   name: config.get('web.express.sessionCookieName'),
  //   maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
  //   resave: false,
  //   saveUninitialized: false,
  // }));

  // app.set('view engine', 'pug');
  // app.set('views', path.resolve(__dirname, '../site/views'));

  // app.use(
  //   '/public/v/:hash',
  //   (new express.Router()).get('*', (req, res) => {
  //     return res.redirect(303, `/public${req.url}`);
  //   })
  // );


  // app.use(middlewares.passport);


  // app.use(`/${endpoint === 'home' ? '' : endpoint}`, router);

  // app.use(middlewares.errors);

  const server = app.listen(
    config.port,
    config.host,
    () => log.info(server.address(), 'Web app server listening.')
  );
};

if (require.main === module)
  main();
