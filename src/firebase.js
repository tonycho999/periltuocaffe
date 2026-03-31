import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  // 🔥 하드코딩된 키를 지우고, 숨겨둔 환경 변수를 불러옵니다.
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "per-il-tuo-caffe.firebaseapp.com",
  projectId: "per-il-tuo-caffe",
  storageBucket: "per-il-tuo-caffe.firebasestorage.app",
  messagingSenderId: "33301372146",
  appId: "1:33301372146:web:9347033fbb4b17d93bc46b",
  measurementId: "G-68Q8GR2VXR"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
