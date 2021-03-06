const express = require ("express");
const routes = express.Router();
const morgan = require('morgan');

const MongoClient = require('mongodb');
const dbName = 'aayush';
const url = 'mongodb://mongo:27017';

routes.get("/:appName/:version",(req,res)=>
{
const appName = req.params.appName;
const version = req.params.version; 
const arr = {};
  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    function findDocuments(db, callback) {
      const collection = db.collection('application_activities');
      collection.find( { $and: [  { activityName: appName  } , { version : version }  ] }).toArray((err, docs) => {
        if (docs.length < 1) {
          res.json({ message: 'failed' });
        } else {
        arr.token = docs[0].token;
        res.send( arr );
        }
      });
    }
   

    findDocuments(db, () => {
      client.close();
    });
  });
});
module.exports = routes;