import { Router } from 'express';
import * as UrlController from './controller';

const routes = new Router();

routes.post('/shorten', UrlController.createShort);

export default routes;
