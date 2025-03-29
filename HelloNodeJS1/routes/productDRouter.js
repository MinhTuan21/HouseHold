const express = require("express");
const ProductDetail = require("../models/productD");
const router = express.Router();

router.get("/test", (req, res) => {
    res.send("API test productdetails.");
});
router.get("/:productId", async (req, res) => {
    try {
        const productDetail = await ProductDetail.findOne({ productId: req.params.productId });
        if (!productDetail) {
            return res.status(404).json({ message: "Product details not found" });
        }
        res.json(productDetail);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


router.post("/add", async (req, res) => {
    try {
        const { productId, specifications, stock, manufacturer, warranty, additionalInfo } = req.body;
        const newProductDetail = new ProductDetail({ productId, specifications, stock, manufacturer, warranty, additionalInfo });
        await newProductDetail.save();
        res.status(201).json(newProductDetail);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.put("/:productId", async (req, res) => {
    try {
        const updatedProductDetail = await ProductDetail.findOneAndUpdate(
            { productId: req.params.productId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProductDetail) {
            return res.status(404).json({ message: "Product details not found" });
        }
        res.json(updatedProductDetail);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


router.delete("/:productId", async (req, res) => {
    try {
        const deletedProductDetail = await ProductDetail.findOneAndDelete({ productId: req.params.productId });
        if (!deletedProductDetail) {
            return res.status(404).json({ message: "Product details not found" });
        }
        res.json({ message: "Product details deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
