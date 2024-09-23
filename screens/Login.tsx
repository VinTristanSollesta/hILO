import React from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import styles from "../Styles";
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

const Login: React.FC<Props> = ({ navigation }) => {
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });

  const handleSubmit = () => {
    if (form.username === "admin" && form.password === "pass") {
      Alert.alert("Successful login");
      navigation.navigate("Mainmenu");
    } else {
      Alert.alert("Username and password mismatched.");
    }
  };

  return (
    <View style={styles.containerLogin}>
      <View>
        <SafeAreaView>
          <View style={styles.card}>
            <Text style={styles.titleText}>Login</Text>
            <Text>Username</Text>
            <TextInput
              style={styles.inputText}
              editable
              onChangeText={(username) => setForm({ ...form, username })}
              placeholder="Username"
              value={form.username}
            />
            <Text>Password</Text>
            <TextInput
              style={styles.inputText}
              editable
              secureTextEntry={true}
              onChangeText={(password) => setForm({ ...form, password })}
              placeholder="Password"
              value={form.password}
            />
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text>Submit</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default Login;
