import { config } from 'dotenv';
import * as JWT from 'jsonwebtoken';
import { errorResponse } from '../utils/response';
import * as Services from '../services';
import db from '../models';

const { Users } = db;

config();

const secret = process.env.SECRET;

export const verifyToken = (req, res, next) => {
  try {
    const tokenBearer = req.headers.authorization;

    if (!tokenBearer) return res.status(403).jsend.fail(errorResponse('Forbiden', 403, 'headers:{Authorization}', 'Authorize user', 'Client key is required. Access Denied!', { error: true, operationStatus: 'Processs Terminated!' }));

    const token = tokenBearer.split(' ')[1];

    JWT.verify(token, secret, async (err, decoded) => {
      if (err) {
        const result = errorResponse('Rejection', 403, 'headers:{Authorization}', 'Authorize user', 'Client key is invalid. Access Denied!', { error: true, operationStatus: 'Processs Terminated!' });
        return res.status(403).jsend.fail(result);
      }
      const user = await Services.retreiveOneData(Users, { id: decoded.id });

      if (!user) {
        const result = errorResponse('Rejection', 403, 'headers:{Authorization}', 'Authorize user', 'User not found', { error: true, operationStatus: 'Processs Terminated!' });
        return res.status(403).jsend.fail(result);
      }
      req.user = user;
      next();
    });
  } catch (error) {
    const result = errorResponse(`${error.syscall || error.name || 'ServerError'}`, 500, `${error.path || 'No Field'}`, 'Authorization', `${error.message}`, { error: true, operationStatus: 'Processs Terminated!', errorSpec: error });
    return res.status(500).jsend.fail(result);
  }
};
