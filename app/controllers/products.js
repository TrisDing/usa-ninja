/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Product = mongoose.model('Product'),
    _ = require('underscore');


/**
 * Find products by group
 */
exports.group = function(req, res, next, group) {
    Product.find({group: group}).sort('-created').exec(function(err, products) {
        if (err) return next(err);
        if (!products) return next(new Error('Failed to load products ' + group));
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