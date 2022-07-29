import { SignIn } from './pages/SignIn'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './contexts/AuthContext'

export function App() {
  return (
    <AuthProvider>
      <SignIn />
      <ToastContainer />
    </AuthProvider>
  )
}
