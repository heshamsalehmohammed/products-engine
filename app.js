var createError = require('http-errors');
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const PORT = process.env.PORT || 3000;
const app = express();
const productsRouter = require('./src/routers/productsRouter');
const productsApiRouter = require('./src/routers/productsApiRouter');
const authRouter = require('./src/routers/authRouter');
const dashboardRouter = require('./src/routers/dashboardRouter');

// middleware
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'productsengine'}));

require('./src/config/passport.js')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/products', productsRouter);
app.use('/productsApi', productsApiRouter);
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);

app.get('/', (req, res) => {
  res.render('index', {
    user: req.user,
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

app.listen(PORT, () => {
  debug(`listening to port ${chalk.green(PORT)}`);
});
