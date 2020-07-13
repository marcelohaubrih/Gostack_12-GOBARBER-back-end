import cors from 'cors';
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './Routes';
import uploadConfig from './Config/upload';
import AppError from './errors/AppError';
import './Database';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction)=> {
  if(err instanceof AppError){
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
});

app.listen(3333, () => {
    console.warn('✔ - Server started on port 3333');
});