var express = require('express');
var menuRouter = express.Router();
var menuController = require('../Controllers/menu-controller')();

module.exports = function() {

    var route = menuRouter.route('/api/menu');

    route.get(menuController.fetchMenu);

    route.post(menuController.createMenu);

    return menuRouter;
}