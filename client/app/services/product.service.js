'use strict';

angular.module('productsAndCommentsApp')
    .factory('Product', ['$resource',
        function($resource){
            return $resource('api/products/:id');
        }]);