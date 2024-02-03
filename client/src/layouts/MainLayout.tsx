import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Link, Outlet } from 'react-router-dom'

import JWTManager from '@/utils/jwt'
import { useAuthContext } from '@/contexts/AuthContext'
import { logoutMutation } from '@/graphql/mutations/logout'

const MainLayout = () => {
  const [loading, setLoading] = useState(true)
  const { isAuthenticated, logoutClient, checkAuth } = useAuthContext()
  const [logoutServer] = useMutation(logoutMutation)

  const logout = async () => {
    logoutClient()

    await logoutServer({
      variables: { userId: JWTManager.getUserId()?.toString() as string },
    })
  }

  useEffect(() => {
    const authenticate = async () => {
      await checkAuth()
      setLoading(false)
    }

    authenticate()
  }, [checkAuth])

  if (loading) return <h1>LOADING....</h1>

  return (
    <>
      <h1 className="text-center text-3xl mt-12">JWT AUTHENTICATION FULL STACK</h1>
      <nav className="border-b pb-4 text-center tex-lg mt-4">
        <Link className="hover:text-blue-700" to=".">
          Home
        </Link>
        &nbsp;|&nbsp;
        {isAuthenticated ? (
          <>
            <Link className="hover:text-blue-700" to="profile">
              Profile
            </Link>
            |{' '}
            <button className="p-2 bg-blue-800 rounded-md text-white" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            &nbsp;|&nbsp;
            <Link className="hover:text-blue-700" to="login">
              Login
            </Link>
            &nbsp;|&nbsp;
            <Link className="hover:text-blue-700" to="register">
              Register
            </Link>
          </>
        )}
      </nav>
      <div className="p-8">
        <Outlet />
      </div>
    </>
  )
}

export default MainLayout
