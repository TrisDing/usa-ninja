window.app = angular.module('mean', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.route', 'underscore', 'mean.system', 'mean.articles', 'mean.products']);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.products', []);
angular.module('underscore', []);