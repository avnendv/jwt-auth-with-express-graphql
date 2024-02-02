import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { checkAuth } from '@/middleware/checkAuth'
import { User } from '@/entities/User'

@Resolver()
export class GreetingResolver {
  @Query(_ => String)
  @UseMiddleware(checkAuth)
  async hello(@Ctx() { user }: Context): Promise<string> {
    const existingUser = await User.findOneBy({ id: user.userId })
    return `Hello ${existingUser ? existingUser.username : 'World'}`
  }
}
