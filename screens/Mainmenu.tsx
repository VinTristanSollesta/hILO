import React from "react";

import { View, Text, Pressable } from "react-native";

import Styles from "../Styles";

import { StackNavigationProp } from "@react-navigation/stack";

// Define the type for the navigation prop
type RootStackParamList = {
  Login: undefined;
  Mainmenu: undefined; // Add other routes as needed
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const Mainmenu: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={Styles.container}>
      <View style={Styles.card}>
        <Pressable
          style={Styles.button}
          onPress={() => {
            navigation.navigate("OpenCamera");
          }}
        >
          <Text>Scan Camera</Text>
        </Pressable>
        <Pressable
          style={Styles.button}
          onPress={() => {
            navigation.navigate("Library");
          }}
        >
          <Text>Open Library</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Mainmenu;
