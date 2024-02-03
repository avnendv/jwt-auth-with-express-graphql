import { FormEvent, useState } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { registerMutation } from '@/graphql/mutations/register'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const [register] = useMutation(registerMutation)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await register({ variables: { registerInput: { username, password } }, refetchQueries: ['Users'] })
    navigate('/')
  }

  return (
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
        Register
      </button>
    </form>
  )
}

export default RegisterPage
