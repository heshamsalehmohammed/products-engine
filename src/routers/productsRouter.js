const express = require('express');
const debug = require('debug')('app:productsRouter');
const {MongoClient, ObjectId} = require('mongodb');

const url =
  'mongodb+srv://heshamUser:172839@productsengine.atexpeh.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'productsEngine';

const productsRouter = express.Router();

productsRouter.route('/').get((req, res) => {
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to Mongo DB');
      const db = client.db(dbName);
      const products = await db.collection('products').find().toArray();

      res.render('products', {
        data: products,
      });
      client.close();
    } catch (error) {
      debug(error.stack);
    }
  })();
});

productsRouter.route('/:id').get((req, res) => {
  const id = req.params.id;

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to Mongo DB');
      const db = client.db(dbName);
      const product = await db
        .collection('products')
        .findOne({_id: new ObjectId(id)});
      res.render('product', {
        data: product,
      });
    } catch (error) {
      debug(error.stack);
    }
  })();
});

module.exports = productsRouter;
