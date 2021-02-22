import '@babel/polyfill';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import pino from 'pino';
import expressPino from 'express-pino-logger';
import db from './database/models/index';
import routes from './routes';
import randomId from './random-id';

config();

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });

const app = express();

app.use(expressLogger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

routes(app);

app.use('/*', (_req, res) => {
  logger.debug('calling res.json');
  const id = randomId.getRandomId();
  res.status(404).json({ message: `Route Not Found[${id}]` });
});

const port = process.env.PORT || 4000;
const { sequelize, dbUrl } = db;
sequelize.authenticate()
  .then(() => {
    logger.info('Database connected...', dbUrl);
    app.listen(port, logger.info(`Listening on port ${port}...`));
  })
  .catch((err) => logger.debug(`Error: ${err}`));

export default app;
