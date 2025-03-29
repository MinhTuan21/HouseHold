import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import styles from "./stylesLogin";
import { loginUser } from "../api/auth";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);

  useEffect(() => {
    const loadLoginData = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("savedEmail");
        const savedPassword = await AsyncStorage.getItem("savedPassword");
        if (savedEmail && savedPassword) {
          setEmail(savedEmail);
          setPassword(savedPassword);
          setRememberPassword(true);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đăng nhập:", error);
      }
    };

    loadLoginData();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("⚠️ Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("⚠️ Email không hợp lệ!");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("⚠️ Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    try {
      const response = await loginUser(email, password);
      console.log("Phản hồi từ API:", response);

      if (response?.token) {
        setErrorMessage(" Đăng nhập thành công!");

      
        if (rememberPassword) {
          await AsyncStorage.setItem("savedEmail", email);
          await AsyncStorage.setItem("savedPassword", password);
        } else {
          await AsyncStorage.removeItem("savedEmail");
          await AsyncStorage.removeItem("savedPassword");
        }

        console.log("Chuyển trang Home...");
        navigation.navigate("Tab", { user: response.user });
      } else {
        setErrorMessage(response?.message || "❌ Email hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      setErrorMessage("❌ Lỗi kết nối đến server!");
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Hi Welcome! 👋</Text>

        {errorMessage ? <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>{errorMessage}</Text> : null}

        <Text style={styles.label}>Email address</Text>
        <TextInput
          placeholder="Enter your email address"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter your password"
            secureTextEntry={isPasswordShown}
            style={styles.passwordInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={styles.eyeIcon}>
            <Ionicons name={isPasswordShown ? "eye-off" : "eye"} size={24} />
          </TouchableOpacity>
        </View>

        
        <View style={styles.rememberContainer}>
          <CheckBox
            value={rememberPassword}
            onValueChange={setRememberPassword}
            color={rememberPassword ? "#4630EB" : undefined}
          />
          <Text style={styles.rememberText}>Remember Password</Text>
        </View>

        <TouchableOpacity style={styles.LoginButton} onPress={handleLogin}>
          <Text style={styles.logins}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => navigation.navigate("ForgotPassWord")}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Text style={styles.orLogin}>Or Login with</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity>
            <Ionicons name="logo-facebook" size={40} color="#1877F2" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="logo-google" size={40} color="#DB4437" />
          </TouchableOpacity>
        </View>

        <Text style={styles.registerText}>
          Don’t have an account?{" "}
          <Text style={styles.registerLink} onPress={() => navigation.navigate("Register")}>
            Register
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
