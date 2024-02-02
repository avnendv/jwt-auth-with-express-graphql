import { Query, Resolver } from 'type-graphql'

@Resolver()
export class GreetingResolver {
  @Query(_ => String)
  async hello() {
    return 'Hello World'
  }
}
