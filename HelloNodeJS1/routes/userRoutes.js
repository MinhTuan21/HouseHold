const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");

const nodemailer = require("nodemailer");//otpotp
require("dotenv").config();

const router = express.Router();
const SECRET_KEY = "21062005";
// OTPOTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS  
    }
});
// API Test
router.get("/test", (req, res) => {
    res.send("API đang hoạt động!");
});

router.get("/list", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
});

router.post("/register", async (req, res) => {
  try {
      console.log("👉 Nhận request đăng ký...");
      console.log("📩 Body:", req.body);

      const { name, email, password } = req.body;

      if (!name || !email || !password) {
          console.log("⚠️ Thiếu thông tin đăng ký!");
          return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
          console.log("❌ Email đã tồn tại!");
          return res.status(400).json({ message: "Email đã được sử dụng" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });

      await newUser.save();
      console.log("✅ Đăng ký thành công:", newUser);

      res.status(201).json({ message: "Đăng ký thành công", user: newUser });
  } catch (error) {
      console.error("🚨 Lỗi server:", error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});
router.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) return res.status(400).json({ message: "Email không tồn tại" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Mật khẩu không đúng" });

      const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

      res.json({ message: "Đăng nhập thành công", token, user });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
  }
});
// informationinformation
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Người dùng không tồn tại" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
});

// delete
router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "Không tìm thấy người dùng" });

        res.json({ message: "Xóa người dùng thành công", user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
});
// //OTP
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        console.log("📩 Nhận request quên mật khẩu:", email);

        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ Email không tồn tại");
            return res.status(404).json({ message: "Email không tồn tại" });
        }

        const otp = generateOTP();
        user.resetOTP = otp;
        await user.save();
        console.log("✅ OTP đã được tạo:", otp);

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Mã OTP đặt lại mật khẩu",
            text: `Mã OTP của bạn là: ${otp}. Nhập OTP này để đặt lại mật khẩu.`
        });

        console.log("📧 Email đã gửi thành công!");
        res.json({ message: "OTP đã được gửi qua email" });

    } catch (error) {
        console.error("🚨 Lỗi gửi OTP:", error);
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
});
router.post("/reset-password", async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || user.resetOTP !== otp) {
            return res.status(400).json({ message: "OTP không hợp lệ hoặc đã hết hạn!" });
        }

        // Mã hóa mật khẩu mới
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOTP = null;

        await user.save();

        res.json({ success: true, message: "Mật khẩu đã được đặt lại thành công!" });

    } catch (error) {
        console.error("Lỗi reset mật khẩu:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
});


module.exports = router;
