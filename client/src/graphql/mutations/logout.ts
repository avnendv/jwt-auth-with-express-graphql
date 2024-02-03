import { graphql } from '@/gql'

export const logoutMutation = graphql(/* GraphQL */ `
  mutation Logout($userId: ID!) {
    logout(userId: $userId) {
      code
      success
    }
  }
`)
