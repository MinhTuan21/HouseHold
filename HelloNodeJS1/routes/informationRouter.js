const express = require("express");
const Information = require("../models/information");
const router = express.Router();

router.get("/test", (req, res) => {
    res.send("API test information 11.");
});

router.get('/list', async (req, res) => {
    try {
        const info = await Information.find();

        const formattedInfo = info.map(item => ({
            id: item._id,
            name: item.name,
            address: item.address,
            phone: item.phone,
            date: item.date ? item.date.toISOString().split('T')[0].split('-').reverse().join('-') : null
        }));

        res.json(formattedInfo);
    } catch (err) {
        res.status(500).json({ error: "Lỗi khi lấy danh sách: " + err.message });
    }
});

router.post('/add', async (req, res) => {
    try {
        let { name, address, phone, date } = req.body;

        if (date) {
            const parts = date.split("-");
            if (parts.length === 3) {
                date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`); 
                if (isNaN(date.getTime())) {
                    return res.status(400).json({ error: "Sai định dạng ngày. Dùng DD-MM-YYYY." });
                }
            } else {
                return res.status(400).json({ error: "Sai định dạng ngày. Dùng DD-MM-YYYY." });
            }
        }

        const newInfo = new Information({ name, address, phone, date });
        await newInfo.save();
        res.status(201).json(newInfo);
    } catch (err) {
        res.status(400).json({ error: "Lỗi khi thêm thông tin: " + err.message });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        console.log("ID nhận được:", req.params.id);
        console.log("Dữ liệu cập nhật nhận được:", req.body);

        const { name, address, phone, date } = req.body;
        let updatedDate = date;

        if (date) {
            const parts = date.split("-");
            if (parts.length === 3) {
                updatedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
                if (isNaN(updatedDate.getTime())) {
                    return res.status(400).json({ error: "Sai định dạng ngày. Dùng DD-MM-YYYY." });
                }
            } else {
                return res.status(400).json({ error: "Sai định dạng ngày. Dùng DD-MM-YYYY." });
            }
        }

        const updatedInfo = await Information.findByIdAndUpdate(
            req.params.id,
            { name, address, phone, date: updatedDate },
            { new: true, runValidators: true }
        );

        if (!updatedInfo) {
            return res.status(404).json({ error: "Không tìm thấy thông tin để cập nhật" });
        }

        res.json(updatedInfo);
    } catch (err) {
        console.error("Lỗi khi cập nhật:", err.message);
        res.status(400).json({ error: "Lỗi khi cập nhật thông tin: " + err.message });
    }
});


// 📌 Xóa thông tin
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedInfo = await Information.findByIdAndDelete(req.params.id);

        if (!deletedInfo) {
            return res.status(404).json({ error: "Không tìm thấy thông tin để xóa" });
        }

        res.json({ message: "Đã xóa thành công" });
    } catch (err) {
        res.status(500).json({ error: "Lỗi khi xóa thông tin: " + err.message });
    }
});

module.exports = router;
