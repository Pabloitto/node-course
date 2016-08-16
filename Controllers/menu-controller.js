var mongodb = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/menutest';

module.exports = function() {

    function fetchMenu(req, res) {
        /*mongodb.connect(url, function(err, db) {
            var collection = db.collection('menu');
            collection.find({})
                .toArray(function(err, results) {
                    res.send(results);
                    db.close();
                });
        });*/
        res.send([{
            Id: 1,
            Label: "Home",
            CssIcon: "glyphicon-home",
            Route: "#/home"
        }, {
            Id: 2,
            Label: "Grid",
            CssIcon: "glyphicon-th",
            Route: "#/grid"
        }]);
    }

    function createMenu(req, res) {
        /*var body = req.body;
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('menu');
            collection.insertMany(body, function(err, results) {
                res.send(results);
                db.close();
            });
        });*/
    }

    return {
        fetchMenu: fetchMenu,
        createMenu: createMenu
    }
}