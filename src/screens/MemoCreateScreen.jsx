import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  InputAccessoryView,
} from "react-native";

import CircleButton from "../components/CircleButton";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase";

const MemoCreateScreen = (props) => {
  const inputAccessoryViewID = "uniqueID";

  const { navigation } = props;
  const [bodyText, setBodyText] = useState("");

  // navigation.goBack();

  async function handlePress() {
    const { currentUser } = auth;
    // await addDoc(collection(db, "memos"), { bodyText: "hello" })
    await addDoc(collection(db, `users/${currentUser.uid}/memos`), {
      bodyText,
      updatedAt: new Date(),
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
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inputContainer}>
          <TextInput
            value={bodyText}
            multiline
            style={styles.input}
            onChangeText={(text) => {
              setBodyText(text);
            }}
            inputAccessoryViewID={inputAccessoryViewID}
            autoFocus
          />
          {Platform.OS === "ios" && (
            <InputAccessoryView
              nativeID={inputAccessoryViewID}
              backgroundColor='rgba(0,0,0,0)'
            >
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => Keyboard.dismiss()}
                >
                  <Text style={styles.buutonText}>完了</Text>
                </TouchableOpacity>
              </View>
            </InputAccessoryView>
          )}
          <CircleButton name='check' onPress={handlePress} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

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
  button: {
    width: 60,
    alignItems: "center",
    padding: 10,
    height: 100,
  },
  buutonText: {
    paddingVertical: 60,
    fontSize: 18,
    fontWeight: "bold",
    color: "hsl(210, 100%, 60%)",
  },
});

export default MemoCreateScreen;
