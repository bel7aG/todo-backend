import { InputType, Field } from '@nestjs/graphql'
import { Status } from '../enum/status.enum'

@InputType()
export class TodoInput {
  @Field(() => String)
  readonly title: string

  @Field(() => String)
  readonly description: string

  @Field(() => Status, { nullable: true })
  readonly status?: Status
}
