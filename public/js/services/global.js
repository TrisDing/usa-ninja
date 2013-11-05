angular.module('mean.system').factory("Global", [function() {
    var _this = this;
    _this._data = {
        user: window.user,
        authenticated: !! window.user,
        cart: {
            totalPrice: 0,
            totalQty: 0,
            totalWeight: 0,
            items: [] 
        } //TODO: cart should come from the session
    };

    return _this._data;
}]);

angular.module('underscore').factory("_", [function() {
	return window._;
}]);