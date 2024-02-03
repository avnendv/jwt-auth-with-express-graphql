import { graphql } from '@/gql'

export const helloQuery = graphql(/* GraphQL */ `
  query Hello {
    hello
  }
`)
