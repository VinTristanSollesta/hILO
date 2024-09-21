import Themes from "./Themes";
import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
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
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderColor: "gray",
    width: 250,
    height: 300,
    borderWidth: 2,
  },
});

export default Styles;
