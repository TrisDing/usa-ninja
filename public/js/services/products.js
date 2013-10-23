//Products service used for articles REST endpoint
angular.module('mean.products').factory("Products", ['$resource', function($resource) {
    return $resource('products', {});
}]);