const express = require('express');

const routes = express.Router();
const yaml = require('yamljs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const fetch = require("node-fetch");

const MongoClient = require('mongodb');
const assert = require('assert');
const timestamp = require('time-stamp');


const dbName = 'aayush';
const url = 'mongodb://mongo:27017';


routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());
routes.post('/', (req, res) => {
  const application = yaml.parse(req.body.yaml);
  let subscribe = application.document_description.subscription;
  let list = [];
  if(subscribe !== null)
  {
  subscribe.forEach((element) => {
    var obj = {};
    var keys = Object.keys(element);
    var oldKey = keys[0]
    var newKey = oldKey.split(".").join("#");
    var value = element[oldKey];
    obj[newKey] = value;
    list.push(obj);
  });
}
  application.document_description.subscription = list;
  const userName = application.userName;
  const activityName = application.activityname;
  const version = application.version;
  var date = timestamp();
  const flag = 'latest';
  const version_count = 1;
  const push = "not pushed"
  const description = application.description;

  const payload = {
    Application: '',
    Subscriptions: {},
    publish: [],
  };
  console.log(activityName);

  payload.Application = activityName;
  if (application.publish !== null) {
    payload.publish = application.publish;
  }


  if (application.document_description.subscription !== "") {

    var subscribes = application.document_description.subscription;
    subscribes.forEach((subscribed) => {
      payload.Subscriptions = Object.assign(payload.Subscriptions, subscribed);
    }
    );
  }

  const privatekey = fs.readFileSync('./private.key', 'utf8');

  const signOptions = {
    issuer: 'stackroute',
    subject: 'mail@stackroute.in',
    algorithm: 'RS256',
  };


  const token = jwt.sign(payload, privatekey, signOptions);
  const final = {
    version, flag, application, token, userName, activityName, date, version_count, description, push
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

    function findDocuments(db) {
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
