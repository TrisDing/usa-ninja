angular.module('mean.system').controller('IndexController', ['$scope', 'Global', 'Resources', function ($scope, Global, Resources) {
    $scope.global = Global;

    //Carousel
    $scope.myInterval = 5000;
    $scope.slides = Resources.query({resourceName: 'slides'});

    //Bricklets
    $scope.bricklets = Resources.query({resourceName: 'bricklets'});

    //Featurettes
    $scope.featurettes = Resources.query({resourceName: 'featurettes'});

}]);