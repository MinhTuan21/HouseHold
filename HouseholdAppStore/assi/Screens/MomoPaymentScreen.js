import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet } from "react-native";

const MomoPaymentScreen = ({ route, navigation }) => {
  const { totalPrice, userName } = route.params; 
  const [paymentCode, setPaymentCode] = useState("");

  const handlePayment = () => {
    if (paymentCode.trim() === "") {
      Alert.alert("Lỗi", "Vui lòng nhập mã giao dịch Momo.");
      return;
    }
    Alert.alert(
      "Thanh Toán Thành Công",
      `Bạn đã thanh toán ${totalPrice.toLocaleString()} VNĐ qua Momo.\nMã giao dịch: ${paymentCode}`
    );
    navigation.navigate("Tab");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh Toán Qua Momo</Text>
      <Text style={styles.total}>Tổng tiền: {totalPrice.toLocaleString()} VNĐ</Text>

      <View style={styles.logoContainer}>
        <Image source={require("../../images/logo.png")} style={styles.logo} />
      </View>

      <Image source={require("../../images/qr.png")} style={styles.qrCode} />

      <TextInput
        style={styles.input}
        placeholder="Nhập mã giao dịch Momo"
        value={paymentCode}
        onChangeText={setPaymentCode}
      />

      <View style={styles.quickSelectContainer}>
        <TouchableOpacity
          style={styles.quickSelectButton}
          onPress={() => setPaymentCode("0899925757  Đỗ Văn Minh Tuấn")}
        >
          <Text style={styles.quickSelectText}>0899925757</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickSelectButton}
          onPress={() => setPaymentCode("0123456789 Đỗ Văn Minh Tuấn")}
        >
          <Text style={styles.quickSelectText}>0123456789</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handlePayment}>
        <Text style={styles.confirmText}>Xác nhận thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    marginBottom: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60, 
    borderWidth: 2, 
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  qrCode: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  quickSelectContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 20,
  },
  quickSelectButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 10,
  },
  quickSelectText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#ff5f00",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MomoPaymentScreen;
