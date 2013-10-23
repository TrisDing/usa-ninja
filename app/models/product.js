/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

/**
 * Item Schema
 */
var ProductSchema = new Schema({
    name: {
        type: String,
        default: 'I\'m a product'
    },
    catagory: {
        type: String,
        default: ''
    },
    brand: {
        type: String,
        default: ''
    },
    thumbnail: {
        type: String,
        default: ''
    },
    images: {
        type: Array,
        default: []
    },
    price: {
        type: Number,
        default: '999999999'
    },
    promotion: {
        type: Number,
        default: '0'
    },
    overview: {
        type: String,
        default: 'I\'m a product overview. Here you can write more information about your product. Buyers like to know what they’re getting before they purchase.',
        trim: true
    },
    detail: {
        type: String,
        default: 'I\'m a product detail. I\'m a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

/**
 * Statics
 */

mongoose.model('Product', ProductSchema);