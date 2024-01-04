import express from 'express';
import morgan from 'morgan';
import { envs } from './config/environments/environments.js';
import { enableCors } from './config/plugins/cors.plugin.js';
import { router } from './routes/index.js';
import { AppError } from './common/errors/appError.js';
import { globalErrorHandler } from './common/errors/error.controller.js';

const ACCEPTED_ORIGINS = ['http://localhost:3000'];

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

enableCors(app, ACCEPTED_ORIGINS);

if (envs.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v2/', router);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
