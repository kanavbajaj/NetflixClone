// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6nPhDgPsmd27QIrOvwT8cmY5UtE2Hgc8",
  authDomain: "netflix-clone-6fec5.firebaseapp.com",
  projectId: "netflix-clone-6fec5",
  storageBucket: "netflix-clone-6fec5.appspot.com",
  messagingSenderId: "324513015794",
  appId: "1:324513015794:web:a7ed369f5dd80fdd34ed6b",
  measurementId: "G-58VKKFZ7KQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signup=async(name,email,password)=>{
try{
    const res=await createUserWithEmailAndPassword(auth,email,password);
    const user=res.user;
    await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
    })
}
catch(error){
    console.log(error);
    alert(error);
}
}

const login=async()=>{
    try{
        signInWithEmailAndPassword(auth,email,password);

}
catch(error){
    console.log(error);
    alert(error);

}
}

const logout=()=>{
    signOut(auth);
}

export{auth,db,login,signup,logout}