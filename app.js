const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();
const productRouter = express.Router();
// middleware
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

productRouter.route('/').get((req, res) => {
  res.render('products', {
    data: [
      {
        Id: 1,
        Name: 'p1',
        Description: 'p1',
        Image: 'p1.jpeg',
      },
      {
        Id: 2,
        Name: 'p2',
        Description: 'p2',
        Image: 'p2.jpeg',
      },
      {
        Id: 3,
        Name: 'p3',
        Description: 'p3',
        Image: 'p3.jpeg',
      },
    ],
  });
});

productRouter.route('/1').get((req, res) => {
  res.render('product', {
    data: {
      Id: 1,
      Name: 'p1',
      Description: 'p1',
      Image: 'p1.jpeg',
    },
  });
});

app.use('/products', productRouter);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'ETSHO',
    data: ['a', 'b', 'c'],
  });
});

app.listen(PORT, () => {
  debug(`listening to port ${chalk.green(PORT)}`);
});
