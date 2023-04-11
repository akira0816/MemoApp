import { firebaseConfig } from "../env";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
// const auth = initializeAuth(app, {
//     persistence:
// })

export const auth = getAuth(app);
export const db = getFirestore(app);
