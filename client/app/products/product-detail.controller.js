'use strict';

angular.module('productsAndCommentsApp')
  .controller('ProductDetailCtrl', function ($scope, $routeParams, $http) {

    $scope.currentProduct = {name: "qqqqq"};
    $scope.getProduct = getProduct;

    getProduct($routeParams.id);

    function getProduct(id){
      $http.get('/api/products/' + id).success(function(product){
        $scope.currentProduct = product;
      });
    }
  });
