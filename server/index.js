import express from 'express';
import dbConfig from './config/db';
import middlewareConfig from './config/middleware';
import { urlRoutes } from './modules';

const app = express();

const PORT = process.env.PORT || 3000;

/**
 * DATABASE
 */

dbConfig();

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
