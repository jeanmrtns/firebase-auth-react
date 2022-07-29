import { GoogleLogo } from 'phosphor-react'
import { toast } from 'react-toastify'
import { useAuth } from '../../hooks/useAuth'

export function SignIn() {
  const { signIn, user, quit } = useAuth()

  async function handleSignIn() {
    try {
      signIn()
      toast.success('You are awesome!')
    } catch (error) {
      toast.error('Error to sign in')
    }
  }

  async function handleSignOut() {
    await quit()
    window.location.reload()
  }

  return (
    <main className="min-h-screen max-w-screen-md mx-auto flex items-center justify-center flex-col p-4">
      {user?.displayName && (
        <div className="flex items-center flex-col gap-2 mb-8">
          {user.photoURL && (
            <img src={user.photoURL} alt="" className="w-16 h-16" />
          )}
          <h3>Welcome, {user.displayName}</h3>
          <button
            type="button"
            className="p-2 border-blue-500 rounded bg-zinc-200 text-zinc-800"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}

      <h1 className="text-center text-4xl">Firebase Authentication</h1>
      <p className="text-zinc-400 mt-2 text-center">
        You should use Firebase to provide to your users a single way to access
        your platform.
      </p>

      <button
        type="button"
        onClick={handleSignIn}
        className="flex items-center justify-center gap-2 border w-full mt-4 p-4 border-l-purple-500 border-t-purple-500 border-blue-500 hover:border-l-blue-500 hover:border-t-blue-500 hover:border-purple-500 hover:text-zinc-300 transition-colors"
      >
        <GoogleLogo size={24} />
        SignIn with Google
      </button>
    </main>
  )
}
