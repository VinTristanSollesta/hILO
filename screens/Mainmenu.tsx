import React from "react";

import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Styles from "../Styles";

const Mainmenu = () => {
  return (
    <View style={Styles.container}>
      <Text>Main menu</Text>
    </View>
  );
};

export default Mainmenu;
