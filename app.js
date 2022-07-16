const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

// middleware
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));

app.get('/', (req, res) => {
  res.send('Hello from my app');
});

app.listen(PORT, () => {
  debug(`listening to port ${chalk.green(PORT)}`);
});
