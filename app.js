const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const PORT = process.env.PORT || 3000;
const app = express();
const productsRouter = require('./src/routers/productsRouter');
const authRouter = require('./src/routers/authRouter');

// middleware
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({ secret: 'productsengine' }));

require('./src/config/passport.js')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/products', productsRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'ETSHO',
    data: ['a', 'b', 'c'],
  });
});

app.listen(PORT, () => {
  debug(`listening to port ${chalk.green(PORT)}`);
});
