/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Product = require('../api/product/product.model');


Product.find({}).remove(function() {
  Product.create({
    name : 'Apple iPhone 6',
    description : 'Apple iOS, экран 4.7" IPS (750x1334), ОЗУ 1 ГБ, флэш-память 16 ГБ, камера 8 Мп, аккумулятор 1810 мАч',
    price: 654,
    comments: [
      { author: 'Kostya', body: 'Nice Phone'},
      { author: 'Katya', body: 'I whant to buy it'}
    ]
  },{
    name : 'Lenovo P70-A',
    description : 'Android, экран 5" IPS (720x1280), ОЗУ 2 ГБ, флэш-память 16 ГБ, карты памяти, камера 13 Мп, аккумулятор 4000 мАч',
    price: 253,
    comments: [
      { author: 'Vasya', body: 'Too Big'}
    ]
  });
});
