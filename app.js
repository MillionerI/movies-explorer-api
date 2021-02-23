require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = require('./utils/corsOptions');
const limiter = require('./middlewares/rateLimit');
const router = require('./routes/index');
const celebrateErrorHandler = require('./middlewares/celebrateErrorHandler');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use(requestLogger);

app.use(limiter);

app.use('', cors(corsOptions), router);

app.use(errorLogger);

app.use(celebrateErrorHandler);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Sucsess! PORT: ${PORT}`);
});
