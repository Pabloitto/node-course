module.exports = {
    imports: ['$scope', '$location', '$routeParams', 'commonService'],
    body: function ($scope, $location, $routeParams, commonService) {
        $scope.layoutOptions = {
            title: 'HOME',
            breadCrumbsOptions: {
                IsActive: false,
                Text: 'Home',
                CssIcon: 'glyphicon-home'
            }
        };
    }
};