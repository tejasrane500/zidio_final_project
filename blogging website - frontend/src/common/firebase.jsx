import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAHL24C2cOblSoZK4xXxm1VkaZaMOA2hOU",
  authDomain: "react-js-blog-website-69e2c.firebaseapp.com",
  projectId: "react-js-blog-website-69e2c",
  storageBucket: "react-js-blog-website-69e2c.firebasestorage.app",
  messagingSenderId: "564060871620",
  appId: "1:564060871620:web:89b95b5c83adb4206e6291"
};

const app = initializeApp(firebaseConfig);

//google auth

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
    
    let user = null;

    await signInWithPopup(auth, provider)
    .then((result) => {
        user = result.user
    })
    .catch((err) => {
        console.log(err)
    })

    return user;
}