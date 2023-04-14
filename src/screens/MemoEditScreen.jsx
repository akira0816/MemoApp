import { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Button,
  Keyboard,
  InputAccessoryView,
  Alert,
} from "react-native";
import CircleButton from "../components/CircleButton";
import { shape, string } from "prop-types";
import { auth, db } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export default function MemoEditScreen(props) {
  const inputAccessoryViewID = "uniqueID";

  const { navigation, route } = props;
  const { id, bodyText } = route.params;
  const [body, setBody] = useState(bodyText);

  async function handlePress() {
    const { currentUser } = auth;
    if (currentUser) {
      const u = collection(db, `users/${currentUser.uid}/memos`);
      const d = doc(u, id);

      // await setDoc(d, { bodyText: body, updatedAt: new Date() })
      await setDoc(
        d,
        { bodyText: body, updatedAt: new Date() },
        { marge: true }
      )
        .then(() => {
          navigation.goBack();
        })
        .catch((error) => {
          Alert.alert(error.code);
        });
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inputContainer}>
          <TextInput
            value={body}
            multiline
            style={styles.input}
            onChangeText={(text) => {
              setBody(text);
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
}

MemoEditScreen.propType = {
  route: shape({
    params: shape({ id: string, bodyText: string }),
  }).isRequired,
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
});
