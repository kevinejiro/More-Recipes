// import the required modules
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';

import router from './routes/index';
import swaggerDocument from './converted.json';


dotenv.config();

// Set up the express app
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set router for path
app.use('/api/v1/', router);


if (process.env.NODE_ENV === 'production') {
  const DIST_DIR = path.join(__dirname, '../client/dist');
  app.use(express.static(DIST_DIR));
  app.get('*.js', (request, response, next) => {
    request.url += '.gz';
    response.set('Content-Encoding', 'gzip');
    response.set('Content-Type', 'text/javascript');
    next();
  });

  app.get('*.css', (request, response, next) => {
    request.url += '.gz';
    response.set('Content-Encoding', 'gzip');
    response.set('Content-Type', 'text/css');
    next();
  });
  app.get('/*', (request, response) => response.sendFile(path.join(DIST_DIR, 'index.html')));
}
// catches error404 handler
app.use((request, response) => {
  response.status(404).send({ status: 'fail', message: 'Not Found!' });
});
export default app;
