module.exports = {
    body: function() {
        return {
            restrict: 'E',
            templateUrl: '../Scripts/app/shared/directives/breadcrumbs/breadcrumbs.html',
            transclude: true,
            scope: {
                options: "=options"
            },
            controller: function ($scope) {

            }
        };
    }
};