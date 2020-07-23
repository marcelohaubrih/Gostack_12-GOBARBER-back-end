/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from 'cors';
import 'dotenv/config';
import { errors } from 'celebrate';
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import routes from '@shared/infra/http/Routes';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      mensage: 'Internal server error',
    });
  },
);

let apiServerURL = process.env.APP_API_URL || 'http://localhost';
const apiServerPort = process.env.APP_API_PORT || 3333;
apiServerURL = `${apiServerURL}:${apiServerPort}`;

app.listen(apiServerPort, () => {
  console.warn(`✔ - Server started ${apiServerURL}`);
});
