import { Field, ID, InterfaceType } from '@nestjs/graphql'
import { Status } from '../enum/status.enum'

@InterfaceType()
export abstract class AbstractTodo {
  @Field(() => ID)
  readonly id: string | typeof ID

  @Field(() => String)
  readonly title: string

  @Field(() => String)
  readonly description: string

  @Field(() => Status)
  readonly status: Status
}
