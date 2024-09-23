import React from "react";

import { View, Text } from "react-native";

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

const OpenCamera: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>Camera Opened</Text>
    </View>
  );
};

export default OpenCamera;
