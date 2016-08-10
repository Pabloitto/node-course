var globals = require("../config/global-config");
var app = require("angular").module(globals.APP_NAME);
var factory = require("./../component-factory");
app.controller('mainController', factory.createComponent(require('./controllers/main-controller')));