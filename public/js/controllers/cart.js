angular.module('mean.system').controller('CartController', ['$scope', 'Global', 'Resources', function ($scope, Global, Resources) {
    $scope.global = Global;

    $scope.cart = $scope.global.cart;

    $scope.removeItem = function(index) {
        this.cart.items.splice(index, 1);
        $scope.updateGlobalCart();
    };

    //TODO: prototype cart object
    $scope.updateGlobalCart = function() {
        //update totalQty and totalPrice
        $scope.cart.totalQty = _.reduce($scope.cart.items, function(memo, item) {
            return memo + $scope.toNumber(item.qty);
        }, 0);
        $scope.cart.totalPrice = _.reduce($scope.cart.items, function(memo, item) { 
            return memo + ($scope.toNumber(item.price) * $scope.toNumber(item.qty)); 
        }, 0);
        $scope.cart.totalWeight = _.reduce($scope.cart.items, function(memo, item) { 
            return memo + $scope.toNumber(item.weight);
        }, 0);
    };

    $scope.toNumber = function (value) {
        value = value * 1;
        return isNaN(value) ? 0 : value;
    };

}]);