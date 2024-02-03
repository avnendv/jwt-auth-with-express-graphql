import { graphql } from '@/gql'

export const userQuery = graphql(/* GraphQL */ `
  query Users {
    users {
      id
      username
    }
  }
`)
