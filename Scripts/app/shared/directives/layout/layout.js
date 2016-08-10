module.exports = {
    body: function() {
        return {
            restrict: 'E',
            templateUrl: '../Scripts/app/shared/directives/layout/layout.html',
            transclude: true,
            scope: {
                options: "=options"
            },
            controller: function ($scope) {
                $scope.breadCrumbsOptions = $scope.options.breadCrumbsOptions;
            }
        };
    }
};