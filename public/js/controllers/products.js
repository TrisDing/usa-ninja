angular.module('mean.products').controller('ProductsController', ['$scope', '$routeParams', '$location', 'Global', 'Resources', '$modal', 'Products', '_', function ($scope, $routeParams, $location, Global, Resources, $modal, Products, _) {
    $scope.global = Global;

    $scope.loadProducts = function() {
        Products.query({group: $routeParams.group}, function(products) {
            $scope.products = products;
            //Sidebar Top Filters
            $scope.sidenavs = Resources.query({resourceName: 'sidenav'}, function() {
                //Sidebar Sub Filters
                _.each(_.filter($scope.sidenavs, function(item) {
                    return item.type == 'subFilter';
                }), function(item) {
                    item.subitems = _.uniq(_.flatten(_.pluck($scope.products, item.title.toLowerCase())));
                });
            });
        });

        $scope.groups = Resources.query({resourceName: 'groups'}, function() {
            $scope.group = _.findWhere($scope.groups, {name:$routeParams.group});
        });
    };

    $scope.toggleItemExpansion = function() {
        //Flip the Expansion
        this.itemExpanded = !this.itemExpanded;

        //Reset all sub filters
        $scope.bfs = null;
        $scope.cfs = null;
        $scope.ffs = null;
    };

    $scope.toggleItemSelection = function() {
        var lastSelectedItem = this.$parent.lastSelectedItem;

        //Flip the selection
        if(this.itemSelected === true) {
            this.itemSelected = false;
            lastSelectedItem = null;
        } else {
            this.itemSelected = true;
            if(lastSelectedItem !== null) {
                lastSelectedItem.itemSelected = false;
            }
            lastSelectedItem = this;
        }
        //Remember the last selection
        this.$parent.lastSelectedItem = lastSelectedItem;

        //Reload the filter
        if(this.sidenav.type === 'topFilter') {
            $scope.tfs = this.itemSelected ? this.sidenav.key : null;
        } else if(this.sidenav.type === 'subFilter') {
            switch(this.sidenav.key)
            {
                case 'brd':
                    $scope.bfs = this.itemSelected ? this.subitem : null;
                    break;
                case 'cat':
                    $scope.cfs = this.itemSelected ? this.subitem : null;
                    break;
                case 'fun':
                    $scope.ffs = this.itemSelected ? this.subitem : null;
                    break;          
                default:
            }
        }
    };

    $scope.loadGroups = function() {
        $scope.groups = Resources.query({resourceName: 'groups'}, function() {
            //$scope.group = $scope.groups[0];
        });
    };

    $scope.create = function() {
        var product = new Products({
            name: this.name,
            group: this.group.name,
            brand: this.brand,
            catagory: this.catagory,
            functional: this.functional,
            thumbnail: this.thumbnail,
            images: this.images ? this.images.split(",") : [],
            sizes: this.sizes ? this.sizes.split(",") : [],
            overview: this.overview,
            detail: this.detail,
            price: this.price,
            supply: this.supply
        });
        
        product.$save(function(response) {
            $location.path("products/" + response.group);
        });

        //reset all models
        this.name = "";
        this.group = $scope.groups[0];
        this.brand = "";
        this.catagory = "";
        this.functional = "";
        this.thumbnail = "";
        this.images = "";
        this.sizes = "";
        this.overview = "";
        this.detail = "";
        this.price = {};
        this.supply = {};
    };

    $scope.detail = function() {
        var that = this;
        var modalInstance = $modal.open({
            templateUrl: 'views/products/detail.html',
            controller: DetailController,
            resolve: {
                product: function () {
                    return that.product;
                }
            }
        });

        modalInstance.result.then(function (item) {
            //TODO: use item model
            //update qty if exist already
            var found = _.findWhere($scope.global.cart.items, {_product: item._product});
            if(!! found) {
                found.qty += item.qty;
            } else {
                $scope.global.cart.items.push(item);
            }
            //update totalQty and totalPrice
            //TODO: prototype cart object
            $scope.global.cart.totalQty = _.reduce($scope.global.cart.items, function(memo, item) {
                return memo + $scope.toNumber(item.qty);
            }, 0);
            $scope.global.cart.totalPrice = _.reduce($scope.global.cart.items, function(memo, item) { 
                return memo + ($scope.toNumber(item.price) * $scope.toNumber(item.qty)); 
            }, 0);
            $scope.global.cart.totalWeight = _.reduce($scope.global.cart.items, function(memo, item) { 
                return memo + $scope.toNumber(totalWeight);
            }, 0);
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toNumber = function (value) {
        value = value * 1;
        return isNaN(value) ? 0 : value;
    };

}]);

var DetailController = function ($scope, Global, $modalInstance, product) {
    $scope.global = Global;
    $scope.product = product;
    $scope.onsale = product.price.ours > 0;
    $scope.selectedSize = product.sizes.length > 1 ? null : product.sizes[0];
    $scope.alerts = [];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.addToCart = function () {
        if(!! $scope.selectedSize) {
            var item = {
                _user: !!$scope.global.user ? $scope.global.user._id : "Guest",
                _product: product._id,
                name: product.name,
                thumbnail: product.thumbnail,
                size: $scope.selectedSize.trim(),
                price: $scope.onsale ? product.price.ours : product.price.unit,
                qty: 1 // default to 1
            };
            $modalInstance.close(item);
        } else {
            $scope.alerts.push({msg: "Please select a size!"});
        }
        
    };

      $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.selectSize = function() {
        $scope.selectedSize = this.size;
    };

    //TODO: impelemt add to cart
};