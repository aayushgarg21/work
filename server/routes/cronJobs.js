var cron = require('cron');
var fetch = require("node-fetch");
const MongoClient = require('mongodb');
const assert = require('assert');
const dbName = 'aayush';
const url = 'mongodb://mongo:27017';
var cronJob = cron.job("0 */1 * * * *", function () {
    var list = [];
    MongoClient.connect(url, (err, client) => {
        assert.equal(null, err);
        const db = client.db(dbName);
        function updateDocument(db, callback) {
            const collection = db.collection('application_activities');
            collection.updateOne({ push: "not pushed" },
                { $set: { push: "pushed" } }, (err, result) => {
                    assert.equal(err, null);
                    callback(result);
                });
        }
        function findDocuments(db) {
            const collection = db.collection('application_activities');
            collection.find({ push: "not pushed" }).toArray((err, docs) => {
                assert.equal(err, null);
                if (docs.length < 1) {
                    console.log("No Documents Found")
                }
                else {
                  
                    docs.forEach(element => {
                        var obj = {};
                        obj.subscription = {};
                        obj.appname = element.activityName;
                        obj.version = element.version;
                        if (element.publish !== null) {
                            obj.publish = element.application.publish;
                        }
                       if(element.application.document_description.subscription !== "")
                       {
                           var subscribe =   element.application.document_description.subscription;
                           subscribe.forEach ((subscribe)=>
                           {
                             obj.subscription = Object.assign(obj.subscription,subscribe);
                           }); 
                       }
                       fetch('http://172.23.238.208:5000/api/v1/todos', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(obj)
                    }).then((response) => {
                        return response.json();
                      }).then((res) => { 
                          if(res.success = "true")
                          {
                            updateDocument(db, () => {
                                client.close();
                              });
                          }
                       }).catch((err) => { console.log(err) });
                       
                        console.log(obj);
                    });
                  
                }
            });
        }
        findDocuments(db, () => {
            client.close();
        });
    });
});
cronJob.start();
module.exports = cronJob;

