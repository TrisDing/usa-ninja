//Static Data services
angular.module('mean.system').factory("Resources", ['$resource', function($resource) {
	return $resource('resources/:resourceName.json', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
}]);