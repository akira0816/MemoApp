import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { shape, string } from "prop-types";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";

import CircleButton from "../components/CircleButton";
import { dateToString } from "../utils/index";
import { auth, db } from "../firebase";

export default function MemoDetailScreen(props) {
  const { navigation, route } = props;
  const { id } = route.params;

  console.log(id);
  const [memo, setMemo] = useState(null);

  useEffect(() => {
    const { currentUser } = auth;
    let unsub = () => {};
    if (currentUser) {
      const u = collection(db, `users/${currentUser.uid}/memos`);
      const q = doc(u, id);

      unsub = onSnapshot(q, (doc) => {
        console.log(doc.id, doc.data());
        const data = doc.data();
        setMemo({
          id: doc.id,
          bodyText: data.bodyText,
          updatedAt: data.updatedAt.toDate(),
        });
      });
    }
    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>
          {memo && memo.bodyText}
        </Text>
        <Text style={styles.memoDate}>
          {memo && dateToString(memo.updatedAt)}
        </Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoText}>{memo && memo.bodyText}</Text>
      </ScrollView>
      <CircleButton
        style={{ top: 60, bottom: "auto" }}
        name='pencil'
        onPress={() => {
          navigation.navigate("MemoEdit");
        }}
      />
    </View>
  );
}

MemoDetailScreen.propType = {
  route: shape({
    params: shape({ id: string }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  memoHeader: {
    backgroundColor: "#467FD3",
    height: 96,
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "bold",
  },
  memoDate: {
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 16,
  },
  memoBody: {
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
