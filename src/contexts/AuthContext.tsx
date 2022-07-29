import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { firebaseConstants } from '../constants/firebase'
import { auth, firebaseConnection } from '../services/firebase'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  signIn: () => Promise<void>
  quit: () => Promise<void>
  user: User
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)

  useEffect(() => {
    async function me() {
      const userToken = localStorage.getItem('auth.token')

      if (!userToken) return

      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseConstants.apiKey}`
        const response = await firebaseConnection.post(url, {
          idToken: userToken,
        })

        const newUser = response.data.users[0]
        const formattedData = {
          ...newUser,
          photoURL: newUser.photoUrl,
        }

        setUser(formattedData)
      } catch (error) {}
    }

    me()
  }, [])

  async function signIn() {
    const provider = new GoogleAuthProvider()

    try {
      const { user } = await signInWithPopup(auth, provider)

      const idToken = await user.getIdToken()

      localStorage.setItem('auth.token', idToken)

      setUser(user)
    } catch (error) {
      throw new Error(String(error))
    }
  }

  async function quit() {
    localStorage.removeItem('auth.token')
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ signIn, quit, user }}>
      {children}
    </AuthContext.Provider>
  )
}
