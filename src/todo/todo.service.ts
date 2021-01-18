import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { TodoDoc } from './interfaces/todo.interface'
import { TodoInput } from './inputs/todo.input'
import { TodoType } from './type/todo.type'
import { Status } from './enum/status.enum'
import { checkStatus } from './../../utils/check-status'

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private todoModel: Model<TodoDoc>) {}

  async findAll(): Promise<TodoType[]> {
    try {
      return await this.todoModel.find().exec()
    } catch {
      throw new InternalServerErrorException(`Back later we will fix it.`)
    }
  }

  async create(input: TodoInput): Promise<TodoType> {
    if (input.title) {
      return await this.todoModel.create(input)
    } else {
      throw new BadRequestException(`todo title missed.`)
    }
  }

  async updateStatus(id: string, status: Status): Promise<TodoType> {
    if (checkStatus(status)) {
      try {
        const chosenTodo = await this.todoModel.findByIdAndUpdate(
          id,
          {
            $set: {
              status
            }
          },
          { new: true }
        )

        return chosenTodo
      } catch {
        throw new NotFoundException(`todo not exist.`)
      }
    } else {
      throw new BadRequestException(`Status must be TODO or DONE.`)
    }
  }
}
