require('dotenv').config({ path: '.env' });

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes';

const logger = console;
const app = express();

app.use(cors());
app.use(morgan('combined'));

const port = process.env.PORT || process.env.API_PORT || 3001;

app.use('/', routes);
app.use('/test', (req, res) => {
  console.log('test')
  res.json({
    data: 'test'
  })
});

app.listen(port, () => {
  logger.log('Running on port', port);
});

export default app;
