import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const BankPaymentScreen = ({ route, navigation }) => {
  const { totalPrice } = route.params;
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [paymentCode, setPaymentCode] = useState("");

  const handlePayment = () => {
    if (!selectedBank) {
      Alert.alert("Lỗi", "Vui lòng chọn ngân hàng.");
      return;
    }
    if (accountNumber.trim() === "") {
      Alert.alert("Lỗi", "Vui lòng nhập số tài khoản.");
      return;
    }
    
    Alert.alert(
      "Thanh Toán Thành Công",
      `Bạn đã thanh toán ${totalPrice.toLocaleString()} VNĐ qua ngân hàng ${selectedBank}.\nSố tài khoản: ${accountNumber}\nTin nhắn: ${paymentCode}`
    );
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh Toán Qua Ngân Hàng</Text>

      <Text style={styles.total}>Tổng tiền: {totalPrice.toLocaleString()} VNĐ</Text>

      
      <Text style={styles.label}>Chọn Ngân Hàng:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedBank}
          onValueChange={(itemValue) => setSelectedBank(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Chọn ngân hàng" value="" />
          <Picker.Item label="Vietcombank" value="Vietcombank" />
          <Picker.Item label="BIDV" value="BIDV" />
          <Picker.Item label="Techcombank" value="Techcombank" />
          <Picker.Item label="MB Bank" value="MB Bank" />
          <Picker.Item label="ACB" value="ACB" />
          <Picker.Item label="TPBank" value="TPBank" />
        </Picker>
      </View>

    
      <Text style={styles.label}>Số Tài Khoản:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số tài khoản"
        keyboardType="numeric"
        value={accountNumber}
        onChangeText={setAccountNumber}
      />

      <Text style={styles.label}>Tin nhắn:</Text>
      <TextInput
        style={styles.input}
        value={paymentCode}
        onChangeText={setPaymentCode}
      />

     
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
    color: "#333",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "red",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: "10%",
    marginTop: 10,
    color: "#333",
  },
  pickerContainer: {
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
  picker: {
    width: "100%",
    height: 50,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BankPaymentScreen;
