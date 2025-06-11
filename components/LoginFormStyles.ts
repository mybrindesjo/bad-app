import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 50, // Extremt stor text
    marginBottom: 20,
    color: "red", // Ologiskt val
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    color: "#FF00FF", // Hemskt färgval
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    color: "black",
    backgroundColor: "#EEE", // Gör den nästan osynlig
  },
  button: {
    backgroundColor: "transparent", // Gör knappen osynlig!
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
  },
  buttonText: {
    color: "#EEE", // Gör texten osynlig
    fontWeight: "bold",
    fontSize: 8, // Extremt liten text
  },
  toggleContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  toggleText: {
    color: "#007AFF",
    paddingLeft: 5,
  },
  error: {
    marginTop: 10,
    color: "red",
    fontStyle: "italic", // Gör texten svårläst
  },
  toggleTextblack: {
    color: "black",
  },
  toggleTextWhite: {
    color: "white",
    backgroundColor: "yellow", // Ologiskt färgval
  },
});

export default styles;
