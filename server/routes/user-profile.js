const express = require('express');

const routes = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb');
const assert = require('assert');
const fetch = require('node-fetch');


const dbName = 'aayush';
const url = 'mongodb://mongo:27017';
const cors = require('cors');

routes.use(cors());
routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(bodyParser.json());




routes.get('/:user', (req, res) => {
    const orgName = req.params.user;
    const list = [];
    var version_count = 0;
    MongoClient.connect(url, (err, client) => {
        assert.equal(null, err);
        const db = client.db(dbName);
        function findDocuments(db, callback) {
            const collection = db.collection('application_activities');
            collection.find({ $and: [{ userName: orgName }, { flag: "latest" }] }).toArray((err, docs) => {
                assert.equal(err, null);
                if (docs.length < 1) {

                    list.push({ "activityName": "No Registrations" });
                    res.send(list);
                } else {
                    docs.forEach((element) => {
                        function findDocuments2(db, callback) {
                            const collection = db.collection('application_activities');
                            collection.find(  { activityName : element.activityName } ).toArray((err, docs) => {
                                assert.equal(err, null);
                                 docs.map(() => {version_count++; console.log(version_count)}
                                 )
                            });
                        }
                        findDocuments2(db, () => {
                            client.close();
                        });

                        list.push({ "activityName": element.activityName, "date": element.date, "version": element.version , "count" : version_count });
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
