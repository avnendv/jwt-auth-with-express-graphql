import { Arg, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql'
import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import { User } from '@/entities/User'
import { RegisterInput } from '@/types/RegisterInput'
import { UserMutationResponse } from '@/types/UserMutationResponse'
import { LoginInput } from '@/types/LoginInput'
import { createToken, sendRefreshToken } from '@/utils/auth'
import { REFRESH_TOKEN_COOKIE_NAME } from '@/config/env'

@Resolver()
export class UserResolver {
  @Query(_ => [User])
  async users(): Promise<User[]> {
    return await User.find()
  }

  @Mutation(_ => UserMutationResponse)
  async register(@Arg('registerInput') registerInput: RegisterInput): Promise<UserMutationResponse> {
    try {
      const { username, password } = registerInput

      const existingUser = await User.findOneBy({ username })
      if (existingUser)
        return {
          code: 400,
          success: false,
          message: 'Username was register in system!',
        }

      const salt = genSaltSync(12)
      const hashedPassword = hashSync(password, salt)
      const newUser = await User.save({ username, password: hashedPassword })
      return {
        code: 200,
        success: true,
        message: 'User registration was successful',
        user: newUser,
      }
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: 'Internal Server Error!',
      }
    }
  }

  @Mutation(_ => UserMutationResponse)
  async login(@Arg('loginInput') loginInput: LoginInput, @Ctx() context: Context) {
    try {
      const { username, password } = loginInput
      const existingUser = await User.findOneBy({ username })
      if (!existingUser)
        return {
          code: 400,
          success: false,
          message: 'Username does not exist!',
        }

      if (!compareSync(password, existingUser.password))
        return {
          code: 400,
          success: false,
          message: 'Password not correct',
        }

      sendRefreshToken(context.res, existingUser)

      return {
        code: 200,
        success: true,
        message: 'Login Successfully',
        user: existingUser,
        accessToken: createToken('accessToken', existingUser),
      }
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: 'Internal Server Error!',
      }
    }
  }

  @Mutation(_return => UserMutationResponse)
  async logout(@Arg('userId', _type => ID) userId: number, @Ctx() { res }: Context): Promise<UserMutationResponse> {
    const existingUser = await User.findOneBy({ id: userId })

    if (!existingUser) {
      return {
        code: 400,
        success: false,
      }
    }

    existingUser.tokenVersion += 1

    await existingUser.save()

    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME as string, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/refresh_token',
    })

    return { code: 200, success: true }
  }
}
