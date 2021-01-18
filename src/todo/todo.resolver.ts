import { Resolver, Query, Args, Mutation, ID } from '@nestjs/graphql'

import { TodoService } from './todo.service'
import { TodoType } from './type/todo.type'
import { TodoInput } from './inputs/todo.input'

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
}
