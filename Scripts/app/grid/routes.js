module.exports = function($routeProvider) {
    return {
        create: function() {
            $routeProvider.when('/grid', {
                templateUrl: '../Scripts/app/grid/views/grid-view.html',
                controller: 'gridController'
            });
        }
    }
};