import { Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'

declare global {
  type UserAuthPayload = JwtPayload & { userId: number }

  declare interface Context {
    req: Request
    res: Response
    user: UserAuthPayload
  }
}
