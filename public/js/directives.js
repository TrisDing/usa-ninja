angular.module('mean.system').directive('bsHolder', function() {
    return {
        link: function (scope, element, attrs) {
            Holder.run({images:element.get(0), nocss:true});
        }
    };
});