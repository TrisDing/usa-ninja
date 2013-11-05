/* Filters */

angular.module('mean.system').filter('accountDisplayFilter', function() {
    return function(item, isAccount, global) {
        if(!isAccount) return item;
        return global.authenticated ? global.user.name : item;
    };
});

angular.module('mean.products').filter('topFilter', function() {
    return function(products, selection) {
        if(_.isArray(products) && _.isString(selection)) {
            switch(selection)
            {
                case 'new':
                    return _.filter(products, function(item) {
                        return Math.round((new Date().getTime() - new Date(item.updated).getTime()) / (1000*60*60*24)) < 15;
                    });
                case 'pop':
                    return _.filter(products, function(item) {
                        return item.meta.brought > 0;
                    });
                case 'sal':
                    return _.filter(products, function(item) {
                        return item.price.onsale === true;
                    });
                case 'sto':
                    return _.filter(products, function(item) {
                        return item.supply.stock > 0;
                    });
                case 'bko':
                    return _.filter(products, function(item) {
                        return item.supply.stock <= 0;
                    });           
                default:
            }
            return products;
        }
        return products;
    };
});

angular.module('mean.products').filter('brandFilter', function() {
    return function(products, selection) {
        if(_.isArray(products) && _.isString(selection)) {
            return _.filter(products, function(item) {
                return item.brand === selection;
            });
        }
        return products;
    };
});

angular.module('mean.products').filter('catagoryFilter', function() {
    return function(products, selection) {
        if(_.isArray(products) && _.isString(selection)) {
            return _.filter(products, function(item) {
                return item.catagory === selection;
            });
        }
        return products;
    };
});

angular.module('mean.products').filter('functionalFilter', function() {
    return function(products, selection) {
        if(_.isArray(products) && _.isString(selection)) {
            return _.filter(products, function(item) {
                return _.contains(item.functional, selection);
            });
        }
        return products;
    };
});

angular.module('mean.products').filter('sizeFilter', function() {
    var UNIT_SIZES = ['S','M','L'];
    return function(size, sizes) {
        return UNIT_SIZES[_.indexOf(sizes, size)];
    };
});
