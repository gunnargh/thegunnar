const express = require('express');
const Config = require('./config/environment/index');
const http = require('http');
const Q = require('q');
const BlogRouter = require('./src/api/blog/blog.router');
const bodyParser = require('body-parser');
const compression = require('compression');
const errorHandler = require('errorhandler');
const methodOverride = require('method-override');

class App {

  constructor() {
    this.app = express();
    this.initExpress();
    this.initRoutes();
    this.initErrorHandler();
  }

  run() {
    const defer = Q.defer();

    const server = http.createServer(this.app);
    server.listen(Config.port, () => {
      defer.resolve();
    });
    
    return defer.promise;
  }

  

  initExpress() {
    this.app.use(compression());
    this.app.use(bodyParser.json({
      limit: '5mb'
    }));
    this.app.use(bodyParser.urlencoded({
      limit: '5mb',
      extended: true
    }));
    this.app.use(methodOverride());

  }

  initErrorHandler() {
    this.app.use(errorHandler({
      log: App.errorNotification
    }));
  }

  initRoutes() {
    this.app
      .use('/blog', BlogRouter)
      .use('/', express.Router().get('/', (req, res) => {
        return res.send('nodejs-Interview-challenge');
      }));
  }

  

  static errorNotification(error,
    message,
    req) {
    console.error(`Error in ${req.method} ${req.url}`, {
      error,
      message
    }, req);
  }

  static requestLogger(req,
    res,
    next) {
    // console.log('Request', {}, req);
    next();
  }
}

module.exports = App;