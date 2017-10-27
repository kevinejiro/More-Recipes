// import the required modules
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './routes/index';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set router for path
app.use('/api/v1/', router);

// catches error404 handler
app.use((req, res) => {
  res.status(404).send({ success: false, message: 'Not Found!' });
});

export default app;
