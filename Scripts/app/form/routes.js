module.exports = function($routeProvider) {
    return {
        create: function() {
            $routeProvider.when('/form', {
                templateUrl: '../Scripts/app/form/views/form-view.html',
                controller: 'formController'
            });
        }
    }
};