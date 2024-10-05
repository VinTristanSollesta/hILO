import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import Login from "./screens/Login";
import Mainmenu from "./screens/Mainmenu";
import OpenCamera from "./screens/OpenCamera";
import Library from "./screens/Library";

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
