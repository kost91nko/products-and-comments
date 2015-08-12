'use strict';

angular.module('productsAndCommentsApp')
    .directive('productRow', function(){
        return {
            restrict: 'E',
            templateUrl: 'app/directives/product/product.html'
        };
    });