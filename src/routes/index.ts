import { Router } from 'express';
import task from './task';

const routes = Router();

routes.use('/', task);

export default routes;
