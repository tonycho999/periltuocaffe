import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // ✨ 인증 기능 추가

const firebaseConfig = {
  apiKey: "AIzaSyA2B6acr6KJfi05N_BDFX9IxPJ4QrZA3LA",
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
export const auth = getAuth(app); // ✨ 다른 파일에서 쓸 수 있게 내보내기
