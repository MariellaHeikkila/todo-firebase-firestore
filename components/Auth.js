import {
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth, db, USERS_REF } from '../firebase/Config';
import {  doc, setDoc } from 'firebase/firestore';
import { Alert } from 'react-native';



export const signUp = async (email, password, nickname) => {
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        setDoc(doc(db, USERS_REF, userCredential.user.uid), {
            email: userCredential.user.email,
            nickname: nickname
        })
        console.log("registration succesful.");
        })
        .catch((error) => {
            console.log("Registration failed.", error.message);
            Alert.alert("Registration failed.", error.message);
        }
    );
}

export const logout = async () => {
    await signOut(auth)
    .then(() => {
        console.log("Logout successful.");
    })
    .catch((error) => {
        console.log("Logout failed.", error.message);
        Alert.alert("Logout failed.", error.message);
    });
}

export const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        console.log("Login successful.");
    })
    .catch((error) => {
        console.log("Login failed.", error.message);
        Alert.alert("Login failed.", error.message);
    });
}