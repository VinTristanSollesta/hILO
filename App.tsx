import React from "react";
import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import styles from "./Styles";

export default function App() {
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });
  return (
    <View style={styles.container}>
      <View>
        <SafeAreaView>
          <View style={styles.card}>
            <Text>Login</Text>
            <TextInput
              style={styles.inputText}
              editable
              onChangeText={(username) => setForm({ ...form, username })}
              placeholder="Username"
              value={form.username}
            />
            <TextInput
              style={styles.inputText}
              editable
              onChangeText={(password) => setForm({ ...form, password })}
              placeholder="Password"
              keyboardType="visible-password"
              value={form.password}
            />
            <Pressable>
              <Text>Submit</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}
