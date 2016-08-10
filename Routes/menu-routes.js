var express = require("express");
var menuRouter = express.Router();
var mongodb = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/menutest"

module.exports = function() {

    menuRouter.route('/api/menu')
        .get(function(req, res) {
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('menu');
                collection.find({})
                    .toArray(function(err, results) {
                        res.send(results);
                        db.close();
                    });
            });
        })
        .post(function(req, res){
        	var body = req.body;
        	mongodb.connect(url, function(err, db) {
                var collection = db.collection('menu');
                collection.insertMany(body, function(err, results) {
                    res.send(results);
                    db.close();
                });
            });
        });

    return menuRouter;
};