'use strict';

var _ = require('lodash');
var Product = require('./product.model');
var ObjectId = require('mongoose').Types.ObjectId;

// Get list of products
exports.index = function(req, res) {
  Product.find(function (err, products) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(products);
  });
};

// Get a single product
exports.show = function(req, res) {
  Product.findOne(wrapId(req.params.id), function (err, product) {

    if(err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    console.log(product && product.name);
    return res.status(200).json(product);
  });
};

// Get product comments
exports.getComments = function(req, res) {
  Product.findById(wrapId(req.params.id), function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    return res.status(200).json(product.comments);
  });
};

// Creates a new product in the DB.
exports.create = function(req, res) {
  Product.create(req.body, function(err, product) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(product);
  });
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Product.findById(req.params.id, function (err, product) {
    if (err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    var updated = _.merge(product, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(product);
    });
  });
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    product.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function wrapId(id){
  return new ObjectId(id);
}

function handleError(res, err) {
  return res.status(500).send(err);
}
