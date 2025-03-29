const mongoose = require("mongoose");
const productDetailSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    specifications: {
        type: Map,
        of: String,
        required: true
    },
    stock: { type: Number, required: true, default: 0 },
    manufacturer: { type: String },
    warranty: { type: String },
    additionalInfo: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("ProductDetail", productDetailSchema);
