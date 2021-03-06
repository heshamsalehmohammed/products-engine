const express = require('express');
const debug = require('debug')('app:authRouter');
const {MongoClient, ObjectId} = require('mongodb');
const passport = require('passport');
const localStrategy = require('../config/strategies/local.strategy');

const authRouter = express.Router();

const url =
  'mongodb+srv://heshamUser:172839@productsengine.atexpeh.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'productsEngine';

authRouter.route('/signup').post((req, res) => {
  const {email, password, name} = req.body;

  (async function addUser() {
    let client;
    try {
      client = await MongoClient.connect(url);

      const db = client.db(dbName);
      const user = {email, password, name, isAdmin: false};
      const results = await db.collection('users').insertOne(user);
      debug(results);

      req.login(user, () => {
        res.redirect('/');
      });
    } catch (error) {
      debug(error);
    }
    client.close();
  })();
});

authRouter.route('/login').post(
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  })
);

authRouter.route('/profile').get((req, res) => {
  res.json(req.user);
});

authRouter.get('/logout', function (req, res, next) {
  req.session.destroy(() => {
    req.logOut(() => {
      res.redirect('/');
    });
  });
});

module.exports = authRouter;
