import { userQuery } from '@/graphql/queries/users'
import { useQuery } from '@apollo/client'

const HomePage = () => {
  const { data, loading } = useQuery(userQuery)

  if (loading) return <h1>Loading...</h1>

  return (
    <ul>
      {data?.users.map(user => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ul>
  )
}

export default HomePage
