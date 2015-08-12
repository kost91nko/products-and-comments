'use strict';

angular.module('productsAndCommentsApp')
  .controller('ProductsCtrl', ['$scope', '$http', 'Product', function ($scope, $http, Product) {

    $scope.getProducts = getProducts;
    $scope.addProduct = addProduct;
    $scope.deleteProduct = deleteProduct;

    getProducts();

    function addProduct() {
      if(!$scope.newProduct) {
        return;
      }
      var savedProduct = Product.save($scope.newProduct);
      $scope.products.push(savedProduct);
    }

    function deleteProduct(id) {

        Product.delete({id: id});
        getProducts();

    }

    function getProducts(){
        $scope.products = Product.query();
    }
  }]);
