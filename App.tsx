import React from "react";

import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import styles from "./Styles";
import Login from "./screens/Login";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Mainmenu from "./screens/Mainmenu";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen name="Mainmenu" component={Mainmenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
