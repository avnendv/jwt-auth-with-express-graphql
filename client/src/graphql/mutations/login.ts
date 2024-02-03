import { graphql } from '@/gql'

export const loginMutation = graphql(/* GraphQL */ `
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      code
      success
      message
      accessToken
    }
  }
`)
