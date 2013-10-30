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

        modalInstance.result.then(function (name) {
            console.log(name);
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

}]);

var DetailController = function ($scope, Global, $modalInstance, product) {
    $scope.global = Global;
    $scope.product = product;

    $scope.onsale = product.price.ours > 0;

    $scope.addToCart = function () {
        $modalInstance.close($scope.product.name);
    };

      $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
};