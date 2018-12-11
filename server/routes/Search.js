const express = require('express');

const routes = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb');
const assert = require('assert'); 
const time = require("time-stamp");
const Date = require("date-diff");


const dbName = 'aayush';
const url = 'mongodb://mongo:27017';
const cors = require('cors');

routes.use(cors());
routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());


routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());


routes.get('/', (req, res) => {
  const list = [];
  const search = req.query.value;
  const pageNo = req.query.page;
  const size = 5;


  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    function findDocuments(db, callback) {
      const collection = db.collection('application_activities');
      if(pageNo < 0 || pageNo == 0 )
      {
         res.json({"message" : "Invaid Page no"})
      }
      else {
      
      collection.find({$and: [{ flag: 'latest',  } , {activityName : {$regex : search}}]}).skip( pageNo > 0 ? ( ( pageNo - 1 ) * size ) : 0).limit(size).toArray((err, docs) => {
        assert.equal(err, null);
        if (docs.length < 1) {
          
          list.push({'name' : 'No Registrations'  });
          res.send(list);
        } else {
          docs.forEach((element) => {
          list.push({"name" : element.activityName , "version" : element.version , "description" : element.description , "userName" : element.userName , "time" : element.date});
          });

          res.send(list);
        }
      });
    }
    
  }

    findDocuments(db, () => {
      client.close();
    });
  });
});


module.exports = routes;
