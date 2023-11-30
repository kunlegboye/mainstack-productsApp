
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import app from '../..';

const errorHandler: ErrorRequestHandler = function (err: any, req: Request, res: Response, next: NextFunction): void {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(404).send({
    message: `Route '${req.path}', NOT found...`,
    status: 'error'
  });

  res.status(err.status || 500);
};

app.use(errorHandler);

export default app;