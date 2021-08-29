import Firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_ID,
};

Firebase.initializeApp(firebaseConfig);

// utils
const db = Firebase.database();
const auth = Firebase.auth();

// refs
const recipesRef = db.ref("/recipes");
const ingredientsRef = db.ref("/ingredients");

// export utils/refs
export { recipesRef, ingredientsRef, auth };
