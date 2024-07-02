import {child, getDatabase, get, set, ref} from 'firebase/database'
import { FirebaseApp } from 'firebase/app';
import { getFirebaseApp } from '../firebase'


export const setControl = async (data) => {
  
  

  const dbRef = ref(getDatabase());
  const childRef = child(dbRef, 'MLIoT_SIS/control');
  await set(childRef, data);
  return data;

}
export const getSensorData = async (sensor) => {
  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase());
    const sensorContentRef = child(dbRef,`MLIoT_SIS/${sensor}`)
    
    const snapshot = await get(sensorContentRef)

    return snapshot.val()


  }catch(error){
    console.log(error)
  }
}