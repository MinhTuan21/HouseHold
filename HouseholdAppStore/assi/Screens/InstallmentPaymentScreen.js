import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const InstallmentPaymentScreen = ({ route, navigation }) => {
  const { totalPrice } = route.params;
  const [selectedCompany, setSelectedCompany] = useState("");
  const [contractCode, setContractCode] = useState("");
  const [idNumber, setIdNumber] = useState("");

  const handlePayment = () => {
    if (!selectedCompany) {
      Alert.alert("Lỗi", "Vui lòng chọn ngân hàng hoặc công ty tài chính.");
      return;
    }
    if (contractCode.trim() === "") {
      Alert.alert("Lỗi", "Vui lòng nhập mã hợp đồng trả góp.");
      return;
    }
    if (idNumber.trim() === "") {
      Alert.alert("Lỗi", "Vui lòng nhập số CMND/CCCD.");
      return;
    }
    Alert.alert(
      "Thanh Toán Thành Công",
      `Bạn đã đăng ký trả góp ${totalPrice.toLocaleString()} VNĐ.\nNgân hàng/Công ty tài chính: ${selectedCompany}\nMã hợp đồng: ${contractCode}\nSố CMND/CCCD: ${idNumber}`
    );
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh Toán Trả Góp</Text>

      <Text style={styles.total}>Tổng tiền: {totalPrice.toLocaleString()} VNĐ</Text>

      <Text style={styles.label}>Chọn Đơn Vị Trả Góp:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCompany}
          onValueChange={(itemValue) => setSelectedCompany(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Chọn ngân hàng/công ty tài chính" value="" />
          <Picker.Item label="Home Credit" value="Home Credit" />
          <Picker.Item label="FE Credit" value="FE Credit" />
          <Picker.Item label="HD Saison" value="HD Saison" />
          <Picker.Item label="TPBank Finance" value="TPBank Finance" />
          <Picker.Item label="Shinhan Finance" value="Shinhan Finance" />
          <Picker.Item label="Mirae Asset" value="Mirae Asset" />
        </Picker>
      </View>

      <Text style={styles.label}>Mã Hợp Đồng:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mã hợp đồng trả góp"
        value={contractCode}
        onChangeText={setContractCode}
      />

      <Text style={styles.label}>Số CMND/CCCD:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số CMND/CCCD"
        keyboardType="numeric"
        value={idNumber}
        onChangeText={setIdNumber}
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
    marginTop: 10,
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

export default InstallmentPaymentScreen;
