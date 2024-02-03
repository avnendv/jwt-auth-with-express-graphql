import { graphql } from '@/gql'

export const registerMutation = graphql(/* GraphQL */ `
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      code
      success
    }
  }
`)
