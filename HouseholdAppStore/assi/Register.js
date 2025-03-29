import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import regis from "./stylesRegister"; 
import { registerUser } from "../api/auth";

const RegisterScreen = ({ navigation }) => { 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateInputs = (name, email, password, confirmPassword) => {
    if (!name || !email || !password || !confirmPassword) {
      return "⚠️ Vui lòng nhập đầy đủ thông tin!";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "⚠️ Email không hợp lệ!";
    }

    if (password.length < 6) {
      return "⚠️ Mật khẩu phải có ít nhất 6 ký tự!";
    }

    if (password !== confirmPassword) {
      return "⚠️ Mật khẩu nhập lại không khớp!";
    }

    return null;
  };

  const handleRegister = async () => {
    const error = validateInputs(name, email, password, confirmPassword);
    if (error) {
      setErrorMessage(error);
      return;
    }

    try {
      const response = await registerUser(name, email, password);
      console.log("Phản hồi từ API đăng ký:", response);

      if (response?.success) {
        setErrorMessage("✅ Đăng ký thành công! Chuyển sang đăng nhập...");
        navigation.replace("Login");
      } else {
        setErrorMessage(response?.message || "❌ Đăng ký thất bại!");
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      setErrorMessage("❌ Lỗi kết nối đến server!");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={regis.container}>
      <ScrollView contentContainerStyle={regis.scrollContainer}> 
        <Text style={regis.title}>Tạo tài khoản mới</Text> 

        {errorMessage ? (
          <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>{errorMessage}</Text>
        ) : null}

        <TextInput
          placeholder="Nhập họ và tên"
          style={regis.input} 
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Nhập email"
          style={regis.input} 
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Nhập mật khẩu"
          style={regis.input} 
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Nhập lại mật khẩu"
          style={regis.input} 
          value={confirmPassword}
          secureTextEntry
          onChangeText={setConfirmPassword}
        />
        
        <TouchableOpacity style={regis.LoginButton} onPress={handleRegister}> 
          <Text style={regis.forgotPasswordText}>Đăng ký</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={regis.registerText}>
            Đã có tài khoản? <Text style={regis.registerLink}>Đăng nhập</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
