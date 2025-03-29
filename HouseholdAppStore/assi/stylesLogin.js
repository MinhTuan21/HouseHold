import { StyleSheet } from "react-native";

const COLORS = {
  primary: "#007bff",
  secondary: "#ffa500",
  danger: "#f44336",
  text: "#000",
  white: "#fff",
  border: "#ccc",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: COLORS.text,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: COLORS.text,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    borderRadius: 8,
    color: COLORS.text, // Màu chữ đen
    backgroundColor: COLORS.white,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    color: COLORS.text, // Màu chữ đen
  },
  eyeIcon: {
    padding: 10,
  },
  LoginButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: COLORS.danger,
    padding: 15,
  },
  logins: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: COLORS.secondary,
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
  orLogin: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: COLORS.text,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  registerText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: COLORS.text,
  },
  registerLink: {
    color: COLORS.secondary,
    fontWeight: "bold",
  },
});

export default styles;
