const express = require("express");
const Product = require("../models/product");
const upload = require("../middleware/uploads");

const router = express.Router();

router.get("/test", (req, res) => {
    res.send("API đang hoạt động!");
});

// Lấy danh sách sản phẩm
router.get("/list", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!", error });
    }
});

router.get("/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
});

router.post("/add", upload.single("image"), async (req, res) => {
    try {
        console.log("Dữ liệu nhận từ React Native:", req.body);
        console.log("File nhận được:", req.file);

        if (!req.file) {
            return res.status(400).json({ error: "Không có file ảnh" });
        }

        const imageUrl = `http://172.16.55.134:4000/uploads/${req.file.filename}`;

        const { name, description, price, category, rating } = req.body;

        if (!name || !description || !price || !category || !rating) {
            return res.status(400).json({ error: "Thiếu thông tin sản phẩm" });
        }   

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            rating,
            image: imageUrl,
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Lỗi server:", error);
        res.status(500).json({ error: "Lỗi server", message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }

        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: `Đã xóa sản phẩm ID ${req.params.id}` });
    } catch (error) {
        console.error("Lỗi khi xóa:", error);
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
});

module.exports = router;
