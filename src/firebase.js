import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔥 여기에 Firebase 콘솔에서 발급받은 실제 정보를 넣어야 합니다.
// 지금은 빈 틀만 만들어 두었습니다.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore(데이터베이스) 내보내기 (다른 파일에서 db로 불러와서 사용)
export const db = getFirestore(app);
