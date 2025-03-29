import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserContext } from "./UserContext";

const InformationScreen = () => {
  const { userData } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>InFormation</Text>
      <Text style={styles.label}>Name: {userData?.name || "Chưa có tên"}</Text>
      <Text style={styles.label}>Address: {userData?.address || "Chưa có địa chỉ"}</Text>
      <Text style={styles.label}>
        Ngày sinh: {userData?.birthdate ? new Date(userData.birthdate).toLocaleDateString() : "Chưa có ngày sinh"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
});

export default InformationScreen;
