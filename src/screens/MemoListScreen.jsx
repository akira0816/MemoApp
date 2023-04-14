import { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import CircleButton from "../components/CircleButton";
import LogOutButton from "../components/LogOutButton";
import MemoList from "../components/MemoList";
import { auth, db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Button from "../components/Button";
import Loading from "../components/Loading";

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memos, setMemos] = useState([]);
  const [isLoding, setLoding] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    });
  }, []);

  useEffect(() => {
    const { currentUser } = auth;
    let unsub = () => {};
    if (currentUser) {
      setLoding(true);
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
          setLoding(false);
        },
        (error) => {
          console.log(error);
          setLoding(false);
          Alert.alert("データの読み込みに失敗しました。");
        }
      );
    }
    return unsub;
  }, []);

  if (memos.length === 0) {
    return (
      <View style={emptyStayles.container}>
        <Loading isLoding={isLoding} />
        <View style={emptyStayles.inner}>
          <Text style={emptyStayles.title}>最初のメモを作成しよう！</Text>
          <Button
            style={emptyStayles.button}
            label='作成する'
            onPress={() => {
              navigation.navigate("MemoCreate");
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MemoList memos={memos} />
      <CircleButton
        name='plus'
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

const emptyStayles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
  },
  button: {
    alignSelf: "center",
  },
});
