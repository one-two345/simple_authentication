import {child, getDatabase, get, ref} from 'firebase/database'
import { getFirebaseApp } from '../firebase'

export const getUserData = async (userId) => {
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