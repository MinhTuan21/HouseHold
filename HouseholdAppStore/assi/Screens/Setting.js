import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "./UserContext";
import styles from "./stylesSetting";
import Icon from "react-native-vector-icons/Ionicons";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { userData } = useContext(UserContext);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure Log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => navigation.replace("Login") },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setting</Text>
      <Image
        source={{ uri: userData?.avatar || "https://via.placeholder.com/100" }}
        style={styles.profileImage}
      />

      <TouchableOpacity style={styles.infoButton} onPress={() => navigation.navigate("Information")}> 
        <Icon name="person-circle-outline" size={20} color="black" />
        <Text style={styles.infoText}>Information</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate("EditFrofile")}> 
        <Icon name="create-outline" size={20} color="black" />
        <Text style={styles.editProfileText}>Update information</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate("History")}> 
        <Icon name="time-outline" size={20} color="black" />
        <Text style={styles.historyText}>History of Activities</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.notificationsButton} onPress={() => navigation.navigate("Notification")}> 
        <Icon name="notifications-outline" size={20} color="black" />
        <Text style={styles.notificationsText}>Notification</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}> 
        <Icon name="log-out-outline" size={20} color="black" />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
