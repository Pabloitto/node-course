 var http = require('http'),
     path = require('path'),
     express = require('express'),
     app = express(),
     bodyParser = require('body-parser');

 function init() {

     app.use(bodyParser.json({
         limit: '50mb'
     }));

     app.use(bodyParser.urlencoded({
         limit: '50mb',
         extended: true
     }));

     app.use('/Scripts', express.static(path.resolve(__dirname, 'Scripts')));
     app.use('/Content', express.static(path.resolve(__dirname, 'Content')));
     app.use('/bower_components', express.static(path.resolve(__dirname, 'bower_components')));

     app.set('views', './Views');
     app.set('view engine', 'ejs');

     app.get("/", function(req, res) {
         res.render("index");
     });

     initRoutes();
     startServer();
 }

 function initRoutes() {
     var menuRouter = require("./Routes/menu-routes")();
     app.use('/', menuRouter);
 }

 function startServer() {
     app.set('port', (process.env.PORT || 8081));
     app.listen(app.get('port'), function() {
         console.log('Node app is running on port', app.get('port'));
     });
 }

 init();