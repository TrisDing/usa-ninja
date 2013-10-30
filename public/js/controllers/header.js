angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', 'Resources', function ($scope, Global, Resources) {
    $scope.global = Global;

    $scope.menu = Resources.query({resourceName: 'menu'});
    $scope.groups = Resources.query({resourceName: 'groups'});
}]);