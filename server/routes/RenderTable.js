const express = require('express');

const routes = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb');
const assert = require('assert');

const dbName = 'aayush';

const url = 'mongodb://mongo:27017';


routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());
routes.get('/:applicationName/:version', (req, res) => {
  const  applicationName  = req.params.applicationName;
  const version = req.params.version;
  let result = [];
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);

    const db = client.db(dbName);

    function findDocuments(db, callback) {
      const collection = db.collection('application_activities');
      collection.find({ $and: [  { activityName: applicationName } , { version : version }  ] }).toArray((err, docs) => {
        assert.equal(err, null);
        if (docs.length < 1) {
          res.send(result);
        } else if (docs[0].application === '') {
          res.send(result);
        } else {
          result = docs[0].application.document_description.activities_description;
          res.send(result);
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
