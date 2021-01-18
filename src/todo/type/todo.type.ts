import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql'

import { AbstractTodo } from '../abstracts/todo.abstract'
import { Status } from '../enum/status.enum'

registerEnumType(Status, {
  name: 'Status'
})

@ObjectType({
  implements: [AbstractTodo]
})
export class TodoType implements AbstractTodo {
  @Field(() => ID)
  readonly id: string | typeof ID

  @Field(() => String)
  readonly title: string

  @Field(() => String)
  readonly description: string

  @Field(() => Status)
  readonly status: Status.TODO | Status.DONE
}
