import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../Screens/stylesPayment";
import { Ionicons } from "@expo/vector-icons";

const PaymentScreen = ({ route, navigation }) => {
  const { selectedItems, totalPrice } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phương Thức Thanh Toán</Text>
      <Text style={styles.total}>Tổng tiền: {totalPrice.toLocaleString()} VNĐ</Text>

      <TouchableOpacity
        style={styles.paymentButton}
        onPress={() => navigation.navigate("MomoPayment", { totalPrice })}
      >
        <Ionicons name="phone-portrait-outline" size={24} color="purple" />
        <Text style={styles.paymentText}>Thanh toán qua Momo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.paymentButton}
        onPress={() => navigation.navigate("BankPayment", { totalPrice })}
      >
        <Ionicons name="card-outline" size={24} color="blue" />
        <Text style={styles.paymentText}>Thanh toán qua ngân hàng</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.paymentButton}
        onPress={() => navigation.navigate("InstallmentPayment", { totalPrice })}
      >
        <Ionicons name="time-outline" size={24} color="orange" />
        <Text style={styles.paymentText}>Trả góp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;
