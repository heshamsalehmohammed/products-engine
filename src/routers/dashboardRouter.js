const express = require('express');
const debug = require('debug')('app:dashboardRouter');
const {MongoClient} = require('mongodb');

const url =
  'mongodb+srv://heshamUser:172839@productsengine.atexpeh.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'productsEngine';

const dashboardRouter = express.Router();

dashboardRouter.use((req, res, next) => {
  if (req.user?.isAdmin ?? false) {
    next();
  } else {
    res.redirect('/');
  }
});


dashboardRouter.route('/').get((req, res) => {
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to Mongo DB');
      const db = client.db(dbName);
      const products = await db.collection('products').find().toArray();

      res.render('dashboard', {
        data: products,
        user: req.user,
      });
      client.close();
    } catch (error) {
      debug(error.stack);
    }
    client?.close();
  })();
});

module.exports = dashboardRouter;
