/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
    name: { 
        type: String, 
        default: 'I\'m a product'
    },
    group: String,
    brand: String,
    catagory: String,
    functional: [String],
    thumbnail: {type: String, default: ""},
    images: {type: [String], default: []},
    sizes: {type: [String], default: []},
    overview: { 
        type: String, 
        trim: true,
        default: 'I\'m a product overview. Here you can write more information about your product. Buyers like to know what they’re getting before they purchase.'
    },
    detail: { 
        type: String, 
        trim: true,
        default: 'I\'m a product detail. I\'m a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.'
    },
    price: {
        unit: {type: Number, default: 0},
        ours: {type: Number, default: 0},
        shipping: {type: Number, default: 0},
        promotion: {type: Number, default: 0},
        onsale: {type: Boolean, default: false}
    },
    supply: {
        source: {type: [String], default: []},
        stock: {type: Number, default: 0},
        orders: {type: Number, default: 0}
    },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    createby: { type: Schema.ObjectId, ref: 'User' },
    updateby: { type: Schema.ObjectId, ref: 'User' },
    meta: {
        brought: {type: Number, default: 0},
        appraisal: {type: Number, default: 0},
        votes: {type: Number, default: 0},
        favs: {type: Number, default: 0},
        comments: {type: Number, default: 0}
    }
});

/**
 * Statics
 */

mongoose.model('Product', ProductSchema);