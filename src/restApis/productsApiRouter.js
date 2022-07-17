var express = require('express');
var router = express.Router();
const debug = require('debug')('app:productsApiRouter');
const {MongoClient, ObjectId} = require('mongodb');

const url =
  'mongodb+srv://heshamUser:172839@productsengine.atexpeh.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'productsEngine';
router.get('/:id', function (req, res, next) {
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
      res.json(product);
    } catch (error) {
      debug(error.stack);
    }
  })();
});

module.exports = router;
