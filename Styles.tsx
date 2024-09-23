import Themes from "./Themes";
import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  containerLogin: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  inputText: {
    borderWidth: 2,
    borderColor: "gray",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: 200,
    backgroundColor: "white",
  },
  card: {
    justifyContent: "center",
    borderRadius: 15,
    borderColor: "gray",
    padding: 50,
    borderWidth: 2,
  },
  titleText: {
    fontSize: 32,
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
  },

  button: {
    backgroundColor: Themes.primary,
    padding: 5,
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
});

export default Styles;
