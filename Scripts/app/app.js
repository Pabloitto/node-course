(function init() {

	var globals = require("./config/global-config");
    var angular = require("angular");
    var routes = require("angular-route");
    var app = angular.module(globals.APP_NAME, ['ngRoute']);
    var routes = require("./config/routes-config");
    var dependencies = require("./config/dependencies-config");

    app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        routes.resolve($routeProvider);
    }]);

    dependencies.resolve();
}());