import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const NotificationsScreen = () => {

  const notifications = [
    { id: 1, message: "Notification 1: Thêm và cập nhật ứng dụng mới.", date: "2025-02-28" },
    { id: 2, message: "Notification 2: Khuyến mãi cuối tháng.", date: "2025-02-28" },
    { id: 3, message: "Notification 3: Lịch bảo trì hệ thống.", date: "2025-03-03" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification</Text>
      <ScrollView>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationItem}>
            <Text style={styles.notificationText}>{notification.message}</Text>
            <Text style={styles.notificationDate}>{notification.date}</Text>
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
  notificationItem: {
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  notificationText: {
    fontSize: 16,
    color: "#333",
  },
  notificationDate: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
});

export default NotificationsScreen;
