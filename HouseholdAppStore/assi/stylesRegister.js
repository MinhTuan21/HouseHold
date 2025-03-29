import { StyleSheet } from "react-native";

const regis = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: { 
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  LoginButton: {
    backgroundColor: "#f44336",
    borderRadius: 20,
    padding: 15,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  forgotPasswordText: {
    textAlign: "center",
    color: "white",
  },
  registerText: {
    textAlign: "center",
    marginTop: 20,
  },
  registerLink: {
    color: "blue",
  },
  
  circleWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40, 
    backgroundColor: "#f44336", 
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "center",
    overflow: "hidden", 
  },
  circleImage: {
    width: 80,
    height: 80,
    resizeMode: "cover", 
  },
});

export default regis;
