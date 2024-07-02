import { getFirebaseApp } from "../firebase";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {child, getDatabase, set, get, ref} from 'firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authenticate } from "../../store/authSlice";
import { LOGOUT } from "../../constants/actionTypes";


export const signUp = (fullName, email, password) => {
  return async (dispatch) => {
    const app= getFirebaseApp()
    const auth = getAuth(app)

    try{
      const result = await createUserWithEmailAndPassword(
        auth, email, password
      );

      const { uid, stsTokenManager } = result.user;
      const { accessToken, expirationTime } = stsTokenManager;
      const expiryDate = new Date(expirationTime);

      const userData = await createUser(fullName, email, uid);

      dispatch(authenticate({token: accessToken, userData}));

      saveToStorage(accessToken, uid, expiryDate)

    } catch(error) {
      console.log(error)
      const error_code = error.code;
      let message = 'Something went wrong'

      if(error_code === 'auth/email-already-in-use'){
        message = 'Email already in use'
      }

      if (error_code === 'auth/wrong-password' || error_code === 'auth/user-not-found'){
        message = 'Wrong email or password'
      }
      
      throw new Error(message);


    }
  }
}

export const signIn = ( email, password) => {
  return async (dispatch) => {
    const app= getFirebaseApp()
    const auth = getAuth(app)

    try{
      const result = await signInWithEmailAndPassword(
        auth, email, password
      );
      console.log(result.user)
      const { uid, stsTokenManager } = result.user;
      const { accessToken, expirationTime } = stsTokenManager;
      const expiryDate = new Date(expirationTime);

      const userData = await getUserData(uid);

      dispatch(authenticate({token: accessToken, userData}));

      saveToStorage(accessToken, uid, expiryDate)

    } catch(error) {
      console.log(error)
      const error_code = error.code;
      let message = 'Something went wrong'

      if(error_code === 'auth/invalid-email'){
        message = 'Please check your email or password'
      }

      if (error_code === 'auth/wrong-password' || error_code === 'auth/user-not-found'){
        message = 'Wrong email or password'
      }
      
      throw new Error(message);


    }
  }
}

const createUser = async (fullName, email, userId) => {
  const userData ={
    fullName, email, userId, signUpDate: new Date().toISOString(),
  }

  const dbRef = ref(getDatabase());
  const childRef = child(dbRef, `users/${userId}`);
  await set(childRef, userData);
  return userData;

}

const getUserData = async (userId) => {
  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase());
    const userRef = child(dbRef,`user/${userId}`)
    
    const snapshot = await get(userRef)

    return snapshot.val()

  }catch(error){
    console.log(error)
  }
  


}

const saveToStorage = (token, userId, expiryDate) => {
  AsyncStorage.setItem(
    'userData', JSON.stringify({
      token, userId, expiryDate: expiryDate.toISOString()
    })
  )
}

