angular.module('mean.products').controller('ProductsController', ['$scope', '$routeParams', '$location', 'Global', 'Products', function ($scope, $routeParams, $location, Global, Products) {
    $scope.global = Global;

    $scope.create = function() {
        var product = new Products({
            name: this.prodName,
            catagory: this.prodCatagory
        });
        
        product.$save(function(response) {
            alert('Success!');
            //$location.path("products/" + response._id);
        });

        this.prodName = "";
        this.prodCatagory = "";
    };

}]);