import { AuthenticationError } from 'apollo-server-express'
import { Secret, verify } from 'jsonwebtoken'
import { MiddlewareFn } from 'type-graphql'

import { ACCESS_TOKEN_SECRET } from '@/config/env'

export const checkAuth: MiddlewareFn<Context> = ({ context }, next) => {
  try {
    // authHeader here is "Bearer accessToken"
    const authHeader = context.req.header('Authorization')
    const accessToken = authHeader && authHeader.split(' ')[1]

    if (!accessToken) throw new AuthenticationError('Not authenticated to perform GraphQL operations')

    const decodedUser = verify(accessToken, ACCESS_TOKEN_SECRET as Secret) as UserAuthPayload

    context.user = decodedUser

    return next()
  } catch (error) {
    throw new AuthenticationError(`Error authenticating user, ${JSON.stringify(error)}`)
  }
}
