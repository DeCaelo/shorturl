import express from 'express';
import path from 'path';
import dbConfig from './config/db';
import middlewareConfig from './config/middleware';
import { urlRoutes } from './modules';

const app = express();

const PORT = process.env.PORT || 3000;

let mongoConf;

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config');

  app.use(webpackMiddleware(webpack(webpackConfig)));
  mongoConf = 'mongodb://localhost/shorturl';
} else {
  app.use(express.static('dist'));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
  mongoConf = process.env.MONGO_URL;
}

/**
 * DATABASE
 */

dbConfig(mongoConf);

/**
 * MIDDLEWARE
 */

middlewareConfig(app);

app.get('/', (req, res) => {
    res.send('Hello');
});

app.use('/api', [urlRoutes]);

app.listen(PORT, err => {
    if (err) { return console.error(err) }

    console.log(`App listen to port ${PORT}`);
});
