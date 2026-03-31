import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // 🔥 데이터베이스(Firestore) 기능 추가

const firebaseConfig = {
  apiKey: "AIzaSyA2B6acr6KJfi05N_BDFX9IxPJ4QrZA3LA",
  authDomain: "per-il-tuo-caffe.firebaseapp.com",
  projectId: "per-il-tuo-caffe",
  storageBucket: "per-il-tuo-caffe.firebasestorage.app",
  messagingSenderId: "33301372146",
  appId: "1:33301372146:web:9347033fbb4b17d93bc46b",
  measurementId: "G-68Q8GR2VXR"
};

// Firebase 및 애널리틱스 초기화
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// 다른 파일들(ProductAdd, Consumer 등)에서 쓸 수 있도록 db 내보내기
export const db = getFirestore(app);
