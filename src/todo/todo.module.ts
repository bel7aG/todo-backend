import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { TodoResolver } from './todo.resolver'
import { TodoService } from './todo.service'
import { TodoSchema } from './schemas/todo.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Todo',
        schema: TodoSchema,
        collection: 'todos'
      }
    ])
  ],
  providers: [TodoService, TodoResolver],
  exports: [TodoResolver, TodoService]
})
export class TodoModule {}
