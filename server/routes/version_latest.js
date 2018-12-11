const express = require('express');

const routes = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb');
const assert = require('assert');
const jwt = require('jsonwebtoken');


const dbName = 'aayush';
const url = 'mongodb://mongo:27017';
const cors = require('cors');

routes.use(cors());
routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());


routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());
routes.get('/:appName', (req, res) => {
    const appName = req.params.appName;
    
    var version = "";
    MongoClient.connect(url, (err, client) => {
      assert.equal(null, err);
      const db = client.db(dbName);
      function findDocuments(db, callback) {
        const collection = db.collection('application_activities');
        collection.find({ $and: [  { activityName: appName  } , { flag : "latest" }  ] }).toArray((err, docs) => {
          assert.equal(err, null);
          if (docs.length < 1) {
            res.json({"mesaage" : "No Further version"});
           
          } else {
            version = docs[0].version;
            res.json({"version" : version});
          }
        });
      }
  
      findDocuments(db, () => {
        client.close();
      });
    });
  });
  
  
  module.exports = routes;
  