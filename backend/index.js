const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const morganMiddleware = require('./middlewares/logger');
const userRoutes = require('./modules/users/routes');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(morganMiddleware);
app.use('/users', userRoutes);

app.get('/health', (_, res) => res.send({ message: 'ok' }));

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
