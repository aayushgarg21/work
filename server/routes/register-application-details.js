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
routes.post('/', (req) => {
  const application = req.body.name;
  const userName = req.body.userName;
  const payload = {
    Application: '',
    userName: '',
  };

  payload.Application = application;
  payload.userName = userName;

  const privatekey = require('fs').readFileSync('./private.key', 'utf8');

  const signOptions = {
    issuer: 'stackroute',
    subject: 'mail@stackroute.in',
    algorithm: 'RS256',
  };


  const token = jwt.sign(payload, privatekey, signOptions);
  const final = { application, token, userName };
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);

    const db = client.db(dbName);
    function insertDocuments(db, callback) {
      const collection = db.collection('application_activities');
      collection.insertMany(
        [final], (err, result) => {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          assert.equal(1, result.ops.length);
          callback(result);
        },
      );
    }
    insertDocuments(db, () => {
      client.close();
    });
  });
});


routes.get('/:user', (req, res) => {
  const orgName = req.params.user;
  const list = [];
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    function findDocuments(db, callback) {
      const collection = db.collection('application_activities');
      collection.find({ $and: [  { userName: orgName  } , { flag : "latest" }  ] }).toArray((err, docs) => {
        assert.equal(err, null);
        if (docs.length < 1) {
          
          list.push({"activityName" : "No Registrations"});
          res.send(list);
        } else {
          docs.forEach((element) => {
          
            list.push({"activityName" : element.activityName , "version" : element.version});
          });

          res.send(list);
        }
      });
    }

    findDocuments(db, () => {
      client.close();
    });
  });
});


module.exports = routes;
