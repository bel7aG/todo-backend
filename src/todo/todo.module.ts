import { Module } from '@nestjs/common'

import { TodoService } from './todo.service'
import { TodoResolver } from './todo.resolver'

@Module({
  providers: [TodoService, TodoResolver],
  exports: [TodoResolver, TodoService]
})
export class TodoModule {}
