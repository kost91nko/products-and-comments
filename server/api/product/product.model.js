'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  comments: [{
    author: String,
    body:String,
    date: { type:Date, default: Date.now}
  }]
});

module.exports = mongoose.model('Product', ProductSchema);
