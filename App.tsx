import React from "react";

import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import styles from "./Styles";

//screens
import Login from "./screens/Login";
import Mainmenu from "./screens/Mainmenu";
import OpenCamera from "./screens/OpenCamera";
import Library from "./screens/Library";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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

        <Stack.Screen name="OpenCamera" component={OpenCamera} />
        <Stack.Screen name="Library" component={Library} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
