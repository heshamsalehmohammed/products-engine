const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();
const productsRouter = require('./src/routers/productsRouter');

// middleware
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));

app.set('views', './src/views');
app.set('view engine', 'ejs');



app.use('/products', productsRouter);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'ETSHO',
    data: ['a', 'b', 'c'],
  });
});

app.listen(PORT, () => {
  debug(`listening to port ${chalk.green(PORT)}`);
});
