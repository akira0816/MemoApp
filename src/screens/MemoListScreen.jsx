import { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import CircleButton from "../components/CircleButton";
import LogOutButton from "../components/LogOutButton";
import MemoList from "../components/MemoList";
import { auth, db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    });
  }, []);

  useEffect(() => {
    const { currentUser } = auth;
    let unsub = () => {};
    if (currentUser) {
      const u = collection(db, `users/${currentUser.uid}/memos`);
      const q = query(u, orderBy("updatedAt", "desc"));

      unsub = onSnapshot(
        q,
        (Snapshot) => {
          const userMemos = [];
          Snapshot.forEach((doc) => {
            console.log(doc.id, doc.data());
            const data = doc.data();
            userMemos.push({
              id: doc.id,
              bodyText: data.bodyText,
              updatedAt: data.updatedAt.toDate(),
            });
          });
          setMemos(userMemos);
        },
        (error) => {
          console.log(error);
          Alert.alert("データの読み込みに失敗しました。");
        }
      );
    }
    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <MemoList memos={memos} />
      <CircleButton
        name="plus"
        onPress={() => {
          navigation.navigate("MemoCreate");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
});
