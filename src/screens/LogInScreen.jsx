import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Button from "../components/Button";
import { useState, useEffect } from "react";
// import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import Loading from "../components/Loading";
import { translateErrors } from "../utils";

export default function LogInScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: "MemoList" }],
        });
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  function handlePress() {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentail) => {
        const { user } = userCredentail;
        console.log(user.uid);
        navigation.reset({
          index: 0,
          routes: [{ name: "MemoList" }],
        });
      })
      .catch((error) => {
        const errorMsg = translateErrors(error.code);
        Alert.alert(errorMsg.title, errorMsg.descrption);
      })
      .then(() => {
        setLoading(false);
      });
  }

  return (
    <View style={styles.container}>
      <Loading isLoding={isLoading} />
      <View style={styles.inner}>
        <Text style={styles.title}>Log In</Text>
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
          placeholder='password'
          secureTextEntry
          textContentType='password'
        />
        <Button label='Submit' onPress={handlePress} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not registered?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "SignUp" }],
              });
            }}
          >
            <Text style={styles.footerLink}>Sign up here!</Text>
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
