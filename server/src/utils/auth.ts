import { Response } from 'express'
import { Secret, sign } from 'jsonwebtoken'
import { User } from '@/entities/User'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_SECRET } from '@/config/env'

export const createToken = (type: 'accessToken' | 'refreshToken', user: User) =>
  sign(
    {
      userId: user.id,
      ...(type === 'refreshToken' ? { tokenVersion: user.tokenVersion } : {}),
    },
    type === 'accessToken' ? (ACCESS_TOKEN_SECRET as Secret) : (REFRESH_TOKEN_SECRET as Secret),
    {
      expiresIn: type === 'accessToken' ? '15s' : '60m',
    }
  )
export const sendRefreshToken = (res: Response, user: User) => {
  res.cookie(REFRESH_TOKEN_COOKIE_NAME as string, createToken('refreshToken', user), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/refresh_token',
  })
}
