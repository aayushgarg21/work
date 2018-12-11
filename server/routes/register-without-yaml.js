const express = require('express');

const routes = express.Router();
const yaml = require('yamljs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const time = require('time-stamp');

const flag = 'latest';


const MongoClient = require('mongodb');
const assert = require('assert');

const dbName = 'aayush';
const url = 'mongodb://mongo:27017';


routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());
routes.post('/', (req, res) => {
  const userName = req.body.userName;
  const activityName = req.body.name;
  const application = '';
  const subscription = '';
  const date = time();

  const payload = {
    Application: '',
    Subscriptions: {},
  };

  payload.Application = activityName;


  const privatekey = require('fs').readFileSync('./private.key', 'utf8');

  const signOptions = {
    issuer: 'stackroute',
    subject: 'mail@stackroute.in',
    algorithm: 'RS256',
  };


  const token = jwt.sign(payload, privatekey, signOptions);
  const final = {
    application, flag, token, userName, activityName, subscription,date,
  };
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);

    const db = client.db(dbName);


    function insertDocuments(db) {
      const collection = db.collection('application_activities');
      collection.insertMany(
        [final], (err, result) => {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          assert.equal(1, result.ops.length);
        },
      );
    }

    function findDocuments(db, callback) {
      const collection = db.collection('application_activities');
      collection.find({ activityName }).toArray((err, docs) => {
        assert.equal(err, null);
        if (docs.length < 1) {
          insertDocuments(db, () => {
            client.close();
          });
        } else {
          res.status(401).json({ message: 'Application Already Registred' });
        }
      });
    }
    findDocuments(db, () => {
      client.close();
    });
  });
});
module.exports = routes;
