const express = require('express');

const routes = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb');
const assert = require('assert');

const dbName = 'aayush';
const url = 'mongodb://mongo:27017';
const cors = require('cors');

routes.use(cors());

routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());

routes.get('/:appName', (req, res) => {
  const { appName } = req.params;
  let list = [];
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    function findDocuments(db, callback) {
      const collection = db.collection('application_activities');
      collection.find({ activityName: appName, flag: 'latest' }).toArray((err, docs) => {
        assert.equal(err, null);
        if (docs.length < 1) {
          list.push('No Subscription');
          res.send(list);
        } else {
          docs.forEach((element) => {
            if (element.application === '') {
              list.push({ 'No Applicatons': ['No Activities'] });
            } else {
              list = element.application.document_description.subscription;
            }
          });
          res.send(list);
        }
        callback(docs);
      });
    }

    findDocuments(db, () => {
      client.close();
    });
  });
});


module.exports = routes;
