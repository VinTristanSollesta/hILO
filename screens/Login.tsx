import React from "react";
import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import styles from "../Styles";

const Login = () => {
  const [username, setUsername] = React.useState("Username");
  const [password, setPassword] = React.useState("Password");
  return (
    <View style={styles.container}>
      <View>
        <SafeAreaView>
          <View style={styles.card}>
            <Text>Login</Text>
            <TextInput
              style={styles.inputText}
              editable
              onChangeText={setUsername}
              placeholder="Username"
              value={username}
            />
            <TextInput
              style={styles.inputText}
              editable
              onChangeText={setPassword}
              placeholder="Password"
              value={password}
            />
            <Pressable>
              <Text>Submit</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default Login;
