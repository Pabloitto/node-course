module.exports = function ($routeProvider) {
    return {
        create: function () {
            $routeProvider.when('/main', {
                templateUrl: "../Scripts/app/main/views/main-view.html",
                controller: 'mainController'
            });

            $routeProvider.otherwise({
                redirectTo: '/main'
            });
        }
    }
};