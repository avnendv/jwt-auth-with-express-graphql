import { Field, ObjectType } from 'type-graphql'
import { IMutationResponse } from './MutationResponse'
import { User } from '@/entities/User'

@ObjectType({ implements: IMutationResponse })
export class UserMutationResponse extends IMutationResponse {
  @Field({ nullable: true })
  user?: User

  @Field({ nullable: true })
  accessToken?: string
}
