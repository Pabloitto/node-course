module.exports = {
    body: function () {
        return {
            restrict: 'E',
            templateUrl: window.root + "Scripts/app/shared/directives/panel/panel.html",
            transclude: true,
            scope: {
                options: "=options"
            },
            controller: function ($scope) {
                $scope.panelType = $scope.options.panelType || 'panel-primary';
                $scope.title = $scope.options.title || '';
            }
        };
    }
};