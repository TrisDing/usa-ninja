angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', '$location', 'Resources', '_', function ($scope, Global, $location, Resources, _) {
    $scope.global = Global;

    //TODO: figure out how to do admin
    $scope.global.admin = (!! $scope.global.user) ? ($scope.global.user.name === 'Admin') : false;
    $scope.menu = Resources.query({resourceName: 'menu'});

    $scope.displayItem = function(item) {
        return !! (item.auth ? (item.admin ? $scope.global.admin : $scope.global.user) : true);
    };

    $scope.displayDropdown = function() {
        var item = this.item;
        return item.submenus ? (_.some(item.submenus, function(item) {
            return $scope.displayItem(item);
        })) : false;
    };

    $scope.goToCart = function() {
        $location.path('cart');
    };

    //TODO: 
    // 1. make ng-class=active work
    // 2. where to put the account menu?
    // 3. add cart label
}]);