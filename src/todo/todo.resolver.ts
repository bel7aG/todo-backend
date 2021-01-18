import { Resolver, Query, Args, Mutation, ID } from '@nestjs/graphql'

import { TodoService } from './todo.service'
import { TodoType } from './type/todo.type'
import { TodoInput } from './inputs/todo.input'
import { Status } from './enum/status.enum'

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [TodoType])
  async todos() {
    return this.todoService.findAll()
  }

  @Mutation(() => TodoType)
  async createTodo(@Args('input') input: TodoInput) {
    return this.todoService.create(input)
  }

  @Mutation(() => TodoType)
  async updateStatus(@Args('id') id: string, @Args('status') status: Status) {
    return this.todoService.updateStatus(id, status)
  }
}
