/*
 * ALL verbs for Data.
 */

var client = require('../db/database')
, ID = require('mongodb').ObjectID
, _ = require('underscore')._

//SQL config
var config = {
  mobileQAS: {
    user: 'node_sa',
    password: 'Pipeline01',
    server: 'az01-dwdev',
    database: 'MobileQAS'
  },
  dw: {
    user: 'node_sa',
    password: 'Pipeline01',
    server: 'az01-dwdev',
    database: 'DW'
  }
};

module.exports = function(req, res) {

  var systemName = req.env || 'test';

  var db = client.db(systemName);

  //CORS stuff.
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Authorization, Accept, Content-Type');
  res.set('Access-Control-Allow-Credentials', 'true');

  //debugger;

  var sendJson = function(err, docs) {
    if(err) throw err;
    res.json(docs);
  }

  //Reference to my collectionName
  //TODO: Find out how to ignore static path roots.
  var collName = req.params.collectionName;
  var objectId = req.params.objectId;
  var searchObject = req.query || {};
  var dbObject = req.body;

  //If the collectioName was specified,
  if(collName) {
    //Generate search object.
    if(objectId) {
      searchObject._id = dbObject._id = ID(objectId);
    }

    db.collection(collName, function(err, coll) {
      if(err) res.send(error);

      switch (req.originalMethod) {
        case 'GET':
          return coll.find(searchObject).toArray(sendJson);
          break;
        case 'POST':
          dbObject.receivedAt = new Date();
          return coll.insert(dbObject, sendJson);
          break;
        case 'PUT':
          //Basically, yell at the client for putting to a collection. For now.
          if(!objectId) return res.send(404);
          //Remove the id so it doesn't become part of the key.
          delete dbObject._id;

          return coll.update(searchObject, dbObject, function() {
            //Add the id back in.
            dbObject._id = ID(objectId);
            res.json([dbObject]);
          });
          break;
        case 'DELETE':
          if(!objectId) return res.send(404);

          //Remove from the collection.
          return coll.remove(searchObject, sendJson);
          break;
        case 'PATCH':
          return res.write(405);
          break;
        case 'OPTIONS':
          return res.send(200);
          break;
        default:
          return res.write(405);
          break;
      }


    });
  }
  else {
    db.collectionNames(sendJson);
  }
}
