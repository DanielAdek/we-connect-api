import express from 'express';
import bodyParser from 'body-parser';
import moment from 'moment';
import dotenv from 'dotenv';
import cors from 'cors';
import jsend from 'jsend';
import { errorResponse, successResponse } from './utils/response';
import { ApplicationRoutes } from './routes';

dotenv.config();

const appRoute = new ApplicationRoutes();

/**
 * @class Server
 */
export class Server {
  /**
   * @constructor Server
   */
  constructor() {
    this.app = express();
    this.urlencoded = bodyParser.urlencoded({ extended: false });
    this.json = bodyParser.json();
    this.app_start = moment().unix();
    this.config();
    this.initialize();
    this.baseEndPoint();
    this.baseRoute();
    this.handleUnknownRoute();
  }

  /**
   * @memberof Server
   * @returns {void} nothing to return
   */
  config() {
    // USE CORS TO AVOID CROSS ORIGIN CONFLICT
    this.app.use(cors());

    // USE BODY PARSER
    this.app.use(this.json);
    this.app.use(this.urlencoded);

    // USE JSEND MIDDLEWARE
    this.app.use(jsend.middleware);

    this.app.set('port', parseInt(process.env.PORT, 10));
  }

  /**
   * @memberof Server
   * @returns {void} nothing to return
   */
  baseRoute() {
    this.app.use('/api/v1', appRoute.router);
  }

  /**
   * @memberof Server
   * @returns {void} nothing to return
   */
  initialize() {
    console.log(process.env.LINE);
    const message = '  App is running at http://localhost:%d in %s mode';

    this.app.listen(this.app.get('port'), () => {
      console.info(message, this.app.get('port'), this.app.get('env'));

      console.info('  ** Press CTRL + C to stop **');
    });
  }

  /**
   * @memberof Server
   * @returns {*} json
   */
  baseEndPoint() {
    const details = { operationStatus: 'Operation Successful!', unix_epoch: this.app_start };
    this.app.get('/', (_, res) => {
      const result = successResponse('Success!', 200, 'We-connect is up and running', details);
      return res.status(200).jsend.success(result);
    });
  }

  /**
   * @memberof Server
   * @returns {*} json
   */
  handleUnknownRoute() {
    this.app.use('/*', (req, res) => {
      const result = errorResponse('Route', 404, `${req.originalUrl}`, `${req.method}`, 'Route not found', { operationStatus: 'Operation Terminated' });
      return res.status(404).jsend.fail(result);
    });
  }
}
