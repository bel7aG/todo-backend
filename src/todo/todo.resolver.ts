import { Resolver, Query } from '@nestjs/graphql'

@Resolver()
export class TodoResolver {
  @Query(() => String)
  async todos() {
    return 'hello from Essen!'
  }
}
