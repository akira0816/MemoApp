import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import Button from "../components/Button";
import { translateErrors } from "../utils";
import Loading from "../components/Loading";

export default function SignUpScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handlePress = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(true);
        const { user } = userCredential;
        console.log(user.uid);
        navigation.reset({
          index: 0,
          routes: [{ name: "MemoList" }],
        });
      })
      .catch((error) => {
        console.log(error.code, error.message);
        const errorMsg = translateErrors(error.code);
        Alert.alert(errorMsg.title, errorMsg.descrption);
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Loading isLoding={isLoading} />
      <View style={styles.inner}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          style={styles.input}
          autoCapitalize='none'
          keyboardType='email-address'
          placeholder='Email Adress'
          textContentType='emailAddress'
        />
        <TextInput
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          style={styles.input}
          autoCapitalize='none'
          placeholder='email-address'
          secureTextEntry
          textContentType='password'
        />
        <Button label='Submit' onPress={handlePress} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registered?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "LogIn" }],
              });
            }}
          >
            <Text style={styles.footerLink}>Log In.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  inner: {
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    height: 48,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    marginBottom: 16,
  },

  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: "#467FD3",
  },
  footer: {
    flexDirection: "row",
  },
});
