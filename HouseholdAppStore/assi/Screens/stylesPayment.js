import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "red",
  },
  paymentButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    width: "80%",
    justifyContent: "center",
  },
  paymentText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default styles;
