/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Product = mongoose.model('Product'),
    _ = require('underscore');


/**
 * Find products by catagory
 */
exports.catagory = function(req, res, next, catagory) {
    Product.find({catagory: catagory}).sort('-created').exec(function(err, products) {
        if (err) return next(err);
        if (!products) return next(new Error('Failed to load products ' + catagory));
        req.products = products;
        next();
    });
};

exports.create = function(req, res) {
    var product = new Product(req.body);
    product.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                product: product
            });
        } else {
            res.jsonp(product);
        }
    });
};

exports.show = function(req, res) {
    res.jsonp(req.products);
};