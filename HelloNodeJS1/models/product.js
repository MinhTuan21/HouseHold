const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String},
    description: { type: String },
    price: { type: Number },
    image: { type: String },
    rating: { type: Number, default: 0 },
    category: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
