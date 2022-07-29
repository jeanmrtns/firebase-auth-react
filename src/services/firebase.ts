import axios from 'axios'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { firebaseConstants } from '../constants/firebase'

const firebaseConfig = {
  apiKey: firebaseConstants.apiKey,
  authDomain: firebaseConstants.authDomain,
  projectId: firebaseConstants.projectId,
  storageBucket: firebaseConstants.storageBucket,
  messagingSenderId: firebaseConstants.messagingSenderId,
  appId: firebaseConstants.appId,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export function getUser() {
  return auth.currentUser
}

export const firebaseConnection = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
})
