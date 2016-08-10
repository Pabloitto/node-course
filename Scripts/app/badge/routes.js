module.exports = function($routeProvider) {
    return {
        create: function() {
            $routeProvider.when('/badge', {
                templateUrl: '../Scripts/app/badge/views/badge-view.html',
                controller: 'badgeController'
            });
        }
    }
};