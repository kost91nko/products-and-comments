'use strict';

angular.module('productsAndCommentsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/products', {
        templateUrl: 'app/products/products.html',
        controller: 'ProductsCtrl'
      })
      .when('/products/:id', {
        templateUrl: 'app/products/product-detail.html',
        controller: 'ProductDetailCtrl'
      });
  });
