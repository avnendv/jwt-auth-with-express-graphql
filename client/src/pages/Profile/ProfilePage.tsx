import { helloQuery } from '@/graphql/queries/hello'
import { useQuery } from '@apollo/client'

const ProfilePage = () => {
  const { data, error, loading } = useQuery(helloQuery)

  if (loading) return <h3>Loading ....</h3>

  if (error) return <h3 className="text-red-500">Error: {JSON.stringify(error)}</h3>

  return <h3>{data?.hello}</h3>
}

export default ProfilePage
