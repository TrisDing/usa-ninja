angular.module('mean.system').directive('bsHolder', function() {
  return {
    link: function (scope, element, attrs) {
      Holder.run({images:element.get(0), nocss:true});
    }
  };
});

// TODO: async loading
angular.module('mean.system').directive('bsSelect', function () {
  return {
    restrict: 'A',
    require: '?ngModel',
    compile: function (tElement, tAttrs, transclude) {
      tElement.selectpicker();
      return function (scope, element, attrs, ngModel) {
        scope.$watch(attrs.bsSelect, function(model) {
          // watch on the model change
          if(typeof model !== "undefined" && model !== null) {
            console.log(model);
            element.val(model).selectpicker('render');
          }
        });
        // ngModel.$render = function() {
        //   element.val(ngModel.$viewValue || '').selectpicker('render');
        // };
        // ngModel.$viewValue = element.val();
      };
    }
  };
});