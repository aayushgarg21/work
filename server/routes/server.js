const express = require("express");
const routes = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb');
const assert = require('assert');

const dbName = 'aayush';
const error = new Error("Version not found")

const url = 'mongodb://mongo:27017';


routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());
routes.get("/:appName/:version",(req,res) =>
{
    const appName = req.params.appName;
    const version = req.params.version;
    let result = [];
    MongoClient.connect(url, (err, client) => {
      assert.equal(null, err);
        result = {
         
        };
      const db = client.db(dbName);
  
      function findDocuments(db, callback) {
        const collection = db.collection('application_activities');
        collection.find( { $and: [  { activityName: appName  } , { version : version }  ] }).toArray((err, docs) => {
          assert.equal(err, null);
          if (docs.length < 1) {
            res.status(404).json({"message" :  "Version not found"});
          } else if (docs[0].application === '') {
            res.status(404).json({"message" :  "Version not found"});
          } else {
            if (docs[0].application.publish !== null) {
              result.publish = docs[0].application.publish;
            }
            result.subscription = {};
            
            if (docs[0].application.document_description.subscription !== "") {

            var subscribe = docs[0].application.document_description.subscription;
            subscribe.forEach ((subscribe)=>
            {
                result.subscription =  Object.assign(result.subscription,subscribe);
            }
            );
          }
          result.specs = docs[0].application.document_description.activities_description;

            
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