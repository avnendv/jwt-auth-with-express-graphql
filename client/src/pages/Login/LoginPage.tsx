import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { useAuthContext } from '@/contexts/AuthContext'
import JWTManager from '@/utils/jwt'
import { loginMutation } from '@/graphql/mutations/login'

const LoginPage = () => {
  const { setIsAuthenticated } = useAuthContext()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const [login] = useMutation(loginMutation)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await login({
      variables: { loginInput: { username, password } },
      refetchQueries: ['Users'],
    })

    if (response.data?.login.success) {
      JWTManager.setToken(response.data.login.accessToken as string)
      setIsAuthenticated(true)
      navigate('/')
    } else {
      if (response.data?.login.message) setError(response.data.login.message)
    }
  }

  return (
    <>
      {error && <h3 className="text-red-500">{error}</h3>}
      <form className="mt-4 flex flex-col gap-2" onSubmit={onSubmit}>
        <input
          type="text"
          value={username}
          placeholder="Username"
          className="border p-2 rounded-lg"
          onChange={event => setUsername(event.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          className="border p-2 rounded-lg"
          onChange={event => setPassword(event.target.value)}
        />
        <button type="submit" className="bg-blue-400 p-2 rounded-lg">
          Login
        </button>
      </form>
    </>
  )
}

export default LoginPage
