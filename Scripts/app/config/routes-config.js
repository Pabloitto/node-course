
module.exports = {
    resolve: function($routeProvider) {
        require('./../main/routes')($routeProvider).create();
        require('./../badge/routes')($routeProvider).create();
        require('./../grid/routes')($routeProvider).create();
        require('./../form/routes')($routeProvider).create();
        //{{INSERTHERE}}
    }
};