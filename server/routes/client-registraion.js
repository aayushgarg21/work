const express = require('express');

const routes = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var fs = require("fs");


const MongoClient = require('mongodb');
const assert = require('assert');
const timestamp = require('time-stamp');

const dbName = 'aayush';
const url = 'mongodb://mongo:27017';


routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());
routes.post('/', (req, res) => {
  const application = req.body.yaml;
  var check = true;
  var check = true;
            
  if(application.version  == null || application.description == null || application.activityname == null ||  application.userName == null )
  {
   check = false;
   
  }
 else if(application.document_description.subscription == null && application.publish == null) {
     check = false;
        
 }
 else if (application.document_description == null || application.document_description. activities_description == null  )
 {
    check = false;
   
 }
 if (application.document_description.activities_description !== null)
 {
  application.document_description.activities_description.map((element) =>
     {
         if(element.activity_code == null || element.description == null  || element.name == null || element.example == null || element.activity_schema == null)
         check = false 
      })
}
     
    if (!check)
    {
      res.json({"message" : "Please Send Valid Json"})
    }
    else {

  const token2 = req.body.token;
  var verify = true;
  var verify2 = false;
jwt.verify(token2, require('fs').readFileSync('./public.key', 'utf8'), {
           issuer: "stackroute",
           subject: "mail@stackroute.in",
           algorithm: "RS256"
       }, (err, decoded) => {
           if (err) {
              
            console.log(err);
            res.json({"message" : "token not valid"})
            verify = false;
           }
           if(verify)
           {
             
            
            const activityName = application.activityname;
            if (decoded.Application === activityName)
            {
              verify2 = true;
            }
            else 
            {
              res.json({"message" : " not Permitted"});
            }
            if (verify2)
            {
            const userName = application.userName;
            let subscribe =  application.document_description.subscription;
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
            const version = application.version;
            const description = application.description;
            const date = timestamp();
            const push = "not pushed"
            console.log(version);
            const flag = 'latest';
          
            const payload = {
              Application: '',
              Subscriptions: {},
              publish: [],
            };
            
          
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
            const privatekey = require('fs').readFileSync('./private.key', 'utf8');
          
            const signOptions = {
              issuer: 'stackroute',
              subject: 'mail@stackroute.in',
              algorithm: 'RS256',
            };
          
          
            const token = jwt.sign(payload, privatekey, signOptions);
            const final = {
              version, flag, application, token, userName, activityName, date,description,push
            };
            MongoClient.connect(url, (err, client) => {
              assert.equal(null, err);
          
              const db = client.db(dbName);
              function updateDocument(db, callback) {
                const collection = db.collection('application_activities');
                collection.updateOne({ activityName, flag: 'latest' },
                  { $set: { flag: 'not_latest' } }, (err, result) => {
                    assert.equal(err, null);
                    callback(result);
                  });
              }
              function insertDocuments(db) {
                const collection = db.collection('application_activities');
                collection.insertMany(
                  [final], (err, result) => {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    assert.equal(1, result.ops.length);
                    res.send({ "message": 'done' });
                  },
                );
              }
          
              function findDocuments(db) {
                const collection = db.collection('application_activities');
                collection.find({ $and: [{ activityName: activityName }, { version: version }] }).toArray((err, docs) => {
                  if (docs.length < 1) {
                    updateDocument(db, () => {
                      client.close();
                    });
          
                    insertDocuments(db, () => {
                      client.close();
                    });
                  } else {
                    res.status(401).json({ message: ' version already exsist' });
          
          
                  }
                });
              }
              function findDocuments2(db) {
                const collection = db.collection('application_activities');
                collection.find({ activityName: activityName }).toArray((err, docs) => {
                  assert.equal(err, null);
                  if (docs.length < 1) {
          
                    res.status(401).json({ message: '  Application Not Registered ' });
          
                  }
                  else {
                    findDocuments(db, () => {
                      client.close();
                    });
          
                  }
                });
              }
          
              findDocuments2(db, () => {
                client.close();
              });
          
            });
           
           }
          }
          });


        }
});
module.exports = routes;