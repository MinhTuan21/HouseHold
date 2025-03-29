import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },title:{
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileImage: {
    marginTop: 40,
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  birthdate: {
    fontSize: 14,
    color: "#777",
    marginBottom: 15,
  },
  editProfileButton: {
    flexDirection: "row",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  editProfileText: {
    fontSize: 16,
    color: "#333",
  },
  infoButton: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
  infoText: {
    
    fontSize: 16,
    color: "#333",
  },
  historyButton: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
    
  },
  historyText: {
    fontSize: 16,
    color: "#333",
  },
  notificationsButton: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
  notificationsText: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#d9534f",
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginTop: "auto", 
  },
  logoutText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default styles;
