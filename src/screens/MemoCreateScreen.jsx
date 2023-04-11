import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import CircleButton from "../components/CircleButton";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { useState } from "react";

export default function MemoCreateScreen(props) {
  const { navigation } = props;
  const [bodyText, setBodyText] = useState("");

  // navigation.goBack();

  async function handlePress() {
    const { currentUser } = auth;
    // await addDoc(collection(db, "memos"), { bodyText: "hello" })
    await addDoc(collection(db, `users/${currentUser.uid}/memos`), {
      bodyText,
      updatedAd: new Date(),
    })
      // setDoc(ref, { bodyText: "hello" })
      .then((docRef) => {
        console.log("created!", docRef.id);
        navigation.goBack();
      })
      .catch((error) => {
        console.log("error!", error);
      });
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <TextInput
          value={bodyText}
          multiline
          style={styles.input}
          onChangeText={(text) => {
            setBodyText(text);
          }}
          autoFocus
        />
      </View>
      <CircleButton name="check" onPress={handlePress} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 27,
    paddingVertical: 32,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24,
  },
});
