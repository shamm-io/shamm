// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK_nO4bQOtdtcyh1oUOof6_gztWMhhDJQ",
  authDomain: "shamm-b5051.firebaseapp.com",
  projectId: "shamm-b5051",
  storageBucket: "shamm-b5051.appspot.com",
  messagingSenderId: "793574849378",
  appId: "1:793574849378:web:5f078966891d0db6438a3b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Export function to initialize firebase
export const initFirebase = () => {
    return app
}

// Export db
export const db = getFirestore(app);

export const initDB = () => {
    return db
}

// Export storage
export const storage = getStorage(app)

export const initStorage = () => {
    return storage
}