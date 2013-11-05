angular.module('mean.system').controller('AboutController', ['$scope', 'Global', 'Resources', function ($scope, Global, Resources) {
    $scope.global = Global;

    //Featurettes
    $scope.featurettes = Resources.query({resourceName: 'featurettes'});
}]);