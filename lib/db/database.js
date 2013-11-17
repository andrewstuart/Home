var mongodb = require('mongodb')
, server = new mongodb.Server('localhost', 27017 )
, client = new mongodb.MongoClient(server, {w: -1});

client.open(function(err) {
  if (err) throw err;

  console.log("Connected to mongo!");
});

var db = client.db('filesite');

module.exports = client;
