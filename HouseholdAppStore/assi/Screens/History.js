import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const HistoryScreen = () => {

  const historyData = [
    { id: 1, action: "Login", date: "2025-03-05" },
    { id: 2, action: "Buy Product", date: "2025-03-05" },
    { id: 3, action: "Update InFormation", date: "2025-03-05" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activities of History</Text>
      <ScrollView>
        {historyData.map((item) => (
          <View key={item.id} style={styles.historyItem}>
            <Text style={styles.historyText}>Activities: {item.action}</Text>
            <Text style={styles.historyText}>Day: {item.date}</Text>
          </View>
        ))}
      </ScrollView>
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
  historyItem: {
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  historyText: {
    fontSize: 16,
    color: "#333",
  },
});

export default HistoryScreen;
